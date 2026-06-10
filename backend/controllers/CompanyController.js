import { Company } from "../models/Companies.js";
import User from "../models/Users.js";

const registerCompany = async (req, res) => {
    try {
        const userId = req.userId;
        const user = User.findById(userId);
        const { companyName, description, website, location } = req.body;
        if (!companyName) {
            return res.status(400).json({ success: false, message: "companyName is required" })
        }
        if (!description) {
            return res.status(400).json({ success: false, message: "description is required" })
        }
        const exCompany = await Company.findOne({ name: companyName });

        if (exCompany) {
            return res.status(403).json({ success: false, message: "Company already exists" })
        }
        const newCompany = 
        new Company(
            { name: companyName,
                 description,
                 website,
                 location,
                 userId: req.userId });
        await newCompany.save();
        return res.status(201).json({ success: true, message: "Company created successfully" })

    } catch (e) {

    }
}

const getCompanyById = async (req, res) => {
    try {
        const id = req.params.id;
        const company = await Company.findById(id);
        if (!company) {
            return res.status(400).json({ success: false, message: `Company not found with id: ${id}` })
        }
        return res.status(200).json({ company, success: true })

    } catch (e) {

    }
}

const getAllCompanies = async (req, res) => {
    try {
        const {search} = req.query;

        let filter={}

        if(search){
            filter={
                $or:[
                    {name:{$regex: search , $options: "i"}},
                    {location:{$regex: search, $options: "i"}},
                ],
            }
        }


        const companies = await Company.find(filter);
        if (!companies) {
            return res.status(400).json({ success: false, message: "Unable to fetch companies" });
        }
        return res.status(200).json({success:true, message: "fetched all companies successfully", companies })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}

const updateCompanies = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        //cloudinary
        const id = req.params.id;
        const company = await Company.findById(id);

        if (!company) {
            return res.status(400).json({ success: false, message: "Company not found" })
        }

        if (name) {
            company.name = name
        }
        if (description) {
            company.description = description
        }
        if (website) {
            company.website = website
        }
        if (location) {
            company.location = location
        }

        await company.save()
        return res.status(200).json({ success: true, message: "Company updated successfully" })

    } catch (e) {
        return res.status(400).json({ success: false, message: e.message })
    }
}

const getAllCompaniesByUser = async (req, res) => {
    try {
        const userId = req.userId
        const companies = await Company.find({ userId })
        if (!companies) {
            return res.status(404).json({ success: false, message: "Companies not found" })
        }
        return res.status(200).json({ success: true, companies, message: "Companies fetched successfully" });

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "Unable to fetch: Companies created by user"
        })
    }

}





export { registerCompany, getAllCompanies, getCompanyById, getAllCompaniesByUser, updateCompanies };