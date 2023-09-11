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
userSchema.methods.generateAuthToken = async function(){
    try{
        generated_token =  jwt.sign({_id:this._id},process.env.SECRETKEY)
        this.tokens = this.tokens.concat({token:generated_token})
        await this.save()
        return generated_token
    }catch(e){
        console.log(e);
    }
}
const User = mongoose.model('user',userSchema);
module.exports = User