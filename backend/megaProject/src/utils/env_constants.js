import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});
export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
export const MONGODB_URI = process.env.MONGODB_URI;
