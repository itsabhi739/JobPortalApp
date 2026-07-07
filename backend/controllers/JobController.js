import { Company } from "../models/Companies.js";
import { Job } from "../models/Jobs.js";
import User from "../models/Users.js";

export const createJob = async (req, res) => {
    try {
        const { title, description, requirements, location, salary, jobType,experience, company, position } = req.body;
        if (!title || !description || !requirements?.length || !location || !salary || !jobType || !experience|| !company || !position) {
            return res.status(400).json({ success: false, message: "Job Details are missing" })
        }
        const userId = req.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        if (user.role !== 'Recruiter') {
            return res.status(401).json({ success: false, message: "You are not authorized to create jobs" })
        }

        const companyExists = await Company.findById(company);

        if (!companyExists) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        const requirementsArray = requirements.split(',').map((skill) => skill.trim()).filter((skill) => skill);

        const job = new Job({
            title,
            description,
            requirements: requirementsArray,
            location,
            salary,
            jobType,
            experience,
            company,
            position,
            createdBy: userId
        })

        await job.save()
        return res.status(201).json({ success: true, message: "Job created successfully" });

    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}

export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found: deleteJob" })
        }
        if (user.role !== "Recruiter" || user.role !== "Admin") {
            return res.status(400).json({ success: false, message: "User dont have req permission to delete the job" })
        }

        const job = await Job.findByIdAndDelete(jobId);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }
        res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
}

export const getJobs = async (req, res) => {
    try {
        const { keyword, location } = req.query;

        const filter = {};
        if (keyword) {
            filter.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { requirements: { $elemMatch: { $regex: keyword, $options: "i" } } },
            ]
        }

        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }

        const jobs = await Job.find(filter)
            .populate("company", "name logo")
            .sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({ success: false, message: "Jobs not found" });
        }


        return res.status(200).json({
            success: true, message: "Jobs fetched successfully",
            jobs,
            count: jobs.length
        })

    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}


export const getJobById = async (req, res) => {
    try {
        const id = req.params.id;
        const job = await Job.findById(id);
        if (!job) {
            return res.status(400).json({ success: false, message: "Job not found" })
        }
        return res.status(200).json({ success: true, job });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}

