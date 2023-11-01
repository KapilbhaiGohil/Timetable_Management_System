const mongoose = require("mongoose")

const deptSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        code:{type:String,required:true},
        desc:{type:String,required:true},
    },
    {timestamps:true}
);
const Dept = mongoose.model('Department',deptSchema);
module.exports = Dept;