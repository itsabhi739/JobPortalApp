import express from 'express'
import { userAuth } from '../middlewares/userAuth.js';
import { createJob, deleteJob, updateJobs, getJobById, getJobs } from '../controllers/JobController.js';

const jobRouter = new express.Router();

jobRouter.get('/jobs/all',getJobs) 
 //http://localhost:5001/api/job/jobs/all

jobRouter.post('/create',userAuth(['Recruiter']),createJob) 
 //http://localhost:5001/api/job/create

jobRouter.get('/get/:id',getJobById) 
 //http://localhost:5001/api/job/get/4dasd435sd4f6

jobRouter.delete('/delete/:id', userAuth(['Recruiter','Admin']),deleteJob) 
//http://localhost:5001/api/job/delete/sd648646464864

jobRouter.patch('/update/:id', userAuth(['Recruiter','Admin']),updateJobs) 
//http://localhost:5001/api/job/update/sd648646464864

export default jobRouter;