import express from 'express';
import path from 'path';
import url from 'url';
const router = express.Router();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let posts = [
    {id:1,title:'Post One'},
    {id:2,title:'Post Two'},
    {id:3,title:'Post Three'}
];

//making routes
router.get('/',(req,res)=>{
    //In express you dont need to declare what type of data is going to be sent, its all dynamic
    // res.send("Normal text");     
    // res.send("<h1>HTML text</h1>");
    // res.send({message: "JSON object"});
    res.sendFile(path.join(__dirname,'..','public','index.html'));
})

router.get('/about',(req,res)=>{
    // res.send("This is the about page");
    res.sendFile(path.join(__dirname,'..','public','about.html'));
})

//get multiple posts
router.get('/api/posts',(req,res)=>{
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit) && limit>0){
        res.status(200).json(posts.slice(0,limit));
    }
    else{
        res.status(200).json(posts);
    }
})

//get single post
router.get('/api/posts/:id',(req,res,next)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=> post.id === id);

    if(!post){
        const error = new Error(`A post with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }
    else{
        res.status(200).json(post);
    }
})

//Post / add a single post
router.post('/api/posts',(req,res,next)=>{
    const { id , title } = req.body;
    if(!id || !title){
        const error = new Error(`Please fill all the fields`);
        error.status = 404;
        return next(error);
    }
    posts.push(req.body);
    res.status(201).json(posts);      
})

//put or update a single post
router.put('/api/posts/:id',(req,res,next)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=> post.id === id);
    if(!post){
        const error = new Error(`A post with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }
    post.title = req.body.title;
    res.status(200).json(posts);
      
})

//Delete a post
router.delete('/api/posts/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=> post.id === id);
    if(!post){
        const error = new Error(`A post with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }

    posts = posts.filter((post)=>post.id!==id);
    res.status(200).json(posts);
})
export default router;