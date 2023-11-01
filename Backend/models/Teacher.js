const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true},
        deptId:{type:mongoose.Schema.Types.ObjectId,ref:'Department',required:true},
        shortName:{type:String,required:true}
    },
    {
        timestamps:true
    }
)
const Teacher = mongoose.model('Teacher',teacherSchema);
module.exports = Teacher