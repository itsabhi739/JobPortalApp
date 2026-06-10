import jwt from 'jsonwebtoken'
import 'dotenv/config.js'
import User from '../models/Users.js'

export const userAuth = (requiredRoles = null) => async (req,res,next) =>{
    const {token} = req.cookies;
    
    if(!token){
        return res.status(401).json({success:false,message:"Not Authorized: Please login again"})
    }
    try{
        let decodedToken = jwt.verify(token,process.env.SECRET_KEY);
        if(decodedToken.id){
            const user = await User.findById(decodedToken.id);
            if(!user){
                return res.status(401).json({
                    success:false,
                    message:"User Not found"
                })
            }

            if(!user.isVerified){
                return res.status(403).json({
                    success:false,
                    message:"Please verify your email"
                })
            }

            req.userId = decodedToken.id

            if(requiredRoles && !requiredRoles.includes(user.role)){
                return res.status(403).json({success:false,message:`access denied for user ${user.username}`})
            }
            next();
        }else{
            return res.status(400).json({
                success:false,
                message:"Not Authorized: Login Again"
            })
        }
    }catch(e){
        res.status(401).json({success:false,message:"failed to Authorized User"})
    }

}

// Middleware for authentication without checking email verification
// Used for endpoints that unverified users need to access (verify-account, send-verify-otp, etc.)
export const authWithoutVerification = async (req,res,next) =>{
    const {token} = req.cookies;
    
    if(!token){
        return res.status(401).json({success:false,message:"Not Authorized: Please login again"})
    }
    try{
        let decodedToken = jwt.verify(token,process.env.SECRET_KEY);
        if(decodedToken.id){
            const user = await User.findById(decodedToken.id);
            if(!user){
                return res.status(401).json({
                    success:false,
                    message:"User Not found"
                })
            }

            // Don't check isVerified here - allow unverified users
            req.userId = decodedToken.id
            next();
        }else{
            return res.status(400).json({
                success:false,
                message:"Not Authorized: Login Again"
            })
        }
    }catch(e){
        res.status(401).json({success:false,message:"failed to Authorized User"})
    }

}