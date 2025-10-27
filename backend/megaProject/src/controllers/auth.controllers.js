import { asyncHandler } from "../utils/async-handler.js"
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"
import ApiError from "../utils/api-errors.js";
import { sendEmail, emailVerificationMailGenContent, passwordResetMailGenContent} from "../utils/mail.js";
import { CLIENT_URL, REFRESH_TOKEN_SECRET } from "../utils/env_constants.js";
import ApiResponse from "../utils/api-responses.js";

export const registerUser = asyncHandler(async (req,res)=>{

    //Get Data from the request body
    //Create a new user 
    //Create a temporary token and store it in db
    //Send the verification link to the user's email

    const {fullname,username,email,password} = req.body;
    //validation checks already done by validator middleware
    if(!fullname || !username || !email || !password){
        throw new ApiError(400,'All fields are required');
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new ApiError(400,'User already exists');
    }

    const user = await User.create({
        fullname,
        username,
        email,
        password,
    });
    
    if(!user){
        throw new ApiError(500,'User could not be created');
    }

    const tokenObject = user.generateTemporaryToken();
    
    user.verificationToken = tokenObject.hashedToken;
    user.verificationTokenExpiry = tokenObject.tokenExpiry;
    await user.save();

    const verificationUrl = `${CLIENT_URL}/verify/${tokenObject.unHashedToken}`;
    const mailGenContent = emailVerificationMailGenContent(username,verificationUrl);
    const sendMailOptions = {
        email,
        subject : "Verify your email",
        mailGenContent
    }
    await sendEmail(sendMailOptions);

    res.status(201).json(
        new ApiResponse(201,{message:'User created successfully'})
    )
});

export const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        throw new ApiError(400,'All fields are required');
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(404,'User not found');
    }

    if(!user.isVerified){
        throw new ApiError(401,'User is not verified');
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        throw new ApiError(401,'Invalid credentials');
    }

    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    user.refreshToken = refreshToken;
    user.refreshTokenExpiry = Date.now() + 24*60*60*1000;
    await user.save();

    res.cookie('refreshToken',refreshToken,{
        httpOnly : true,
        secure : true,
        maxAge : 24*60*60*1000
    })
    res.cookie('accessToken',accessToken,{
        httpOnly : true,
        secure : true,
        maxAge : 15*60*1000
    })

    res.status(200).json(
        new ApiResponse(200,{message:'User logged in successfully'})
    )
});

export const verifyUser = asyncHandler(async (req,res)=>{
    const {token} = req.params;

    if(!token){
        throw new ApiError(400,'Token not found');
    }

    const user = await User.findOne({verificationToken:token});

    if(!user){
        throw new ApiError(404,'Invalid token');
    }

    if(user.isVerified){
        throw new ApiError(400,'User is already verified');
    }

    if(user.verificationTokenExpiry < Date.now()){
        throw new ApiError(400,'Token expired');
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    res.status(200).json(
        new ApiResponse(200,{message:'User verified successfully'})
    )
});

export const refreshTokens = asyncHandler(async (req,res)=>{
    const token = req.cookies.refreshToken;
    if(!token){
        throw new ApiError(401,'Unauthorized: Token expired or invalid, please login again');
    }
    const decoded = jwt.verify(token,REFRESH_TOKEN_SECRET);
    const user = await User.findOne({_id:decoded.id});
    if(!user){
        throw new ApiError(401,'Unauthorized: Token expired or invalid, user not found, please login again');
    }
    if (user.refreshToken !== token) {
        throw new ApiError(401, "Refresh token is expired or has been reused. Please log in again.");
    }
    if(user.refreshTokenExpiry < Date.now()){
        throw new ApiError(401,'Unauthorized: Token expired or invalid, please login again');
    }
    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();
    user.refreshToken = newRefreshToken;
    user.refreshTokenExpiry = Date.now() + 24*60*60*1000;
    await user.save();

    res.cookie('refreshToken',newRefreshToken,{
        httpOnly : true,
        secure : true,
        maxAge : 24*60*60*1000
    })
    res.cookie('accessToken',newAccessToken,{
        httpOnly : true,
        secure : true,
        maxAge : 15*60*1000
    })

})

export const logoutUser = asyncHandler(async (req,res)=>{
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');

    res.status(200).json(
        new ApiResponse(200,{message:'User logged out successfully'})
    )    
});



