// const express = require('express')   //only valid when type is classicjs in package.json
import express from "express"
const app = express()   //now app can do everything that express can do
const port = 3000


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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
