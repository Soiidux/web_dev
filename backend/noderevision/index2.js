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

//Logger middleware
const logger = (req,res,next) => {
    console.log(`Method: ${req.method}`);
    console.log(`Route: ${req.url}`);
    next();
}

//JSON Middleware
const jsonMiddleware = (req,res,next)=>{
    res.setHeader('content-type','application/json');
    next();
}

//Route handler for GET /api/users
const getUsersHandler = (req,res) =>{
    res.write(JSON.stringify(users));
    res.end();
};

//Route handler for GET /api/users/id
const getUserHandler = (req,res)=>{
    const id = req.url.split('/')[3];
    const user = users.find((user)=>user.id === parseInt(id));
    res.write(JSON.stringify(user));
    res.end();
}

//Route handler for POST /api/users
const createUserHandler = (req,res)=>{
    let body = '';
    //Listen for data
    req.on("data",(chunk)=>{
        body += chunk.toString();
    });
    req.on("end",()=>{
        const newUser = JSON.parse(body);
        users.push(newUser);
        res.statusCode = 201;
        res.write(JSON.stringify(newUser));
        res.end();
    })
}

//Route handler for 404
const notfound = (req,res)=>{
    res.statusCode = 404;
    res.write("<h1>404 : Not found<\h1>");
    res.end();
}
const server = createServer((req,res)=>{
    logger(req,res,()=>{
        try {
           jsonMiddleware(req,res,()=>{
                if(req.url === '/api/users' && req.method === 'GET'){
                    getUsersHandler(req,res);
                }
                else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
                    getUserHandler(req,res);
                }
                else if(req.url === '/api/users' && req.method === 'POST'){
                    createUserHandler(req,res);
                }
                else{
                    notfound(req,res);
                }
            })
        }
       catch (error) {
            console.log(`Error: ${error}`);
            res.statusCode = 500;
            res.write("<h1>Server error<\h1>")
            res.end();
    }
    })
})

server.listen(process.env.PORT,()=>{
    console.log(`API listening on port ${process.env.PORT}`);
})