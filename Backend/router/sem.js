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
semRouter.post("/getAllSem",async(req,res)=>{
    try{
        const allsem = await Sem.find({});
        if(allsem.length>0)return res.status(200).json(allsem);
        return res.status(404).send("No semesters are added to database")
    }catch(e){
        return res.status(500).send({message:"Internal Server Error"});
    }
})
semRouter.post("/getSemByDept",async(req,res)=>{
    try{
        const {deptCode} = req.body;
        const dept = await Dept.findOne({'code':deptCode});
        console.log(dept.code);
        const allsem = await Sem.find({'deptId':dept._id});
        if(allsem.length>0)return res.status(200).json(allsem);
        return res.status(404).send("No semesters are added to database")
    }catch(e){
        return res.status(500).send({message:"Internal Server Error"});
    }
})
module.exports = semRouter;