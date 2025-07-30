import User from "../model/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer"
import dotenv from "dotenv"

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

export {registerUser};