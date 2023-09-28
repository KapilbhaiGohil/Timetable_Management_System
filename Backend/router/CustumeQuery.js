const express = require('express')
const customRouter = express.Router();
customRouter.use(express.json());
const Dept = require('../models/Deptartment')
const Sem = require('../models/Semester')
const Subject = require('../models/Subject')
const Batch = require('../models/Batch')
const Teacher = require('../models/Teacher')
const Class = require('../models/Class')
const Lab = require('../models/Lab')


//based on give dept find all the sem and batches of the dept
customRouter.post("/getSemByDept",async(req,res)=>{
    try{
        const {deptCode}=req.body;
        const dept = await Dept.findOne({'Code':deptCode});
        if(!dept)return res.status(404).send({message:"Department with given code not found"})
        const sem = await Sem.find({'deptId':dept._id})
        if(sem.length===0)return res.status(404).send({message:"semester with give dept not found"});
        return res.status(200).json(sem);
    }catch (e) {
        return res.status(500).send({message:"Internal server error"})
    }
})
customRouter.post('/getBatchBySem',async(req,res)=>{
    try{
        const {semId}=req.body;
        if(!semId)return res.status(422).send({message:"semId required"})
        const batch = await Batch.find({semId});
        if(batch.length===0)return res.status(404).send({message:"No batches found with selected semesters"});
        return res.status(200).json(batch);
    }catch (e) {
        return res.status(500).send({message:"Internal server error"+e.message})
    }
})

customRouter.post('/getAllDataInfo',async(req,res)=>{
    try {
        const {semId,deptId}=req.body;
        if(!semId || !deptId)return res.status(422).send({message:"semId and deptId both required"});
        //subject,teacher,classroom,lab
        const subjects = await Subject.find({semId});
        const teachers = await Teacher.find({deptId});
        const classrooms = await Class.find({deptId});
        const labs = await Lab.find({deptId});
        if(subjects.length===0 || teachers.length === 0 || classrooms.length === 0||labs.length===0){
            return res.status(404).send({message:"Some data missing"});
        }
        return res.status(200).json({subjects,teachers,classrooms,labs})
    }catch (e) {
        return res.status(500).send({message:"Internal server error "+e.message})
    }
});
customRouter.post("/getAllInfoBySemAndDept",async(req,res)=>{
    try {
        const {semId,deptId}=req.body;
        if(!semId || !deptId)return res.status(422).send({message:"semId and deptId both required"});
        //subject,teacher,classroom,lab
        const subjects = await Subject.find({semId});
        const teachers = await Teacher.find({deptId});
        const classrooms = await Class.find({deptId});
        const labs = await Lab.find({deptId});
        const batches = await Batch.find({semId});
        if(subjects.length===0 || teachers.length === 0 || classrooms.length === 0||labs.length===0 || batches.length ===0){
            return res.status(404).send({message:"For the selected sem and dept in database one of the following data is not there" +
                    "1.subjects 2.teachers 3.classrooms 4.labs 5.batches"});
        }
        return res.status(200).json({subjects,teachers,classrooms,labs,batches})
    }catch (e) {
        return res.status(500).send({message:"Internal server error "+e.message})
    }
});
customRouter.post("/getSubBySemId",async(req,res)=>{
    try{
        const {semId}=req.body;
        if(!semId)return res.status(422).send({message:"semId required"})
        const subs = await Subject.find({semId});
        if(subs.length===0)return res.status(404).send({message:"No Subjects  found with selected semesters"});
        return res.status(200).json(subs);
    }catch (e) {
        return res.status(500).send({message:"Internal server error"+e.message})
    }
})
module.exports = customRouter;