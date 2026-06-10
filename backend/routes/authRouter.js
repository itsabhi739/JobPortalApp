import express from 'express'
import { register,login, logout, verifyEmail, verifyEmailOTP,ResetPassword,SendResetPasswordOTP } from '../controllers/AuthController.js'
import { userAuth, authWithoutVerification } from '../middlewares/userAuth.js';

const authRouter = express.Router();


authRouter.post('/register',register)
// http://localhost:5001/api/auth/register

authRouter.post('/login',login)
// http://localhost:5001/api/auth/login

authRouter.post('/logout',userAuth(),logout)
// http://localhost:5001/api/auth/logout

authRouter.post('/send-verify-otp',authWithoutVerification,verifyEmailOTP)
//http://localhost:5001/api/auth/send-verify-otp

authRouter.post('/verify-account',authWithoutVerification,verifyEmail)
//http://localhost:5001/api/auth/verify-account

// Password reset routes - PUBLIC (user not logged in yet)
authRouter.post('/send-reset-otp',authWithoutVerification,SendResetPasswordOTP)
// http://localhost:5001/api/auth/send-reset-otp

authRouter.post('/reset-password',authWithoutVerification,ResetPassword)
// http://localhost:5001/api/auth/reset-password
export default authRouter;