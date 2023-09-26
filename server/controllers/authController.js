// @ts-nocheck
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
}

//register endpoint
const registerUser = async(req, res) => {
    try{
        const { name, email, password } = req.body;
        //check if name was entered
        if(!name){
            return res.json({
                error: 'name is required'
            })
        };
        //check email 
        const exist = await User.findOne({email});
        if(exist){
            return res.json({
                error: 'email is already in use'
            })
        };
        //chech if password is good
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialCharater = /[!@#$%^&*()_+-={}\\`~\[\];:'",.<>\/]/.test(password);
        if(!password || password.length < 6 || !hasUpperCase || !hasNumber || !hasSpecialCharater){
            return res.json({
                error: 'password is required and should meet the following conditions\n'+
                        '1. At least 6 characters long\n' +
                        '2. Contains at least one uppercase letter\n' +
                        '3. Contains at least one number\n' +
                        '4. Contains at least one special character (!@#$%^&*()_+{}[]:;<>,.?~-)'
            })
        };
        //create user
        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword
        });
        return res.json(user)
    }
    catch(error){
        console.log(error)
    }
} 

//login endpoint
const loginUser = async(req, res) => {
    try{
        const { email, password } = req.body;
        //check if user exists
        const user = await User.findOne({email}); 
        if(!user){
            return res.json({
                error: 'no user found'
            })
        }
        //check the password match
        const match = await comparePassword(password, user.password);
        if(match){
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (error, token) => {
                if(error){
                    throw error;
                }
                res.cookie('token', token).json(user)
            })
            // return res.json('password matched')
        }
        else{
            return res.json({
                error: 'password do not match'
            })
        }
    }
    catch(error){
        console.log(error)
    }
}

const getProfile = (req, res) => {
    const { token } = req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (error, user) => {
            if(error){
                throw error;
            }
            res.json(user)
        })
    }
    else{
        res.json(null)
    }
}

module.exports = {
    test ,registerUser, loginUser, getProfile
}