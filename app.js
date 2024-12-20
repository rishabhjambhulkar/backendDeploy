import express from 'express';
import router from './routes.js'; // Import the routes

const app = express();

// Middleware
app.use(express.json());

// Use routes
app.use('/core', router);

export default app;
