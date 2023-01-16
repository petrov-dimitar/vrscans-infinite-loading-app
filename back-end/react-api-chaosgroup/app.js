const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const UserModel = require("./models/UserModel");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const data = require("./data.json");
const { promisify } = require("util");
const VrScanModel = require("./models/VrScansModel");
const cors = require("cors");

const app = express();
app.use(cors());

// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));
app.use("/webhook", express.json());

// require("child_process").fork("seedVrScansScript.js"); //change the path depending on where the file is.

dotenv.config({ path: "../../.env" });
const jsonParser = bodyParser.json();

console.log(dotenv.config);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", false);

mongoose.connect(DB).then((con) => {
  console.log("DB Connection success");
});

app.post(
  "/signup",
  jsonParser,
  catchAsync(async (req, res, next) => {
    const newUser = await UserModel.create(req.body);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  })
);

app.post("/login", jsonParser, async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "No email or pass",
    });
  }

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    user,
    token,
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server", app: "name" });
});

app.post("/", (req, res) => {
  res.send("You can post to this endpoint...");
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server", app: "name" });
});

app.get("/users", (req, res) => {
  const users = data.users;
  res.status(200).json(users);
});

app.get("/materials", (req, res) => {
  const materials = data.materials;
  res.status(200).json(materials);
});

app.get("/vrscans", (req, res) => {
  const { colors, materials, tags, skip, limit, name } = req.query;

  const query = {};

  if (colors) {
    let colorsId = JSON.parse(colors).map((colorId) => Number(colorId));
    query["colors"] = { $in: colorsId };
  }
  if (materials) {
    let materialsId = JSON.parse(materials).map((materialsId) =>
      Number(materialsId)
    );
    query["materialTypeId"] = { $in: materialsId };
  }
  if (tags) {
    let tagsId = JSON.parse(tags).map((tagsId) => Number(tagsId));
    query["tags"] = { $in: tagsId };
  }

  if (name) {
    query["name"] = new RegExp(`^` + name, "i");
  }

  const pagination = { skip: 0, limit: 15 };

  if (skip) {
    pagination["skip"] = skip;
  }
  if (limit) {
    pagination["limit"] = limit;
  }

  VrScanModel.find({ ...query }, {}, pagination, function (err, results) {
    if (err) {
      res.status(400).json(err);
      res.end();
    }

    res.status(200).json({ totalResults: results.length, vrscans: results });
    res.end();
  });
});

app.get(
  "/user_by_token",
  jsonParser,
  catchAsync(async (req, res, next) => {
    // 1) Identify user from token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    // Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await UserModel.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    let subscription = null;
    if (currentUser.subscriptionId) {
      subscription = await stripe.subscriptions.retrieve(
        currentUser.subscriptionId
      );
    }

    // 3) Return response
    res.status(200).json({
      status: "success",
      token,
      data: {
        currentUser,
        subscription,
      },
    });
  })
);

app.post(
  "/vrscans",
  jsonParser,
  catchAsync(async (req, res, next) => {
    // 1) Identify user from token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    // Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await UserModel.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    let subscription = null;

    if (currentUser.favorites.length > 3) {
      if (currentUser.subscriptionId) {
        subscription = await stripe.subscriptions.retrieve(
          currentUser.subscriptionId
        );

        if (!subscription.plan.active) {
          res.status(403).json({
            status: "error",
            message: "Please subscribe to add more than 5 scans to favorites",
          });
        }
      } else {
        res.status(403).json({
          status: "error",
          message: "Please subscribe to add more than 5 scans to favorites",
        });
      }
    }

    // 2) Add VrScans to user from model
    const updatedUser = await UserModel.updateOne(currentUser, {
      $addToSet: { favorites: req.body },
    });

    // 3) Return response
    res.status(200).json({
      status: "success",
      token,
      data: {
        updatedUser: updatedUser,
      },
    });
  })
);

app.get("/tags", (req, res) => {
  const tags = data.tags;
  res.status(200).json(tags);
});

app.get("/colors", (req, res) => {
  const colors = data.colors;
  res.status(200).json(colors);
});

app.get("/industries", (req, res) => {
  const colors = data.industries;
  res.status(200).json(industries);
});

app.get("/manufacturers", (req, res) => {
  const colors = data.manufacturers;
  res.status(200).json(manufacturers);
});

app.get(
  "/user_favorites",
  jsonParser,
  catchAsync(async (req, res, next) => {
    // 1) Identify user from token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    // Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await UserModel.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    // 3) Return response
    res.status(200).json({
      status: "success",
      token,
      favorites: currentUser.favorites,
    });
  })
);

// Stripe

const stripe = require("stripe")(process.env.STRIPE_KEY);

const YOUR_DOMAIN = process.env.REACT_APP_URL;

app.post(
  "/create-checkout-session",
  jsonParser,
  express.urlencoded({ extended: true }),

  catchAsync(async (req, res, next) => {
    const prices = await stripe.prices.list({
      lookup_keys: [req.body.lookup_key],
      expand: ["data.product"],
    });

    const currentUser = await UserModel.findOne({ email: req.body.email });
    // Check if user still exists

    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      line_items: [
        {
          price: prices.data[0].id,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      metadata: { userEmail: currentUser.email },
      mode: "subscription",
      success_url: `${YOUR_DOMAIN}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.redirect(303, session.url);
  })
);

app.post("/create-portal-session", async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { stripeCustomer } = req.body;

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: stripeCustomer,
    return_url: returnUrl,
  });

  res.redirect(303, portalSession.url);
});

app.post(
  "/webhook",
  express.raw({ type: "*/*" }),
  express.json(),
  async (req, response) => {
    console.log("inside webhook");
    let event = req.body;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = req.headers["stripe-signature"];
      console.log("signature", signature);
      console.log("req.body", event);
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
      case "customer.subscription.trial_will_end":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case "customer.subscription.deleted":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case "customer.subscription.created":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
      case "checkout.session.completed":
        let data = event.data.object;
        console.log(`data is ${JSON.stringify(data)}.`);

        const user = await UserModel.findOne({
          email: data.metadata.userEmail,
        });

        await UserModel.updateOne(user, {
          stripeCustomer: data.customer,
          subscriptionId: data.subscription,
        });
        break;

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

// Start server
const port = process.env.PORT || 1337;

app.listen(port);
