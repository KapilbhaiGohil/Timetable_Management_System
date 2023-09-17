const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema(
    {
        subName:{type:String,required:true},
        subCode:{type:String,required:true},
        semId:{type:mongoose.Schema.Types.ObjectId,ref:'Semester',required:true},
        deptId:{type:mongoose.Schema.Types.ObjectId,ref:'Department',required:true},
    },
    {
        timestamps:true
    }
)
const Subject = mongoose.model('Subject',subjectSchema);
module.exports = Subject;