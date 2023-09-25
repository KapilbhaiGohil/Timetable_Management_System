const User= require("../models/userSchema")
const jwt = require("jsonwebtoken")

const authenticateJWT = async (req,res,next)=>{
    try{
        const token = await req.cookies.jwtoken;
        if(!token){
            return res.status(401).json({ message: 'Authentication required' });
        }else{
            const decoded = await jwt.verify(token,process.env.SECRETKEY);
            const user = await User.findById(decoded._id);
            if(!user)return res.status(401).json({ message: 'User not found' });
            req.user = user;
            next();
        }
    }catch (e){
        console.log(e);
        return res.status(401).json({ message: 'Invalid token' });
    }
}
module.exports = authenticateJWT