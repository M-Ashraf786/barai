const jwt = require('jsonwebtoken');
const response = require('../utils/responceHandler')

const authMiddleware = (req,res,next)=>{
    
    const member_token = req?.cookies?.member_token;
    if(!member_token){
        return response(res,401,'Authentication token not found')
    }
    try{
    const decode = jwt.verify(member_token,process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error){
    return response(res,401,'Invalid token or expired')
  }
}

module.exports = authMiddleware;