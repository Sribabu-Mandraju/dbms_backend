import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import studentRoutes from "./routes/api.routes.js"; // Import student routes using ES modules

dotenv.config();  // Load environment variables

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
const server = http.createServer(app);

// Middleware setup
app.use(express.json());

// CORS setup: Allow requests from any origin
app.use(cors({
    origin: '*',  // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allow specific headers
    credentials: true,  // Allow cookies or authorization headers
}));

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Use student routes
app.use("/api/students", studentRoutes);

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default server; // Export server for testing or further use
