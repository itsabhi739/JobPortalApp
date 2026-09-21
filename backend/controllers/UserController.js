import User from "../models/Users.js"
import { Company } from "../models/Companies.js"
import { Application } from "../models/Applications.js"

export const GetUserData = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: "Add USer id " })
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found " })
        }

        let companyName = "";
        if (user.profile?.company) {
            const company = await Company.findById(user.profile.company);
            companyName = company?.name || "";
        }

        return res.status(200).json({
            success: true,
            userData: {
                userId: user._id,
                username: user.username,
                email: user.email,
                phonenumber: user.phonenumber,
                role:user.role,
                isVerified: user.isVerified,
                company: user.profile?.company || null,
                companyName,
                profile: user.profile || {}
            }
        })
    } catch (e) {
        return res.status(400).json({ success: false, message: e.message })
    }
}

export const isAuth = async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: "User is authenticated" })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { username, email, phonenumber, bio, skills, education, experience, location, linkedin, portfolio, designation } = req.body;
        const userId = req.userId; //from middleware authentication
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "user not found" })
        }

        const profileFields = { bio, education, experience, location, linkedin, portfolio, designation };
        user.profile = user.profile || {};
        if (username !== undefined) user.username = username.trim();
        if (email !== undefined) user.email = email.trim();
        if (phonenumber !== undefined) user.phonenumber = phonenumber.trim();
        Object.entries(profileFields).forEach(([field, value]) => {
            if (value !== undefined) user.profile[field] = value.trim();
        });
        if (skills !== undefined) {
            user.profile.skills = (Array.isArray(skills) ? skills : skills.split(','))
                .map((skill) => skill.trim()).filter(Boolean);
        }

        if (req.files?.resume?.[0]) {
            user.profile.resume = `/uploads/${req.files.resume[0].filename}`;
            user.profile.resumeOriginalName = req.files.resume[0].originalname;
        }
        if (req.files?.profilePhoto?.[0]) {
            user.profile.profilePhoto = `/uploads/${req.files.profilePhoto[0].filename}`;
        }

        await user.save();
        if (req.files?.resume?.[0]) {
            await Application.updateMany(
                { applicant: user._id },
                { $set: { resume: user.profile.resume, resumeOriginalName: user.profile.resumeOriginalName } },
            );
        }
        const updatedUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            phonenumber: user.phonenumber,
            profile: user.profile
        }
        return res.status(200).json({
            success: true,
            updatedUser,
            message: "Profile updated successfully"
        })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt');
        const applications = await Application.find({ applicant: req.userId })
            .populate({ path: 'job', populate: { path: 'company', select: 'name logo' } })
            .sort({ createdAt: -1 });
        return res.status(200).json({ success: true, user, applications });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



