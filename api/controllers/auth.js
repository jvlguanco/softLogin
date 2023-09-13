// Packages
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import validator from 'validator';

// Model & JS Imports
import User from '../models/Users.js';
import UserOTP from '../models/UserOTP.js';
import {createError} from '../utils/error.js';
dotenv.config();

// Email Configuration
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth:{
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD
    }
});

// Register User
export const register = async (req, res, next) => {
    try{
        let { username, email, password } = req.body;

        if (!username || !email || !password)
            return next(createError("Empty Field!", 400));
        else if (!validator.isEmail(email))
            return next(createError("Invalid Email!", 400));
        else if (password.length < 8)
            return next(createError("Password should be 8 characters long!", 400));
        else {
            const existingEmail = await User.findOne({email: email});
            const existingUser = await User.findOne({username: username});

            if (existingUser || existingEmail)
                return next(createError("Username or Email is already used!", 400));
            else {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);

                const newUser = new User({
                    username: username,
                    email: email,
                    password: hash,
                });

                const user = await newUser.save()
                res.status(200).json(user);
            }
        }
    } catch(err){
        next(err);
    }
};

// Login User
export const login = async (req, res, next) => {
    const input = req.body.username || req.body.email;

    if(!input)
        return next(createError("Enter Username or Email", 400));

    try{
        const user = await User.findOne({
            $or: [
                { username: input },
                { email: input }
            ]
        });

        if(user){
            const otp = Math.floor(100000+Math.random()*900000);
            const existingEmail = await UserOTP.findOne({email: user.email});
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            console.log(existingEmail);

            if(!validPassword)
                return next(createError("Incorrect Password", 400));

            if(existingEmail){
                const updateData = await UserOTP.findByIdAndUpdate({_id: existingEmail._id}, {
                    OTP: otp
                }, {new:true});

                await updateData.save();

                const mailOptions = {
                    from: process.env.AUTH_EMAIL,
                    to: existingEmail.email,
                    subject: "OTP for Sample Application",
                    text: `OTP: ${otp}`
                }
                
                transporter.sendMail(mailOptions, (error, info) => {
                    if(error){
                        console.error("Email not sent:", error);
                        res.status(400).json({ message: "Email not sent!!" });
                    }
                    else{
                        console.log("Email sent:", info.response);
                        res.status(200).json({message: "Email Sent!"});
                    }
                });
            } else {
                const saveOTPData = new UserOTP({
                    email: user.email,
                    OTP: otp
                });

                await saveOTPData.save();
                const mailOptions = {
                    from: process.env.AUTH_EMAIL,
                    to: user.email,
                    subject: "OTP for Sample Application",
                    text: `OTP: ${otp}`
                }
                
                transporter.sendMail(mailOptions, (error, info, next) => {
                    if(error)
                        res.status(400).json({message: "Email not sent!!"});
                    else
                        res.status(200).json({message: "Email Sent!"});
                });
            }
        } else
            return next(createError("User does not exist", 400));

    } catch(err){
        next(err);
    }
};