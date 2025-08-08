import express from "express"
import { loginUser, registerUser, verifyUser } from "../controller/auth.controller.js";
const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.get("/verify/:token",verifyUser)
userRouter.post("/login",loginUser);

export default userRouter;