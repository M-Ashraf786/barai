const mongoose = require('mongoose')

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
           
    })
    console.log(`App is connected with database`)
  }  catch (error) {
        console.error("Some issue occured in connecting database", error.message)
        process.exit(1);
    }
    
  

    
}

module.exports = connectDb

