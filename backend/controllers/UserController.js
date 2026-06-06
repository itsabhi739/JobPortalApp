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
         return res.status(400).json({ success: false, message: e.message})
    }
}

export const isAuth = async(req,res)=>{
    try{
        return res.status(200).json({success:true,message:"User is authenticated"})
    }catch(e){
        return res.status(500).json({success:false,message:e.message})
    }
}