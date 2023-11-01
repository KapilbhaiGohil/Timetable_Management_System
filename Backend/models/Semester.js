const mongoose = require('mongoose')

const semSchema = new mongoose.Schema(
    {
        semNo:{type:Number,required:true},
        deptId:{type:mongoose.Schema.Types.ObjectId,ref:'Department',required: true}
    },
    {
        timestamps:true,
    }
)
const Sem = mongoose.model('Semester',semSchema);

module.exports = Sem