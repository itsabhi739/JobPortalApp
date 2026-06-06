import express from 'express'
import { register,login, logout, verifyEmail, verifyEmailOTP,ResetPassword,SendResetPasswordOTP } from '../controllers/AuthController.js'
import { userAuth } from '../middlewares/userAuth.js';

const authRouter = express.Router();


authRouter.post('/register',register)
// http://localhost:5001/api/auth/register

authRouter.post('/login',login)
// http://localhost:5001/api/auth/login

authRouter.post('/logout',userAuth,logout)
// http://localhost:5001/api/auth/logout

authRouter.post('/send-verify-otp',userAuth,verifyEmailOTP)
//http://localhost:5001/api/auth/send-verify-otp

authRouter.post('/verify-account',userAuth,verifyEmail)
//http://localhost:5001/api/auth/verify-account

// Password reset routes - PUBLIC (user not logged in yet)
authRouter.post('/send-reset-otp',SendResetPasswordOTP)
// http://localhost:5001/api/auth/send-reset-otp

authRouter.post('/reset-password',ResetPassword)
// http://localhost:5001/api/auth/reset-password
export default authRouter;