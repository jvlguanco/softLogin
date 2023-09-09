import User from '../models/Users.js';
import bcrypt from 'bcrypt'
import {createError} from '../utils/error.js'

export const register = async (req, res, next) => {
    try{
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let { username, email, password } = req.body;

        if (!username || !email || !password)
            return next(createError("Empty Field!", 400));
        else if (!emailRegex.test(email))
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
                    password: hash
                });

                const user = await newUser.save();
                res.status(200).json(user);
            }
        }
    } catch (err){
        next(err);
    }
};
