const express = require('express');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const router = express.Router()
router.use(express.json())
router.use(cookieParser())
const authenticateJWT = require("../middleware/authenticate")
const jwt = require("jsonwebtoken");
//login
router.post('/login',async(req,res)=>{
    try{
        const {email,pass} = req.body;
        const user = await User.findOne({email:email});
        if(!user)return res.status(422).send({"message":"no user found with email "+email})
        const password = user.password;
        const same = await bcrypt.compare(pass,password);
        if(!same)return res.status(422).send({"message":"invalid password"})
        const jwtoken = await user.generateAuthToken();
        // console.log(jwtoken)
        res.cookie("jwtoken",jwtoken,{expires:new Date(Date.now() + (15*24 * 60 * 60 * 1000)),httpOnly:true})//15 days store the cookie
        return res.status(201).send({"message":"successfull login"})
    }catch(e){
        return  res.status(500).send({"message":"internal server error"})
    }
});
//registration
router.post('/register',async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password)return res.status(422).send({"message":"missing data"})
        const user = await User.findOne({email:email});
        if(user)return res.status(422).send({"message":"user with this email already exists"})
        const newuser = new User({name,email,password})
        const create = await newuser.save()
        if(create)return res.status(201).send({"message":"data saved succesfully"})
        return res.status(500).send({"message":"error while saving data"})
    }catch (e){
        console.log(e)
        return  res.status(500).send({"message":"internal server error"})
    }
})
router.post('/authenticate',async(req,res)=>{
    try{
        const token = await req.cookies.jwtoken;
        if(!token){
            return res.status(401).json({ message: 'Authentication required' });
        }else{
            const decoded = await jwt.verify(token,process.env.SECRETKEY);
            const user = await User.findById(decoded._id);
            if(!user)return res.status(401).json({ message: 'User not found' });
            req.user = user;
            return res.status(200).send({message:"Successfull"});
        }
    }catch (e){
        console.log(e);
        return res.status(401).json({ message: 'Invalid token' });
    }
})
router.post('/logout',async (req,res)=>{
    try{
        res.clearCookie('jwtoken')
        return res.status(200).send({message:"successfully logged out"})
    }catch (e) {
        return res.status(500).send("Internal server error");
    }
})
module.exports = router