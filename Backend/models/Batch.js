const mongoose = require('mongoose')

const batchSchema = new mongoose.Schema(
    {
        batchName:{type:String,required:true},
        subBatch:[{type:String,required: true}],
        semId:{type:mongoose.Schema.Types.ObjectId,ref:'Semester',require:true}
    }
)
const Batch = mongoose.model('Batch',batchSchema)
module.exports = Batch;