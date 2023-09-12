const User = require("../models/userSchema")
const jwt = require("jsonwebtoken")

const authenticateJWT = async (req,res,next)=>{
    const token = req.cookies.jwtoken;
    if(!token){
        return res.status(401).json({ message: 'Authentication required' });
    }
    try{
        const decoded = jwt.verify(token,process.env.SECRETKEY);
        const user = await User.findById(decoded._id);
        if(!user)return res.status(401).json({ message: 'User not found' });
        req.user = user;
        next();
    }catch (e){
        return res.status(401).json({ message: 'Invalid token' });
    }
}
module.exports = authenticateJWT