import http from 'http'
import dotenv from 'dotenv'
import { text } from 'stream/consumers';

dotenv.config();

//making  a server
const server = http.createServer((req,res)=>{
    console.log(`Route: ${req.url}`);
    console.log(`Method: ${req.method}`);
    if(req.url === '/'){
        res.writeHead(200,{'Content-Type':'text'});
        res.end("<h1>Home Page</h1>");
    }

    else if(req.url === '/about'){
        res.writeHead(200,{'content-type':'text'});
        res.end("<h1>About page</h1>");
    }
    else{
        res.writeHead(404,{"content-type":'text'});
        res.end("<h1>404: Page not Found</h1>");
    }
})

//making it listen at a port
server.listen(process.env.PORT,()=>{
    console.log(`Server listening at port ${process.env.PORT}`)
})
