import { validationResult } from "express-validator"
import ApiError from "../utils/api-errors.js"
export const validate = (req,res,next)=>{
    const errors = validationResult(req)

    if (errors.isEmpty()){
        return next()
    }
    const extractedError = [];
    errors.array().map((err)=>{
        extractedError.push({
            [err.path]:err.msg
        })
    })

    const error = new ApiError(400,'Validation Failed',extractedError);
    next(error);
}