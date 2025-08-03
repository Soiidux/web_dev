import User from "../model/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
dotenv.config()

const registerUser = async (req,res) => {
    //check if user exists in db
        // if user doesnt exist, create user in db
        //create verificationtoken
            //save token in db
            //send token to user as email
        //once verified, send success status to users

    //get data
    const {name,email,password} = req.body
    if (!name || !email || !password){      //validate, proper validations like email, password etc can be done using zod or yup
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        const existinguser = await User.findOne({email})                //Check if user exists in db
        if (existinguser){
            return res.status(400).json({
                message: "user already exists"
            })
        }

        const user = await User.create({                               //If user doesn't exist, create user
            name,
            email,
            password
        })

        console.log(user);

        if(!user){
            return res.status(400).json({
                message: "user not registerd"
            })
        }

        const token = crypto.randomBytes(32).toString("hex")            //create a verification token 
        console.log(token);                                             

        user.verificationToken = token;                                 //send the token to db
        await user.save();
        

// Create a test account or replace with real credentials.
        const testaccount = await nodemailer.createTestAccount()
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });

        const mailOptions = {
            from: `'Gretchen Beahan' <${process.env.MAILTRAP_USERNAME}>`,
            to: user.email,
            subject: "Verify your email",
            text: `Please click on the following link: ${process.env.BASE_URL}/api/v1/users/verify/${token}`, // plain‑text body
            html: "<b>Hello world?</b>", // HTML body
        };

        // Wrap in an async IIFE so we can use await.
        const info = await transporter.sendMail(mailOptions);
        const testEmailURL = nodemailer.getTestMessageUrl(info);
        console.log("Verify Email:", testEmailURL);
        


        res.status(201).json({
            message :"User registered successfully",
            success: true
        }
        )
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            message:"User not registered successfully",
            success: false
        })

    }
    // res.send("Registered");     
}




const verifyUser =  async(req,res) => {
    //get Token from url
    try{
        const {token} = req.params;
        if (!token){
            return res.status(400).json({
                message: "Invalid token"
            })
        }
        //validate and find user based on token
        const user = await User.findOne({verificationToken : token});
        if (!user){
            return res.status(400).json({
                message: "Invalid token"
            })
        }
        //set is verified to true
        user.isVerified = true;
        //remove verification token
        user.verificationToken = undefined;
        //save db and return response  
        await user.save()

        res.status(201).json({
            message :"User verified successfully"
        }
        )
    }
    catch(error){
        res.status(400).json({
            message:"Not verified"
        })
    }
}



const login = async (req,res) => {
    const {email,password} =  req.body
    if(!email || !password){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    try{
        const user = await User.findOne({email : email})
        if (!user){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }
        const isMatched = await bcrypt.compare(password,user.password)
        if (!isMatched){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }
        
        if(!user.isVerified){
            return res.status(400).json({
                message : "Please verify your email"
            })
        }

        const token = jwt.sign({id : user._id},"shhhhh",{
            expiresIn: "24h"
        })

        const cookieOptions = {
            httpOnly : true,
            secure : true,
            maxAge : 24*60*60*1000
        }
        res.cookie("token",token, cookieOptions)
        res.status(200).json({
            message : "User logged in successfully",
            token,
            user : {
                id: user._id,
                name : user.name,
                role : user.role
            }
        })
    }   
    catch(error){
        res.status(400).json({
            message: "User not logged in successfully"
        })
    }
}
export {registerUser};
export {verifyUser};
export {login};