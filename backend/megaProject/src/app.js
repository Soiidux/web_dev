import express from 'express';

const app = express();

//router imports
import healthCheckRouter from './routes/healthcheck.routes.js';

app.use('/healthcheck',healthCheckRouter);
export default app;