// const express = require('express')   //only valid when type is classicjs in package.json
import express from "express"
import dotenv from "dotenv" //Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
import cors from "cors" //one of the biggest headaches in dev world
import dbConnect from "./utils/db.js"; //Importing a function to connect to a db

// dotenv.config(pathname)
dotenv.config()

const app = express()   //now app can do everything that express can do
const port = process.env.PORT || 3000


app.use(cors({
  //configuration
  origin : process.env.BASE_URL,                  //this or an array of origins, origin is from where I want the request to come
  methods : ["GET","POST","DELETE","OPTIONS"],        //not case sensitive
  allowedHeaders : ["Content-Type","Authorization"]   //case sensitive
}))


app.use(express.json())                               //now the server accepts json
app.use(express.urlencoded({extended:true}))          //lets your app read form data sent from websites.

//we are making a web server

app.get('/', (req, res) => {                //whenever a request (req) is made, we give some response(res)
  res.send('Cohort!')
})

app.get("/firstname",(req,res) => {         // syntax : appname.get("route",callback with request and response)
    res.send("Yash")
})

app.get("/lastname",(request,response) => {
    response.send("Nagpal")
})

//connect to db
dbConnect();
console.log(process.env.PORT);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
