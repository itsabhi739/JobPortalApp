import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
   job:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Job',
    required:true
   },
   applicant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
   },
   resume:{type:String,default:""},
   resumeOriginalName:{type:String,default:""},
   status:{
    type:String,
    enum:['pending','shortlisted','accepted','rejected'],
    default:'pending'
   }
},{timestamps:true})


export const Application = mongoose.model('Application',applicationSchema);