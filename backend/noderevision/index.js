import http from 'http'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import url from 'url'
import path from 'path'
import { text } from 'stream/consumers';

dotenv.config();

//Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//making  a server
const server = http.createServer(async (req,res)=>{
    //__filename : gives the current file name
    //__dirname : gives the current directory name
    console.log(`Route: ${req.url}`);
    console.log(`Method: ${req.method}`);
    try {
        if(req.method === 'GET'){
            let filePath;
            if(req.url === '/'){
                // res.writeHead(200,{'Content-Type':'text'});
                // res.end("<h1>Home Page</h1>");
                filePath = path.join(__dirname,'public','index.html');
            }

            else if(req.url === '/about'){
                // res.writeHead(200,{'content-type':'text'});
                // res.end("<h1>About page</h1>");
                filePath = path.join(__dirname,'public','about.html');
            }
            else{
                // res.writeHead(404,{"content-type":'text'});
                // res.end("<h1>404: Page not Found</h1>");
                filePath = path.join(__dirname,'public','notfound.html');
            }

            const data = await fs.readFile(filePath);
            res.setHeader('Content-Type','text/html');
            res.write(data);
            res.end();

        }
        else{
            throw new Error("Method not allowed");
        }  
    } catch (error) {
        console.log(`Error: ${error}`);
        res.writeHead(500,{'content-type':'text'});
        res.end("Server error")
    }
    
})

//making it listen at a port
server.listen(process.env.PORT,()=>{
    console.log(`Server listening at port ${process.env.PORT}`)
})
