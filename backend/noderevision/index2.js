import {createServer} from 'http'
import dotenv from 'dotenv'
dotenv.config()

const users = [
    {
        id:1,
        name:"John Doe"
    },
    {
        id:2,
        name:"Jane Doe"
    },
    {
        id:3,
        name:"Jim Doe"
    }
]
const server = createServer((req,res)=>{
    try {
        res.setHeader('Content-Type','text/html');
        if(req.url === '/api/users' && req.method === 'GET'){
            res.write(JSON.stringify(users));
        }
        else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
            const id = req.url.split('/')[3];
            const user = users.find((user)=>user.id === parseInt(id));
            res.write(JSON.stringify(user));
        }
        else{
            res.statusCode = 404;
            res.write("<h1>404 : Not found<\h1>");
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        res.statusCode = 500;
        res.write("<h1>Server error<\h1>")
    }
    res.end();
})

server.listen(process.env.PORT,()=>{
    console.log(`API listening on port ${process.env.PORT}`);
})