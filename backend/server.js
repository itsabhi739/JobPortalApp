import express from "express";
import cors from "cors";
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import companyRouter from "./routes/companyRouter.js";
import jobRouter from "./routes/jobRouter.js";


const PORT = process.env.PORT||5001;

const app = express();

//middlewares
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173",credentials:true}))
app.use(cookieParser())

//checking response
app.get('/',(req,res)=>res.send("API Working"))
//API Endpoints
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/company',companyRouter)
app.use('/api/job',jobRouter)
//creating the connection
const mongodbConnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_CONN}/job-portal-app`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:");
    console.error(error);
  }
};

//calling DB 
mongodbConnection();

//listening to PORT : 5001
app.listen(PORT,()=>{
    console.log(`App is listening to ${PORT}`)
})
