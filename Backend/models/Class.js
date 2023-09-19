const mongoose = require('mongoose')

const classSchema = new mongoose.Schema(
    {
        classroom:{type:Number,required:true},
        deptId:{type:mongoose.Schema.Types.ObjectId,ref:'Department',required:true}
    },
    {
        timestamps:true,
    }
)
const Class = mongoose.model('Class',classSchema);
module.exports = Class