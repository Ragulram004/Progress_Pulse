require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const progressRoutes = require('./routes/progress')


//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//route 
app.use('/api/progress',progressRoutes)

// Database connection
mongoose.connect(process.env.URI)
  .then(()=>{
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB and Server is running on PORT http://localhost:${process.env.PORT}`);
    })
  })
  .catch((error)=>{
    console.log(error)
  })

