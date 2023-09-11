const express = require('express');
const User = require('../models/userSchema')

const router = express.Router()
router.use(express.json())
router.post('/login',(req,res)=>{

})
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