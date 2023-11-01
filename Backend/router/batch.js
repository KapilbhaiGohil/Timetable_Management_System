const express = require('express')
const batchRouter=express.Router();
const Sem = require('../models/Semester')
const Dept = require("../models/Deptartment");
const Batch = require('../models/Batch')
batchRouter.use(express.json());

batchRouter.post('/add',async (req,res)=>{
    try{
        const {batchName,semNo,deptCode,subBatch}=req.body;
        const dept = await Dept.findOne({'code':deptCode});
        const sem = await Sem.findOne({'semNo':semNo,'deptId':dept._id});
        if(!sem)return res.status(404).send({message:"Respective department or semester not found"});
        const isExist = await Batch.findOne({'semId':sem._id,'batchName':batchName})
        if(isExist)return res.status(422).send({message:"Batch is already there"})
        const newBatch = await new Batch({batchName,'semId':sem._id,subBatch});
        const save =await newBatch.save();
        if(!save)return res.status(422).send({message:"Internale server error failed to save the batch"})
        return res.status(200).send({message:"Batch saved successfully"})
    }catch (e){
        return res.status(500).send({message:"Internal server error"})
    }
})

module.exports = batchRouter;