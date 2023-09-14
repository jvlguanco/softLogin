// Imports
import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import authRoute from "./routes/auth.js";
import {connect} from './config/db.js';

// Initializations
const port = 3000;
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRoute);

// Error Handling
app.use((err, req, res, next) => {
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || "Something went wrong";
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage, 
        stack: err.stack,
    });
});

// Server
app.listen(port, ()=>{
    connect();
    console.log(`The app is running on port ${port}`)
})