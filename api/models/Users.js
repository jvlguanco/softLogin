// User Model for DB
import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        max: 50,
    },
    password: {
        type: String,
        required: true,
    },
});

export default mongoose.model('User', userSchema);