const mongoose = require('mongoose')
const dotenv = require('dotenv')
const {mongo} = require("mongoose");
dotenv.config({path:'./config.env'})

const db_local = process.env.LOCALDATABASE
const db_remote = process.env.REMOTEDATABASE
// console.log(db_string)
const connectDB = (isLocal)=>{
    if(isLocal && db_local){
        mongoose.connect(db_local).then(()=>{
            console.log("successfully connected to the local server")
        }).catch((error)=>console.log(error))
    }else if(!isLocal && db_remote){
        mongoose.connect(db_remote).then(()=>{
            console.log("succesfully connected to the remote server")
        }).catch((error)=>console.log(error))
    }else{
        console.log("can't get the connection string")
    }
}
module.exports = connectDB
