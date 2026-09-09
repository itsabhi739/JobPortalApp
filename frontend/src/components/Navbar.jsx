import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendURL, isLoggedIn, setUserData, setIsLoggedIn,logout } =
    useContext(AuthContext);

    const sendVerificationOTP = async (req,res)=>{
      try{
        const {data} = await axios.post(`${backendURL}/api/auth/send-verify-otp`)
        navigate('/verify-email')
        toast.success(data.message)
      }catch(e){
        toast.error(data.message)
      }
    }

    const handleDashboard = () =>{
      if(!userData){
        navigate('/login')
        toast.error("Dashboard is restricted: Login to continue")
        return;
      }
      if(userData.role === 'Admin'){
        navigate('/admin-dashboard');
      }
      else if(userData.role === "Recruiter"){
        navigate('/recruiter-dashboard');
      }
      else if(userData.role === "Student"){
        navigate('/student-dashboard');
      }
      else{
        navigate("/login")
        toast.info("User not logged in cannot access dashboard")
      }
    }


  return (
    <div className="flex justify-between items-center h-20 px-6 sm:px-10 border-b bg-white">
      <img
        src="https://cdn.dribbble.com/userupload/42179759/file/original-8939a7332eb5bdc39b71ea43d0b14965.jpg?resize=800x600&vertical=center"
        alt="Logo"
        className="w-28 sm:w-32 h-19.5"
      />

      <div className="menu flex items-center gap-6 text-gray-700 text-lg font-medium">
        <div className="home" onClick={()=>navigate('/')}>Home</div>
        <div className="jobs" onClick={()=>navigate('/jobs')}>Jobs</div>
        <div className="companies" onClick={()=>navigate('/companies')}>Companies</div>
        {isLoggedIn?(
        <div className="dashboard" onClick={handleDashboard}>Dashboard</div>
        ):null}
        <div className="contactus" onClick={()=>navigate('/contact-us')}>Contact Us</div>
      </div>

      {userData ? (
        <div className="relative group w-10 h-10 rounded-full bg-black text-white text-xl flex items-center justify-center font-semibold cursor-pointer overflow-visible">
          {userData?.username?.[0].toUpperCase()}
          <div
            className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10"
          >
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isVerified && (<li className="py-1 px-2 hover:bg-gray-200 cursor-pointer" onClick={sendVerificationOTP}>
                Verify email
              </li>)}
              <li className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10" onClick={()=>navigate("/user-profile")}>
                Profile
              </li>
              <li className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10" onClick={logout}>
                Logout
              </li>  
            </ul>
          </div>
        </div>
      ) : (
        <button
          className="flex items-center gap-2 border-2 border-primary text-primary rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
