const mongoose = require('mongoose') 
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

const userSchema = new Schema({
  email:{
    type: String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true
  }

})

// static signup method
userSchema.statics.signup = async function(email,password) {

  //validation
  if(!email || !password){
    throw Error ('Please fill in all the fields')
  }
  if(!validator.isEmail(email)){
    throw Error('Email is not Valid')
  }
//  if (!validator.isStrongPassword(password)) {
//     throw Error('Password not strong enough')
//   }


  const exists = await this.findOne({email})
  if(exists){
    throw Error('Email already in use')
  }
  // salt => not same encrypted for same passwords 
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password,salt)
  const user = await this.create({email,password:hash})

  return user
}

//static login method
userSchema.statics.login = async function(email,password) {
  
  if(!email || !password){
    throw Error ('Please fill in all the fields')
  }

  const user = await this.findOne({email})
  if(!user){
    throw Error ('User Not Found')
  }

  const passmatch = await bcrypt.compare(password,user.password)
  if(!passmatch){
    throw Error ('Incorrect Password')
  }

  return user
}


module.exports = mongoose.model('User',userSchema)