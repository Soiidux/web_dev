import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controllers.js";
import {validate} from "../middlewares/validator.middleware.js"
import {userLoginValidator,userRegistrationValidator} from "../validators/index.js"
const authRouter = Router();

authRouter.route('/register').post(userRegistrationValidator(),validate,registerUser);
authRouter.route('/login').post(userLoginValidator(),validate,loginUser);
export default authRouter;
