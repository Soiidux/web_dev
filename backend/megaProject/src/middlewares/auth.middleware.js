import ApiResponse from "../utils/api-responses.js";
import ApiError from "../utils/api-errors.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../utils/env_constants.js";


export const verifyAuthentication = async (req,res,next)=>{
    //this just returns user details
    try {
        const accessToken = req.cookies.accessToken;
        if(!accessToken){
            req.user = null;
            return next();
        }
        const decoded = jwt.verify(accessToken,ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        req.user = null;
        next();
    }
}

export const protectRoute = async (req,res,next)=>{
    // This only works if verifyAuthentication ran first
    if (!req.user) {
        return next(new ApiError(401, "Unauthorized: You must be logged in."));
    }
    next();
}
