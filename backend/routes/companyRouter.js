import express from 'express'
import { getAllCompanies, getAllCompaniesByUser, getCompanyById, registerCompany, updateCompanies } from '../controllers/CompanyController.js';
import { userAuth } from '../middlewares/userAuth.js';

const companyRouter = new express.Router();

companyRouter.post('/register',userAuth(['Admin','Recruiter']),registerCompany) //http://localhost:5001/api/company/register

companyRouter.get('/get/:id',userAuth(),getCompanyById ) //http://localhost:5001/api/company/get/{id}

companyRouter.get('/companies',userAuth(['Admin','Recruiter']),getAllCompaniesByUser) //http://localhost:5001/api/company/companies

companyRouter.get('/companies/all',getAllCompanies) //http://localhost:5001/api/company/companies/all

companyRouter.patch('/update/:id',userAuth(['Admin','Recruiter']),updateCompanies) //http://localhost:5001/api/company/update/{id}








export default companyRouter;