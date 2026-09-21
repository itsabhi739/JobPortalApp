import express from 'express'
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { userAuth } from '../middlewares/userAuth.js';
import { GetUserData, getProfile, isAuth, updateProfile } from '../controllers/UserController.js';
const userRouter = express.Router();

const uploadDirectory = path.resolve('uploads');
fs.mkdirSync(uploadDirectory, { recursive: true });
const upload = multer({
	storage: multer.diskStorage({
		destination: uploadDirectory,
		filename: (_req, file, callback) => {
			const extension = path.extname(file.originalname).toLowerCase();
			callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
		}
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (_req, file, callback) => {
		const allowed = file.fieldname === 'resume'
			? ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
			: ['image/jpeg', 'image/png', 'image/webp'];
		callback(null, allowed.includes(file.mimetype));
	}
});

//get all user data
userRouter.get('/data',userAuth(),GetUserData)
userRouter.get('/profile', userAuth(), getProfile)

userRouter.get('/is-auth',userAuth(), isAuth) //http://localhost:5001/api/user/is-auth

userRouter.post('/profile/update', userAuth(), upload.fields([
	{ name: 'resume', maxCount: 1 },
	{ name: 'profilePhoto', maxCount: 1 }
]), updateProfile)



export default userRouter