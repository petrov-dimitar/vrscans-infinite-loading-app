## Upskill API Server

### Overview
To mimic the API, we are using [json-server](https://github.com/typicode/json-server) to create a functioning REST API that supports all CRUD operations, as well as advanced searching and filtering. We are also using the [json-server-auth](https://github.com/jeremyben/json-server-auth) middleware to provide support for user authentication and route protection.

You are allowed to modify this API server however you see fit. For more information on how these tools work, we strongly suggest you go though their respective documentation and provided examples.

Due to the simplistic nature of these tools, there are some obvious unfavourable practices and security issues, such as the fact that anyone can edit or delete any user. For the purposes of this project, treat the server as if those issues do not exist, as they are a server-side concern and wouldn't exist in a real-world scenario (or so we hope).

### Getting started
In order to run this software, you need to have Node.js 14.15 or higher installed on your system. Then, in your terminal of choice, run the following commands:

- `npm install` to restore all packages.
- `npm start` to start the server, which will be listening on port 3000 (http://localhost:3000).

### Available endpoints
The following is a list of supported endpoints by this server. The [json-server](https://github.com/typicode/json-server) module supports query strings for filtering and showing partial results. More information on the [documentation page](https://github.com/typicode/json-server#filter). All resources support full CRUD, only some of the endpoints are described here.

- **GET** `/vrscans` – Returns a list of VRScans materials
- **GET** `/materials` – Returns a list of all available materials
- **GET** `/colors` – Returns a list of all available colors
- **GET** `/tags` – Returns a list of all available tags
- **GET** `/industries` – Returns a list of all available industries
- **GET** `/manufacturers` – Returns a list of all available manufacturers
- **GET** `/favorites` – Returns a list of all user favorite vrscans

<br>

- **POST** `/users` - Creates a new user with the following body and returns an access token

```json
{
    "email": "clara@example.com",
    "password": "claraexample",
    "firstName": "Clara",
    "lastName": "Example",
    "photoUrl": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
}
```

- **POST** `/logins` - Creates a new user session and returns access token

```json
{
    "email": "clara@example.com",
    "password": "claraexample"
}
```

- **POST** `/favorites` – Create a new user favorite

```json
{
    "vrscanId": 5,
    "userId": 1
}
```


All resources can be accessed without login (except favorites, which requires login) but require login to add/edit/delete records. In order to authenticate your request, add an `Authorization` header with the contents `Bearer {token}`. The token is acquired by sending a POST request to /login and is valid for 1 hour.

For more information on how you can apply sort, filter and etc. onto your request, please visit [json-server](https://github.com/typicode/json-server)'s documentation page.