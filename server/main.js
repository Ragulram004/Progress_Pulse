require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const progressRoutes = require('./routes/progress')
const userRoutes = require('./routes/user')
const cors = require('cors')

app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,PATCH,DELETE",
  credentials:true
}))


//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//route 
app.use('/api/progress',progressRoutes)
app.use('/api/user',userRoutes )

// Database connection
mongoose.connect(process.env.URI)

.then(()=>{
  //listen for requests
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Connected to DB and Server is running on PORT http://localhost:${port}`);
  })
})
.catch((error)=>{
  console.log(error)
})

