import {body} from "express-validator"

const userRegistrationValidator = () => {
    return [
        body('email')
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is invalid"),
        body('username')
            .trim()
            .notEmpty().withMessage("Username is required")
            .isLength({min:3}).withMessage("Username must be at least 3 characters long")
            .isLength({max:13}).withMessage("Username must be at most 13 characters long"),
        body('password')
            .trim()
            .notEmpty().withMessage("Password is required")
            .isLength({min:6}).withMessage("Password must be at least 6 characters long")
            .isLength({max:13}).withMessage("Password must be at most 13 characters long")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/).withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")
    ]
}

const userLoginValidator = () => {
    return [
        body('email')
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is invalid"),
        body('password')
            .trim()
            .notEmpty().withMessage("Password is required")
    ]
}


export {userRegistrationValidator,userLoginValidator}