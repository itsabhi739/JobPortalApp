import User from '../models/Users.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { sendRegisterSuccessMail, sendVerificationOTPMail, sendResetPasswordMail } from '../config/sendMails.js'

export const register = async(req,res)=>{

    const {username,email,password,phonenumber,role} = req.body;

    if(!email||!password||!username ||!phonenumber||!role){
        return res.status(400).json({
            success:false,
            message:"Fill all the details to register the user"
        })
    }
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists!!"
            })
        }

        //password hashing with salt vaue 10
        const hashedPassword = await bcrypt.hash(password,10);
        
        //generate verification OTP
        const otp = String(Math.floor(100000+Math.random()*900000));
        
        //creating a new user with OTP
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            phonenumber,
            role,
            verifyOtp: otp,
            verifyOtpExpireAt: Date.now() + (24*60*60*1000)
        });
        await newUser.save();
        
        //send OTP verification email (don't fail registration if email fails)
        try {
            await sendVerificationOTPMail(email, otp);
        } catch (emailError) {
            console.error("Failed to send verification email:", emailError);
        }
        
        //creating jwt token (temporary, only for verification)
        const jwtToken = jwt.sign({id:newUser._id},process.env.SECRET_KEY,{expiresIn:'1hr'})
        //giving response as saving in cookie
        res.cookie('token',jwtToken,{
            // for dev environment it'll run on http
            httpOnly:true,
            //for production environment it'll run on https
            secure: process.env.NODE_ENV === 'production',
            //in local we will have backend running on same port but may differ after deploying the app
            sameSite:process.env.NODE_ENV === 'production' ? 'none' :'strict',
            maxAge:1*60*60*1000
        })
        
        sendRegisterSuccessMail(user.email);
        
        res.status(201).json({
            success:true,
            message:"User created successfully. Please verify your email with the OTP sent.",
            token:jwtToken
        })


    }catch(e){
        return res.status(500).json({
            success:false,
            message:"Failed to register the user"
        })
    }
}

export const login = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Email or password is missing"
        })
    }
    try{
        const user = await User.findOne({email});

        if(!user){
             return res.status(400).json({
            success:false,
            message:"User not found"
        })
        }
        const isMatched = await bcrypt.compare(password,user.password)
        if(!isMatched){
             return res.status(400).json({
            success:false,
            message:"Please add the correct password"
        })
        }

        // Check if user email is verified
        if(!user.isVerified){
            return res.status(403).json({
                success:false,
                message:"Please verify your email first"
            })
        }

         //creating jwt token
        const jwtToken = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'7d'})
        //giving response as saving in cookie
        res.cookie('token',jwtToken,{
            // for dev environment it'll run on http
            httpOnly:true,
            //for production environment it'll run on https
            secure: process.env.NODE_ENV === 'production',
            //in local we will have backend running on same port but may differ after deploying the app
            sameSite:process.env.NODE_ENV === 'production' ? 'none' :'strict',
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json({
            success:true,
            message:"User logged in successfully",
            token:jwtToken,
            user:{
                id:user._id,
                username:user.username,
                role:user.role,
                isVerified:user.isVerified
            }
        })

    }catch(e){
        return res.status(500).json({
            success:false,
            message: e.message
        })
    }
}

export const logout = async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.status(200).json({
            success:true,
            message:"User loggedout successfully"
        })

    }catch(e){
        return res.status(500).json({
            success:false,
            message: e.message
        })
    }
}

export const verifyEmailOTP = async(req,res)=>{
    try{
        const userId = req.userId;
        
        // Check if userId exists
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User not authenticated. Please login again"
            })
        }
        
        const user = await User.findById(userId);

        // Check if user exists in database
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        
        if(user.isVerified){
            return res.status(403).json({
                success:false,
                message:"User already verified"
            })
        }

        // Resend existing OTP (created during registration)
        if(!user.verifyOtp){
            return res.status(400).json({
                success:false,
                message:"OTP not found. Please register again"
            })
        }

        await sendVerificationOTPMail(user.email, user.verifyOtp);
        return res.status(200).json({success:true,message:"OTP sent successfully"})

    }catch(e){
        console.log("OTP Error:", e.message);
        return res.status(401).json({
            success:false,
            message:"Cannot verify the user",
            error: e.message
        })
    }
}

export const verifyEmail = async(req,res)=>{
    const {otp} = req.body;
    const userId = req.userId;
    
    if(!userId ||!otp){
        return res.status(400).json({success:false,message:"Email and OTP is required"})
    }
    
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        if(user.verifyOtp === '' || user.verifyOtp !== otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            }) 
        }

        if(user.verifyOtpExpireAt < Date.now()){
             return res.status(400).json({
                success:false,
                message:"OTP has expired"
            }) 
        }

        user.isVerified = true,
        user.verifyOtp='';
        user.verifyOtpExpireAt=0;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"Account Verified successfully"
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            message:"Failed to verify account"
        })
    }
}
export const SendResetPasswordOTP = async(req,res)=>{
        const {email} = req.body;
        if(!email){
            return res.status(400).json({success:false,message:"Email is required"})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

    try{
        const otp = Math.floor(100000+Math.random() * 900000)
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() +15*60*1000
        await user.save();
        sendResetPasswordMail(user.email,otp);
        return res.status(200).json({
            success:true,
            message:"Reset Password Mail Sent Successfully"
        })
    }catch(e){
        return res.status(500).json({success:false,message:e.message})
    }
}

export const ResetPassword = async (req,res)=>{
    const {email,otp,newPassword} = req.body;
    console.log(email,otp,newPassword)
    if(!otp || !email ||!newPassword){
        return res.status(400).json({
            success:false,
            message:"Missing Details"
        })
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            success:false,
            message:"User not found"
        })
    }
    
    if(user.resetOtp === '' ||String(user.resetOtp) !== String(otp)){
     return res.status(400).json({
        success:false,
        message:"Reset OTP is invalid"
     })   
    }

    if(user.resetOtpExpireAt<Date.now()){
        return res.json({
            success:false,
            message:"Expired OTP"
        })
    }
    const hashedPassword = await bcrypt.hash(newPassword,10)

    user.password = hashedPassword;
    user.resetOtp = ''
    user.resetOtpExpireAt=0
   await user.save();

   return res.status(200).json({success:true,message:"Password Changed Successfully"})


}


// Register → Password hash → JWT token → Cookie
// Login → Email/Password verify → JWT token → Cookie
// Protected Route → Middleware check JWT → Decode token → Get userId
// Send OTP → Middleware validate → Generate OTP → Email bhejo
// Verify OTP → Check OTP validity → Mark user verified


