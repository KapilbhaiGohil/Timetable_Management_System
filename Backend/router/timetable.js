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
ttRouter.post('/getAllTimeTables',async(req,res)=>{
    try{
        const timetables = await TimeTable.find({});
        if(timetables.length>0)return res.status(200).json(timetables);
        return res.status(404).send({message:"No TimeTables found"});
    }catch (e) {
        return res.status(500).send({message:"Internal Server Error"})
    }
})

ttRouter.post("/deleteTimeTable",async(req,res)=>{
    try{
        const {_id} = req.body;
        const deleted = await TimeTable.deleteOne({_id:_id});
        if(!deleted)return res.status(500).send({message:"Some error occured"});
        return res.status(200).send({message:"Successfully Deleted"});
    }catch (e) {
        return res.status(500).send({message:"Internal server error"})
    }
})
module.exports = ttRouter;