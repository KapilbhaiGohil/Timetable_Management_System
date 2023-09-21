const express = require('express');
const dotenv = require('dotenv')
dotenv.config({path:"./config.env"})
const router = require("./router/auth");
const app = express();
const connectDB = require('./database/conn')
const deptRouter = require('./router/dept')
const semRouter = require('./router/sem')
const subjectRouter= require('./router/subject')
const batchRouter = require('./router/batch')
const teacherRouter = require('./router/teacher')
const labRouter = require('./router/Lab')
const classRouter = require('./router/Class')
const customRouter = require('./router/CustumeQuery')
const ttRouter = require('./router/timetable')

connectDB(true)

app.use('/auth',router);
app.use('/dept',deptRouter);
app.use('/sem',semRouter);
app.use('/sub',subjectRouter);
app.use('/batch',batchRouter)
app.use('/teacher',teacherRouter)
app.use('/lab',labRouter)
app.use('/class',classRouter)
app.use('/custom',customRouter)
app.use('/timetable',ttRouter);

app.listen(process.env.PORT,()=>{
    console.log("Server started at port : "+process.env.PORT)
})