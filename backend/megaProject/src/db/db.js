import mongoose from "mongoose";
import { MONGODB_URI } from "../utils/env_constants.js";
const dbConnect = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected");
    } catch (error) {
        console.error("Mongodb connection failed", error);
        process.exit(1);
    }
};

export default dbConnect;