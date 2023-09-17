const mongoose = require('mongoose')

const labSchema = new mongoose.Schema(
    {
        labs:[{type:Number,required:true}],
        deptId:{type:mongoose.Schema.Types.ObjectId,ref:'Department',required:true}
    },
    {
        timestamps:true,
    }
)
const Lab = mongoose.model('Lab',labSchema);
module.exports = Lab