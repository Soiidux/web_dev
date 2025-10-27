import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET } from "../utils/env_constants.js";
const userSchema = mongoose.Schema({
    avatar:{
        type : {
            url : String,
            localPath : String
        },
        default : {
            url : "https://placehold.co/600x400",
            localPath : ""
        },
    },
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : [true,"Password is required"]
    },
    fullname : {
        type : String,
        required : true
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    verificationToken : {
        type : String,
        default : ""
    },
    verificationTokenExpiry : {
        type : Date,
        default : null
    },
    resetPasswordToken : {
        type : String,
        default : ""
    },
    resetPasswordTokenExpiry : {
        type : Date,
        default : null
    },
    refreshToken : {
        type : String,
        default : ""
    },
    refreshTokenExpiry: {
        type: Date,
        default: null
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10) 
    }
    next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            fullname : this.fullname,
            email : this.email
        },
        ACCESS_TOKEN_SECRET,
        {expiresIn : ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            id:this._id
        },
        REFRESH_TOKEN_SECRET,
        {expiresIn: REFRESH_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateTemporaryToken = function(){
    const unHashedToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex");
    const tokenExpiry = Date.now() + 20*60*1000 //20 minutes

    return {unHashedToken,hashedToken,tokenExpiry}
}
export const User = mongoose.model("User", userSchema);