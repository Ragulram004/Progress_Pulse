const mongoose = require('mongoose');
const progresSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  hrs:{
    type: Number,
    required: true,
  },
  discription:{
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true
  }
},{timestamps:true})
module.exports = mongoose.model('Progress',progresSchema);

