const express = require('express')
const teacherRouter = express.Router();
teacherRouter.use(express.json());
const Dept = require('../models/Deptartment')
const Teacher = require('../models/Teacher')
const Lab = require("../models/Lab");

teacherRouter.post('/add',async(req,res)=>{
    try{
        const {name,shortName,email,deptCode}=req.body;
        const dept = await Dept.findOne({"code":deptCode});
        if(!dept)return res.status(404).send({message:"No Department Found with this code"})
        const isExist = await Teacher.findOne({email});
        if(isExist)return res.status(422).send({message:"Teacher with this email already exists"});
        const newTeacher = await new Teacher({name,email,shortName,'deptId':dept._id})
        const save = await newTeacher.save();
        if(!save)return res.status(500).send({message:"Internal server error unable to save the teacher"})
        return res.status(200).send({message:"Teacher Data saved successfully"})
    }catch(e){
        return res.status(500).send({message:"Internal server error"})
    }
})
teacherRouter.post('/getAllTeacher',async(req,res)=>{
    try{
        const data = await Teacher.find({});
        if(!data)return res.status(404).send({message:"No Teachers found"})
        const finaldata = [];
        for(const obj of data){
            finaldata.push({teacher:obj,availability:[]});
        }
        return res.status(200).json(finaldata);
    }catch(e){
        return res.status(500).send({message:"Internal server error"})
    }
})
module.exports = teacherRouter