import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/auth.routes.js";

const app = express();                                      //gives all the powers of express to a variable called app
dotenv.config();                                            //process.env is setup
const port = process.env.PORT;                             

app.use(cookieParser());                                      //cookieParser is used to access cookies
app.use(express.json());                                    //Allows json to be taken as input
app.use(express.urlencoded({extended:true}));               //Allows data to be taken from url


app.use(cors({                                              //Using cors
    origin: process.env.BASE_URL
}))

app.listen(port,()=>{                                       //Express is now listening at port
    console.log(`Backend is listening at port ${port}`);
});

app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Reached /"
    })
})


app.use("/api/v1/users",userRouter)                         //Enable user routes