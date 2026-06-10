import User from "../models/Users.js"

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
        return res.status(200).json({
            success: true,
            userData: {
                username: user.username,
                isVerified: user.isVerified
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
        const { username, email, phonenumber, bio, skills } = req.body;
        const file = req.files;

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(',');
        }
        const userId = req.userId; //from middleware authentication
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "user not found" })
        }

        if(username){
            user.username = username
        }
        if(email){
            user.email = email
        }
        if(phonenumber){
            user.phonenumber = phonenumber
        }
        if(bio){
            user.profile.bio = bio
        }
        if(skills){
            user.profile.skills = skills
        }
        //resume add hoga
        await user.save();
        const updatedUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            phonenumber: user.phonenumber,
            bio: user.profile.bio,
            skills: user.profile.skills
        }
        return res.status(200).json({
            success: true,
            updatedUser,
            message: "Profile updated successfully"
        })
    } catch (error) {
        console.log(error.message)
    }
}



