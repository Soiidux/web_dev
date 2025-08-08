import express from "express"
import { registerUser,verifyUser } from "../controller/auth.controller.js";
const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.get("/verify/:token",verifyUser)

export default userRouter;