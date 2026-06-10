import express from 'express'
import { userAuth } from '../middlewares/userAuth.js';
import { GetUserData, isAuth, updateProfile } from '../controllers/UserController.js';
const userRouter = express.Router();

//get all user data
userRouter.get('/data',userAuth(),GetUserData)

userRouter.get('/is-auth',userAuth(), isAuth) //http://localhost:5001/api/user/is-auth

userRouter.post('/profile/update',userAuth(), updateProfile) //http://localhost:5001/api/user//update-profile



export default userRouter