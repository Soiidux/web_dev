import http from 'http'
import dotenv from 'dotenv'

dotenv.config();

//making  a server
const server = http.createServer((req,res)=>{
    console.log(`Route: ${req.url}`);
    console.log(`Method: ${req.method}`);
    res.writeHead(200,{'Content-Type':'text'});
    res.end("<h1>Hello world</h1>");
})

//making it listen at a port
server.listen(process.env.PORT,()=>{
    console.log(`Server listening at port ${process.env.PORT}`)
})
