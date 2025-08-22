import express from 'express';
import dotenv from 'dotenv';
import path, { parse } from 'path';
import url from 'url';

dotenv.config();

//initializing port and app
const PORT = process.env.PORT || 8000;
const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname,'public'))); 
//Static enables you to make the contents of a folder publically accessible through http
//For example if in this case I go to localhost:PORT/ it would lead me to index.html and if I were to go to localhost:PORT/about.html it
//would lead me to about.html

let posts = [
    {id:1,title:'Post One'},
    {id:2,title:'Post Two'},
    {id:3,title:'Post Three'}
]
//making routes
app.get('/',(req,res)=>{
    //In express you dont need to declare what type of data is going to be sent, its all dynamic
    // res.send("Normal text");     
    // res.send("<h1>HTML text</h1>");
    // res.send({message: "JSON object"});
    res.sendFile(path.join(__dirname,'public','index.html'));
})

app.get('/about',(req,res)=>{
    // res.send("This is the about page");
    res.sendFile(path.join(__dirname,'public','about.html'));
})

//get multiple posts
app.get('/api/posts',(req,res)=>{
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit) && limit>0){
        res.status(200).json(posts.slice(0,limit));
    }
    else{
        res.status(200).json(posts);
    }
})

//get single post
app.get('/api/posts/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=> post.id === id);

    if(!post){
        res.status(404).json({message: `A post with the id of ${id} was not found`});
    }
    else{
        res.status(200).json(post);
    }
})



//making the app listen at the port
app.listen(PORT,()=>{
    console.log(`Server is running at port : ${PORT}`);
})