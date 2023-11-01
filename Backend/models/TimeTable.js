const mongoose = require('mongoose')

const TimeTableSchema = new mongoose.Schema(
    {},{strict:false}
)
const TimeTable = mongoose.model('TimeTable',TimeTableSchema);
module.exports = TimeTable;
