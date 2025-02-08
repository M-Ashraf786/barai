
 const response = (res,statusCode,message,data=null)=>{

    const feedBack = {
        
        status: statusCode < 400 ? 'success' : 'error',
        message,
        data

    }

    return res.status(statusCode).json(feedBack);
}

module.exports = response;