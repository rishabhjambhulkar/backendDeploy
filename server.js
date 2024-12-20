import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';

const app = express();
const port = 4000;

// Middleware
app.use(express.json());

// Simple route
app.get('/', (req, res) => {
    res.send('Hello, Express with ESM!');
});

// Connect to MongoDB (replace with your MongoDB URI)
mongoose
    .connect('mongodb://127.0.0.1:27017/core', {
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Example Axios request
app.get('/data', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        res.json(response.data);
    } catch (err) {
        res.status(500).send('Error fetching data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
