import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = await new Promise(resolve => setTimeout(() => resolve(new PrismaClient()), 100));

import bcrypt from "bcrypt"
import crypto from "crypto"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();
// const prisma = new PrismaClient();

export const registerUser = async (req,res) => {
    //take args from the user 
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        console.log("Data is missing.")
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        })
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: {email}
        })

        if(existingUser){
            console.log("User already exists");
            return res.status(400).json({
                success:false,
                message: "User already exists"
            })
        }

        console.log(existingUser);

        //hash the pass
        const hashedPassword = await bcrypt.hash(password,10);
        //create a verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                verificationToken: verificationToken
            }
        })

        //send a mail using nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.ETHEREAL_HOST,
            port: process.env.ETHEREAL_PORT,
            secure:false,
            auth: {
                user: process.env.ETHEREAL_USER,
                pass: process.env.ETHEREAL_PASS
            },
        });

        const info = await transporter.sendMail({
            from: `'Admin' <${process.env.ETHEREAL_USER}>`,
            to: email,
            subject: "Verify your email",
            text: `Please click on the following link: ${process.env.BASE_URL}/api/v1/users/verify/${verificationToken}`, // plain‑text body
            html: "<b>Hello world?</b>", // HTML body
        })
        const testEmailURL = nodemailer.getTestMessageUrl(info);
        console.log("Verify Email:", testEmailURL);
        res.status(201).json({
            success:true,
            message:`User registered successfully, please verify your email: ${testEmailURL}`
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            error,
            message:"Something went wrong."
        })
    }
    //check if they are correct
    //check if email exists in db
    //add user to db
}