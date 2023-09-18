const express = require('express')
const Dept = require('../models/Deptartment')
const deptRouter = express.Router();
deptRouter.use(express.json());

deptRouter.post('/add',async (req,res)=>{
    try{
        const {name,code,desc} = req.body;
        const exist = await Dept.findOne({'name':name});
        if(exist)return res.status(422).send({message:"dept already exists"})
        const newdept = await new Dept({name,code,desc});
        const createdept = await newdept.save();
        if(createdept)return res.status(200).send({message:"Department created successfully"});
        return res.status(422).send({message:"Department failed to save, please try again"});
    }catch (e){
        return res.status(500).send({message:"Internal server error"})
    }
})
deptRouter.post('/getdept',async(req,res)=>{
    try{
        const {code}=req.body;
        const get_dept = await Dept.findOne({'code':code});
        if(!get_dept)return res.status(422).send({message:"No department found"});
        return res.status(200).json(get_dept);
    }catch (e) {
        return res.status(500).send({message:"Internal server error"})
    }
})
deptRouter.post('/getAllDept',async(req,res)=>{
    try{
        const data = await Dept.find({});
        if(!data)return res.status(404).send({messange:"No departetns found"});
        return res.status(200).json(data);
    }catch(e){
        return res.status(500).send({message:"Internal Server Error"})
    }
})
module.exports = deptRouter