const express = require('express')
const labRouter = express.Router();
const Dept = require('../models/Deptartment')
const Lab = require('../models/Lab')
labRouter.use(express.json());

labRouter.post('/add',async(req,res)=>{
    try{
        const {labs,deptCode}=req.body;
        const dept = await Dept.findOne({'code':deptCode});
        if(!dept)return res.status(404).send({message:"Department not found"})
        const isExist = await Lab.findOne({'deptId':dept._id});
        if(isExist)return res.status(422).send({message:"with this department Labs already exists"})
        const newLab = await new Lab({'labs':labs,'deptId':dept._id});
        const save  = await newLab.save();
        if(!save)return res.status(500).send({message:"Internal Error Class can't be saved"})
        return res.status(200).send({message:"Labs add successfully"})
    }catch(e){
        return res.status(500).send({message:"Internal server error"})
    }
})

module.exports = labRouter;