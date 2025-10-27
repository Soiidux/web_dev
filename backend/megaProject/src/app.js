import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ApiResponse from './utils/api-responses.js';

const app = express();

//common middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



//router imports
import healthCheckRouter from './routes/healthcheck.routes.js';
import authRouter from './routes/auth.routes.js';

app.use('/healthcheck',healthCheckRouter);
app.use('/',authRouter);


//error handling middleware
app.use((err, req, res, next) => {
    // Log error to console
    console.error(err);

    // Respond with error details
    res.status(err.statusCode || 500).json(
        new ApiResponse(err.statusCode || 500,{message:err.message||'Internal Server Error', errors: err.errors || [],stack:err.stack || undefined},err.message)
    );
});

export default app;