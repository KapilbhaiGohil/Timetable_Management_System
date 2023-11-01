const express = require('express')
const subjectRouter = express.Router();
const Dept = require('../models/Deptartment');
const Sem = require('../models/Semester');
const Subject = require('../models/Subject')

subjectRouter.use(express.json())

subjectRouter.post('/add',async (req,res)=>{
    try{
        const {subName,subCode,deptCode,semNo}=req.body;
        const dept = await Dept.findOne({'code':deptCode})
        const sem = await Sem.findOne({'semNo':semNo,'deptId':dept._id})
        if(!sem)return res.status(404).send({message:"Respective department or semester not found"});
        const isExist = await Subject.findOne({'subName':subName})
        if(isExist)return res.status(422).send({message:"Subject is already there"})
        const newSub = await new Subject({subName,subCode,'deptId':dept._id,'semId':sem._id});
        const save = await newSub.save();
        if(!save)res.status(500).send({message:"Subject not save due to some server errors"})
        res.status(200).send({message:"Subject added succssfully"});
    }catch(e){
        return res.status(500).send({message:"Internal server error"})
    }
})

module.exports = subjectRouter