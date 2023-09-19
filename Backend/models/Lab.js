const mongoose = require('mongoose')

const labSchema = new mongoose.Schema(
    {
        lab:{type:Number,required:true},
        deptId:{type:mongoose.Schema.Types.ObjectId,ref:'Department',required:true}
    },
    {
        timestamps:true,
    }
)
const Lab = mongoose.model('Lab',labSchema);
module.exports = Lab