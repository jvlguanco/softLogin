// Imports
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

// Connect to MongoDB
export const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB")
    } catch(err){
        throw err;
    }
};

// Verifications
mongoose.connection.on("disconnected", ()=>{
    console.log("Disconnected");
});

mongoose.connection.on("connected", ()=>{
    console.log("Connected");
});