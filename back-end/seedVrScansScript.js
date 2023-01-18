// require the necessary libraries
const { faker } = require("@faker-js/faker");
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
const data = require("./data.json");
dotenv.config({ path: "../../.env" });

async function seedDB() {
  // Connection URL
  const uri = process.env.DATABASE;

  console.log("uri", uri);

  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

  const client = new MongoClient(DB, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const collection = client.db("natours").collection("vrscans");

    try {
      await collection.drop();
    } catch (e) {
      console.log("Exception");
    }

    // make a bunch of time series data
    let timeSeriesData = [];

    for (object of data.vrscans) {
      timeSeriesData.push(object);
    }
    collection.insertMany(timeSeriesData);

    console.log("Database seeded with VRscans! :)");
    // await client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
