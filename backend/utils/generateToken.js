const jwt = require('jsonwebtoken')
const generateToken = (user)=>{

    return jwt.sign({userId:user?._id,emial:user.email},process.env.JWT_SECRET, {expiresIn:"30m"})
}

module.exports = {generateToken}