// User OTP Model for DB
import mongoose from "mongoose";
const {Schema} = mongoose;

const userOTPSchema = new Schema({
    email: {
        type: String,
        max: 50,
    },
    OTP: String
});

export default mongoose.model('UserOTP', userOTPSchema);