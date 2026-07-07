import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type:String,
        required:true
    },],
    location:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        enum: ["Full Time", "Part Time", "Internship", "Remote"],
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true
    },
    position:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    application:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Application",
    },],
},{timestamps:true})


export const Job = mongoose.model('Job',jobSchema);