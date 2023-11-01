const express = require('express')
const labRouter = express.Router();
const Dept = require('../models/Deptartment')
const Lab = require('../models/Lab')
const Class = require("../models/Class");
labRouter.use(express.json());

labRouter.post('/add',async(req,res)=>{
    try{
        const {lab,deptCode}=req.body;
        const dept = await Dept.findOne({'code':deptCode});
        if(!dept)return res.status(404).send({message:"Department not found"})
        const isExist = await Lab.findOne({'deptId':dept._id,lab});
        if(isExist)return res.status(422).send({message:"with this department Labs already exists"})
        const newLab = await new Lab({'lab':lab,'deptId':dept._id});
        const save  = await newLab.save();
        if(!save)return res.status(500).send({message:"Internal Error Class can't be saved"})
        return res.status(200).send({message:"Labs add successfully"})
    }catch(e){
        return res.status(500).send({message:"Internal server error"})
    }
})
labRouter.post('/getAllLabs',async(req,res)=>{
    try{
        const data = await Lab.find({});
        if(!data)return res.status(404).send({message:"No Labs found"})
        const finaldata = [];
        for(const obj of data){
            finaldata.push({lab:obj,availability:[]});
        }
        return res.status(200).json(finaldata);
    }catch(e){
        return res.status(500).send({message:"Internal server error"})
    }
})
module.exports = labRouter;