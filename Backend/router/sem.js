const express = require('express')
const semRouter = express.Router();
const Dept = require('../models/Deptartment')
const Sem = require('../models/Semester')
semRouter.use(express.json())

semRouter.post('/add',async (req,res)=>{
    try{
        const {semNo,deptCode}=req.body;
        const dept = await Dept.findOne({'code':deptCode});
        if(!dept)return res.status(404).send({message:"No department with given code found"});
        const isExist = await Sem.findOne({'semNo':semNo,'deptId':dept._id});
        if(isExist)return res.status(422).send({message:"Semester with given data already exists"});
        const newSem = await new Sem({semNo:semNo,deptId:dept._id});
        const save = await newSem.save();
        if(!save)return res.status(500).send({message:'Failed to save'});
        return res.status(200).send({message:"Semester saved successfully"});
    }catch(e){
        return res.status(400).send({message:"Internal server error"})
    }
})

module.exports = semRouter;