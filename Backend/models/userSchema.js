const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
    {
        name:{type:String,required :true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        tokens:[{token:{type:String}}]
    }
);
userSchema.pre('save',async function (next){
    try{
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password,12)
            next();
        }
    }catch(e){
        console.log(e);
        next();
    }
})
const User = mongoose.model('user',userSchema);
module.exports = User