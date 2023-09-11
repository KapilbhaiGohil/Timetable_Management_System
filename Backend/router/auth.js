const express = require('express');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt')
const router = express.Router()
router.use(express.json())
//login
router.post('/login',async(req,res)=>{
    try{
        const {email,pass} = req.body;
        const user = await User.findOne({email:email});
        if(!user)return res.status(422).send({"messege":"no user found with email "+email})
        const password = user.password;
        const same = await bcrypt.compare(pass,password);
        if(!same)return res.status(422).send({"messege":"invalid password"})
        const jwtoken = await user.generateAuthToken();
        // console.log(jwtoken)
        res.cookie("jwtoken",jwtoken,{expires:new Date(Date.now() + (15*24 * 60 * 60 * 1000)),httpOnly:true})//15 days store the cookie
        return res.status(201).send({"messege":"successfull login"})
    }catch(e){
        console.log(e)
        return  res.status(500).send({"messege":"internal server error"})
    }
})
//registration
router.post('/register',async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password)return res.status(422).send({"messege":"missing data"})
        const user = await User.findOne({email:email});
        if(user)return res.status(422).send({"messege":"user with this email already exists"})
        const newuser = new User({name,email,password})
        const create = await newuser.save()
        if(create)return res.status(201).send({"messege":"data saved succesfully"})
        return res.status(500).send({"messege":"error while saving data"})
    }catch (e){
        console.log(e)
        return  res.status(500).send({"messege":"internal server error"})
    }
})
module.exports = router