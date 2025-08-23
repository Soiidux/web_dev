import express from 'express';
import dotenv from 'dotenv';
import path, { parse } from 'path';
import url from 'url';
import router from './userRoutes/user.routes.js';

dotenv.config();

//initializing port and app
const PORT = process.env.PORT || 8000;
const app = express();


// app.use(express.static(path.join(__dirname,'public'))); 
//Static enables you to make the contents of a folder publically accessible through http
//For example if in this case I go to localhost:PORT/ it would lead me to index.html and if I were to go to localhost:PORT/about.html it
//would lead me to about.html

//user routes
app.use(router);



//making the app listen at the port
app.listen(PORT,()=>{
    console.log(`Server is running at port : ${PORT}`);
})