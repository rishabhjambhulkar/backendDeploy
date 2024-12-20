import mongoose from 'mongoose';
import app from './app.js';  // Import the Express application from app.js

const port = 4000;

// Connect to MongoDB (replace with your MongoDB URI)
mongoose
    .connect('mongodb+srv://rj:rj@cluster0.txxbktr.mongodb.net/backenddeploy', {})
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server after MongoDB connection
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((err) => console.error('MongoDB connection error:', err));
