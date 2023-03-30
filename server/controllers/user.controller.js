const User = require('../models/user.model');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
    registerUser: async (req,res) => {
        try{
            const potentialUser = await User.findOne({email:req.body.email});
            if(potentialUser){
                res.status(400).json({message: 'That email already exists'})
            }else {
                const newUser = await User.create(req.body);
                const userToken = jwt.sign({_id:newUser._id, email:newUser.email}, secret, {expiresIn:'2h'})
                console.log(userToken);
                res.cookie('userToken', userToken, {httpOnly:true, maxAge: 2 * 60 * 60 * 1000}).status(201).json({message: 'User logged in', user:newUser})
            }
        }
        catch(err){
            console.log(err);
            res.status(400).json({error: err})
        }
    },
    login: async (req, res) => {
        try{
            const user = await User.findOne({email:req.body.email});
            if(user){
                const  passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if(passwordsMatch){
                    const userToken = jwt.sign({_id:user._id, email:user.email}, secret, {expiresIn:'2h'})
                    console.log(userToken);
                    res.cookie('userToken', userToken, {httpOnly:true, maxAge: 2 * 60 * 60 * 1000}).status(201).json({message: 'User logged in', user:user})
                }else{
                    res.status(400).json({message: 'Invalid Email/Password'})
                }
            }
            else{
                res.status(400).json({message: 'Invalid Email/Password'})
            }
        }
        catch(err){
            res.status(400).json({error:err})
        } 
    },
    logout: (req, res) => {
        res.clearCookie('userToken').json({message: 'User is logged out'});
    }
}