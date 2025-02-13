// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');

// const connectDb = require('./config/db')
// require('dotenv').config()

//   const userRoute = require('./routes/userRoute');
//   const postRoute = require('./routes/postRoute');
//   const memberRoute = require('./routes/memberRoute')


// const app = express();
// app.use(express.json());
// app.use(cookieParser());

// const corsOptions = {
//     origin:process.env.FRONTEND_URL,
//     credentials:true,
  
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "Cache-Control",
//       "pragma", // Added pragma to allowed headers
//     ],
//     exposedHeaders: ["Content-Range", "X-Content-Range"],
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
// }
// app.use(cors(corsOptions))

// connectDb();

//  app.use('/userCollection', userRoute);
 
//  app.use('/postCollection', postRoute);
//  app.use('/members', memberRoute)


// const PORT = process.env.PORT || 8000;
// app.listen(PORT, ()=>console.log(`App is running on ${PORT}` ));


//

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const serverless = require('serverless-http'); // Import serverless-http

const connectDb = require('./config/db');
require('dotenv').config();

const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const memberRoute = require('./routes/memberRoute');

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "pragma"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

connectDb();

// Define routes
app.use('/userCollection', userRoute);
app.use('/postCollection', postRoute);
app.use('/members', memberRoute);

// Export as a serverless function
module.exports = app;
module.exports.handler = serverless(app);
