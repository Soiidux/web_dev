import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});

export const PORT = process.env.PORT;
export const CLIENT_URL = process.env.CLIENT_URL;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

export const MONGODB_URI = process.env.MONGODB_URI;

export const SMTP_HOST = process.env.SMTP_HOST; 
export const SMTP_PORT = process.env.SMTP_PORT;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;
export const SMTP_SENDER = process.env.SMTP_SENDER;