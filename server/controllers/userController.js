const User = require('../models/userModel')

//loginController 
const userLogin = async(req,res) =>{
  res.send('login msg')
}

//signupController
const userSignup = async(req,res) =>{
  res.send('Signup msg');
}

module.exports = {userLogin,userSignup}