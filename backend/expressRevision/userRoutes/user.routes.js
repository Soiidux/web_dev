import express from 'express';
import path from 'path';
import url from 'url';
import { addPost, deletePost, getPostByID, getPosts, updatePost } from '../userControllers/user.controllers.js';
const router = express.Router();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
router.get('/api/posts',getPosts);

//get single post
router.get('/api/posts/:id',getPostByID);

//Post / add a single post
router.post('/api/posts',addPost);

//put or update a single post
router.put('/api/posts/:id',updatePost);

//Delete a post
router.delete('/api/posts/:id',deletePost);

export default router;