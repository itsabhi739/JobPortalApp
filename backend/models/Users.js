import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username :{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    verifyOtp:{type:String,default:""},
    verifyOtpExpireAt:{type:Number,default:0},
    isVerified:{type:Boolean,default:false},
    resetOtp:{type:String,default:""},
    resetOtpExpireAt:{type:Number,default:0}
})

const User = mongoose.model.User||mongoose.model('User',UserSchema)

export default User;