import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username :{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phonenumber:{type:String,required:true,unique:true},
    role:{
        type:String,
        enum:['Student',"Recruiter","Admin"],
        default:"Student",
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{
            type:String
        }],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
        profilePhoto:{type:String,default:""}
    },
    verifyOtp:{type:String,default:""},
    verifyOtpExpireAt:{type:Number,default:0},
    isVerified:{type:Boolean,default:false},
    resetOtp:{type:String,default:""},
    resetOtpExpireAt:{type:Number,default:0}
},{timestamps:true})

const User = mongoose.model.User||mongoose.model('User',UserSchema)

export default User;