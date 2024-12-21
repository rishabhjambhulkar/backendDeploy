import mongoose from 'mongoose';
import app from './app.js';  // Import the Express application from app.js
import dotenv from 'dotenv';
dotenv.config();

const port = 8000;
console.log(process.env.DB)
const uri = process.env.DB
// Connect to MongoDB (replace with your MongoDB URI)
mongoose
.connect(uri, {

  })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server after MongoDB connection
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((err) => console.error('MongoDB connection error:', err));
