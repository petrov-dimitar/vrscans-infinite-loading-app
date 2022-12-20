const http = require('http');
const data = require('./data.json');

function handler(req, res) {
     if(req.url === "/"){
        res.writeHead(200, {'Content-type':'text/plain'});
         res.write('Hello, I am a webserver !');
         res.end();
    }
    else if(req.url === "/users"){
        const users = data.users
        res.end(JSON.stringify(users))
    }
    else if(req.url === "/materials"){
        const materials = data.materials
        res.end(JSON.stringify(materials))
    }
    else if(req.url === "/vrscans"){
        const vrscans = data.vrscans
        res.end(JSON.stringify(vrscans))
    }
    else if(req.url === "/tags"){
        const tags = data.tags
        res.end(JSON.stringify(tags))
    }
    else if(req.url === "/colors"){
        const colors = data.colors
        res.end(JSON.stringify(colors))
    }
    else if(req.url === "/industries"){
        const industries = data.industries
        res.end(JSON.stringify(industries))
    }
    else if(req.url === "/manufacturers"){
        const manufacturers = data.manufacturers
        res.end(JSON.stringify(manufacturers))
    }
    // TODO: Add favorites
    else{
        res.writeHead(200, {'Content-type':'text/plain'});
        res.write('Sorry, no such path exists');
        res.end();
    }

  
}

const server = http.createServer(handler);
server.listen(process.env.PORT || 1337);