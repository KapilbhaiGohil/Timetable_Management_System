const express = require('express');
const router = require("./router/auth");
const app = express();
const connectDB = require('./database/conn')

connectDB(true)

app.use(router);
app.listen(8000,()=>{
    console.log("Server started")
})