import { Company } from "../models/Companies.js";
import { Job } from "../models/Jobs.js";
import User from "../models/Users.js";
import { Application } from "../models/Applications.js";

export const createJob = async (req, res) => {
    try {
        const { title, description, requirements, location, salary, jobType,experience, company, position,applyLink} = req.body;
        const userId = req.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        if (user.role !== 'Recruiter') {
            return res.status(401).json({ success: false, message: "You are not authorized to create jobs" })
        }

        const companyId = company || user.profile?.company;
        if (!title || !description || !requirements?.length || !location || !salary || !jobType || !experience || !companyId || !position) {
            return res.status(400).json({ success: false, message: "Job Details are missing" })
        }
        const normalizedLink = applyLink && typeof applyLink === "string" ? applyLink.trim() : "";
        const companyExists = await Company.findById(companyId);

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
            company: companyId,
            position,
            applyLink: normalizedLink,
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
        if (user.role !== "Recruiter" && user.role !== "Admin") {
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

export const updateJobs = async(req , res)=>{
    try{
        const id = req.params.id;
        const userId = req.userId;
        const {title,
      description,requirements,location,salary,jobType,experience,position,status,applyLink} = req.body;

        const job = await Job.findById(id);
        if(!job){
            return res.status(400).json({success:false , message: "Job Not found"})
        }
        if (job.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this job",
            });
        }

        if (requirements !== undefined) {
            job.requirements = Array.isArray(requirements)?
            requirements: requirements
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean);
        }

        if (title !== undefined) job.title = title;
        if (description !== undefined) job.description = description;
        if (location !== undefined) job.location = location;
        if (salary !== undefined) job.salary = salary;
        if (jobType !== undefined) job.jobType = jobType;
        if (experience !== undefined) job.experience = experience;
        if (position !== undefined) job.position = position;
        if (status !== undefined) job.status = status;
        if (applyLink !== undefined) job.applyLink = applyLink.trim();

        await job.save();

        return res.status(200).json({
         success: true,
         message: "Job updated successfully",
         job,
        });

    }catch(e){
        return res.status(500).json({
        success: false,
        message: e.message,
    });
    }
}

export const applyToJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.userId;

        if (!jobId) {
            return res.status(400).json({ success: false, message: "Job id is required" });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(200).json({
                success: true,
                alreadyApplied: true,
                message: "You have already applied to this job.",
                application: existingApplication
            });
        }

        const application = new Application({
            job: jobId,
            applicant: userId,
            status: "pending"
        });

        await application.save();
        job.application.push(application._id);
        await job.save();

        return res.status(201).json({
            success: true,
            alreadyApplied: false,
            message: "Application submitted successfully.",
            application
        });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

export const getMyApplications = async (req, res) => {
    try {
        const userId = req.userId;
        const applications = await Application.find({ applicant: userId })
            .populate({
                path: "job",
                populate: {
                    path: "company",
                    select: "name logo"
                }
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            applications
        });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

