import app from './app.js';
import { PORT } from './utils/env_constants.js';
import cors from 'cors';
import dbConnect from './db/db.js';
import express from 'express';

dbConnect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed", error);
        process.exit(1);
    });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));