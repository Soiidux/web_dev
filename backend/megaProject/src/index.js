import app from './app.js';
import { PORT } from './utils/env_constants.js';
import cors from 'cors';
import dbConnect from './db/db.js';
import express from 'express';


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));