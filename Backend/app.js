const express = require('express');
const dotenv = require('dotenv')
dotenv.config({path:"./config.env"})
const router = require("./router/auth");
const app = express();
const connectDB = require('./database/conn')

connectDB(true)

app.use(router);
app.listen(process.env.PORT,()=>{
    console.log("Server started at port : "+process.env.PORT)
})