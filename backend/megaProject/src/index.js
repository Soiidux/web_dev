import app from './app.js';
import { PORT } from './utils/env_constants.js';
import dbConnect from './db/db.js';


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

