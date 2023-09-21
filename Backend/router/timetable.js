const express = require('express')
const TimeTable = require('../models/TimeTable')
const ttRouter = express.Router();
ttRouter.use(express.json())

ttRouter.post("/add",async(req,res)=>{
    try{
        const data = req.body;
        const newtt = await new TimeTable(data);
        const save = await newtt.save();
        if(!save)return res.status(500).send({message:"Unable to save the data "})
        return res.status(200).send({message:"TimeTable Saved Successfully"});
    }catch (e) {
        console.log(e)
        return res.status(500).send({message:"Internal Server Error"})
    }
})

module.exports = ttRouter;