import express from "express";
import bodyParser from "body-parser";
import api from './routes/index.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_PATH, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((e) => console.log('MongoDB connection error:', e));

// Define the port and CORS origin
const PORT = process.env.SERVER_PORT || 9000;
const origin = process.env.CORS_ORIGIN || 'http://localhost:3000';

// Create an instance of express
const app = express();

// Middleware
app.use(cors({ origin }));
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser middleware correctly
app.use(bodyParser.json()); // Use body-parser middleware correctly
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use(api);

// Start the server
app.listen(PORT, () => {
    console.log(`Your app is running at http://localhost:${PORT}`);
});
