## Upskill API Server
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