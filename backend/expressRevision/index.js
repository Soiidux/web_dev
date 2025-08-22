import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import url from 'url';

dotenv.config();

//initializing port and app
const PORT = process.env.PORT;
const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,'public'))); 
//Static enables you to make the contents of a folder publically accessible through http
//For example if in this case I go to localhost:PORT/ it would lead me to index.html and if I were to go to localhost:PORT/about.html it
//would lead me to about.html

// //making routes
// app.get('/',(req,res)=>{
//     //In express you dont need to declare what type of data is going to be sent, its all dynamic
//     // res.send("Normal text");     
//     // res.send("<h1>HTML text</h1>");
//     // res.send({message: "JSON object"});
//     res.sendFile(path.join(__dirname,'public','index.html'));
// })

// app.get('/about',(req,res)=>{
//     // res.send("This is the about page");
//     res.sendFile(path.join(__dirname,'public','about.html'));
// })


//making the app listen at the port
app.listen(PORT,()=>{
    console.log(`Server is running at port : ${PORT}`);
})