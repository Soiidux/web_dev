//@desc Get mulltiple posts
//  Either get all posts if no/invalid limiter in query or within a range if limiter is mentioned


let posts = [
    {id:1,title:'Post One'},
    {id:2,title:'Post Two'},
    {id:3,title:'Post Three'}
];


export const getPosts = (req,res)=>{
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit) && limit>0){
        res.status(200).json(posts.slice(0,limit));
    }
    else{
        res.status(200).json(posts);
    }
};

//@desc Get a single post
//  Get a post whose id matches the params.id
export const getPostByID = (req,res,next)=>{
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
};

//@desc Add/Post a single post
//  Add a new post to posts
export const addPost = (req,res,next)=>{
    const { id , title } = req.body;
    if(!id || !title){
        const error = new Error(`Please fill all the fields`);
        error.status = 404;
        return next(error);
    }
    posts.push(req.body);
    res.status(201).json(posts);      
};

//@desc Update the title of a single post
// Update the title of a post on the basis of params.id
export const updatePost = (req,res,next)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=> post.id === id);
    if(!post){
        const error = new Error(`A post with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }
    post.title = req.body.title;
    res.status(200).json(posts);
      
};

//@desc Delete a single post
// Delete a post on the basis of params.id
export const deletePost = (req,res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=> post.id === id);
    if(!post){
        const error = new Error(`A post with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }

    posts = posts.filter((post)=>post.id!==id);
    res.status(200).json(posts);
};