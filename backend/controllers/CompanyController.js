import { Company } from "../models/Companies.js";
import User from "../models/Users.js";

const registerCompany = async (req, res) => {
    try {
        const { companyName, description, website, location,logo } = req.body;
        const normalizedName = companyName.trim();
        const normalizedLocation = location?.trim() || undefined;
        const exCompany = await Company.findOne({
            name: normalizedName,
            location: normalizedLocation,
        }).collation({ locale: "en", strength: 2 });

        if (exCompany) {
            return res.status(409).json({ success: false, message: "Company already exists" })
        }
        const newCompany = 
        new Company(
            { name: normalizedName,
            description,
            logo,
            website: website || undefined,
                location: normalizedLocation,
        });
        await newCompany.save();
        return res.status(201).json({ success: true, message: "Company created successfully",
            companyId: newCompany._id});

    } catch (e) {
        if (e.code === 11000) {
            return res.status(409).json({ success: false, message: "Company already exists" });
        }
        console.error("Register company error:", e);
        return res.status(500).json({ success: false, message: "Unable to register company" });
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
        console.error("Get company error:", e);
        const status = e.name === "CastError" ? 400 : 500;
        return res.status(status).json({
            success: false,
            message: status === 400 ? "Invalid company id" : "Unable to fetch company",
        });
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
        const companiesWithCounts = await Promise.all(
            companies.map(async (company) => {
                const userCount = await User.countDocuments({ "profile.company": company._id });
                return {
                    ...company.toObject(),
                    userCount
                };
            })
        );
        return res.status(200).json({success:true, message: "fetched all companies successfully", companies : companiesWithCounts})
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}

const updateCompanies = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const id = req.params.id;
        const company = await Company.findById(id);

        if (!company) {
            return res.status(400).json({ success: false, message: "Company not found" })
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (user.role !== "Admin" && user.profile?.company?.toString() !== company._id.toString()) {
            return res.status(403).json({ success: false, message: "You are not authorized" });
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
        if (e.code === 11000) {
            return res.status(409).json({ success: false, message: "Company already exists" });
        }
        console.error("Update company error:", e);
        const status = e.name === "CastError" ? 400 : 500;
        return res.status(status).json({
            success: false,
            message: status === 400 ? "Invalid company id" : "Unable to update company",
        });
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