const Progress = require('../models/progressModel')
const mongoose = require('mongoose')

//get all progresses
const getProgresses = async(req,res)=>{

  const user_id = req.user._id

  const progresses = await Progress.find({user_id}).sort({createdAt:-1})
  res.status(200).json(progresses)
}


//get a single progress
const getProgress = async (req,res)=>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No Such progress'})
  }
  const progress = await Progress.findById(id)

  if(!progress){
    return res.status(404).json({error:"No sucn Progress"})
  }

  res.status(200).json(progress)
}


//create new progress
const createProgress = async (req,res)=>{
  const {title,hrs,discription} = req.body

  let emptyFields = []
  if(!title){
    emptyFields.push('title')
  }
  if(!hrs){
    emptyFields.push('hrs')
  }
  if(!discription){
    emptyFields.push('discription')
  }

  if(emptyFields.length > 0){
    return res.status(400).json({error:'Please fill in all the fields',emptyFields})
  }
  //add a document to DB
  try{
    const user_id = req.user._id
    const progress = await Progress.create({title,hrs,discription,user_id})
    res.status(200).json(progress)
  }catch(error){
    res.status(400).json({error:error.message})
  }
}

//delete a progress
const deleteProgress = async(req,res)=>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No Such progress'})
  }

  const progress = await Progress.findOneAndDelete({_id: id})
  if(!progress){
    return res.status(404).json({error:"No sucn Progress"})
  }
  res.status(200).json(progress)
}


//update progress
const updateProgress = async(req,res)=>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No Such progress'})
  }
  const progress = await Progress.findOneAndUpdate({_id:id},{
    ...req.body
  })
  if(!progress){
    return res.status(404).json({error:"No sucn Progress"})
  }

  res.status(200).json(progress)
}


module.exports = {
  createProgress,
  getProgresses,
  getProgress,
  deleteProgress,
  updateProgress
}