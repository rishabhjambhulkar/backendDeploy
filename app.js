import express from 'express';
import router from './routes.js'; // Import the routes

const app = express();

// Middleware
app.use(express.json());

// Use routes
app.use('/api', router);
app.get('/', (req, res) => {
    res.send(' Service Started');
});

export default app;
