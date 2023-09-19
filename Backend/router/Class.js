const express = require('express')
const classRouter = express.Router();
const Dept = require('../models/Deptartment')
const Class = require('../models/Class')
classRouter.use(express.json());

classRouter.post('/add',async(req,res)=>{
    try{
        const {classroom,deptCode}=req.body;
        const dept = await Dept.findOne({'code':deptCode});
        if(!dept)return res.status(404).send({message:"Department not found"})
        const isExist = await Class.findOne({'deptId':dept._id,classroom});
        if(isExist)return res.status(422).send({message:"with this department classes already exists"})
        const newClass = await new Class({'classroom':classroom,'deptId':dept._id});
        const save  = await newClass.save();
        if(!save)return res.status(500).send({message:"Internal Error Class can't be saved"})
        return res.status(200).send({message:"Classes add successfully"})
    }catch(e){
        return res.status(500).send({message:"Internal server error"})
    }
})

module.exports = classRouter;