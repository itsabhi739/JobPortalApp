import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Menu, Moon, Sun, X } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
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

    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const profilePhoto = userData?.profile?.profilePhoto;
    const profilePhotoUrl = profilePhoto?.startsWith("http") ? profilePhoto : profilePhoto ? `${backendURL}${profilePhoto}` : "";

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
      setMobileMenuOpen(false);
    }

    const navigateFromMenu = (path) => {
      navigate(path);
      setMobileMenuOpen(false);
    };


  return (
    <div className="relative flex flex-wrap justify-between items-center min-h-20 px-4 sm:px-10 border-b border-gray-200 bg-white">
      <Link to="/" className="flex items-center gap-3 shrink-0">
        <img
          src="/favicon.svg"
          alt="AbhiJob logo"
          className="h-11 w-11 rounded-xl object-cover shadow-sm"
        />
        <span className="hidden sm:inline text-xl font-black tracking-tight">
          <span className="text-blue-700">Abhi</span>
          <span className="text-yellow-500">Job</span>
        </span>
      </Link>

      <div className="menu hidden lg:flex flex-1 items-center justify-center gap-6 text-gray-700 text-lg font-medium">
        <button className="home" onClick={()=>navigate('/')}>Home</button>
        <button className="jobs" onClick={()=>navigate('/jobs')}>Jobs</button>
        <button className="companies" onClick={()=>navigate('/companies')}>Companies</button>
        {isLoggedIn?(
        <button className="dashboard" onClick={handleDashboard}>Dashboard</button>
        ):null}
        <button className="contactus" onClick={()=>navigate('/contact-us')}>Contact Us</button>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleTheme}
          className="theme-toggle flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-100"
        >
          {isDarkMode ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {userData ? (
        <div className="relative group w-10 h-10 rounded-full bg-black text-white text-xl flex items-center justify-center font-semibold cursor-pointer overflow-visible" onClick={() => setProfileMenuOpen((open) => !open)}>
          {profilePhotoUrl ? <img src={profilePhotoUrl} alt="Profile" className="w-full h-full rounded-full object-cover" /> : userData?.username?.[0].toUpperCase()}
          <div
            className={`${profileMenuOpen ? "block" : "hidden group-hover:block"} absolute top-0 right-0 z-10 text-black rounded pt-10`}
          >
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isVerified && (<li className="py-2 px-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap" onClick={sendVerificationOTP}>
                Verify email
              </li>)}
              <li className="py-2 px-2 hover:bg-gray-200 cursor-pointer pr-10 whitespace-nowrap" onClick={()=>navigate("/profile")}>
                Profile
              </li>
              <li className="py-2 px-2 hover:bg-gray-200 cursor-pointer pr-10 whitespace-nowrap" onClick={logout}>
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

        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-700"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {mobileMenuOpen && <div className="lg:hidden basis-full py-3 border-t border-gray-200 mt-2">
        <nav className="flex flex-col gap-1 text-gray-700 font-medium">
          <button className="text-left px-3 py-3 rounded-lg hover:bg-gray-100" onClick={() => navigateFromMenu('/')}>Home</button>
          <button className="text-left px-3 py-3 rounded-lg hover:bg-gray-100" onClick={() => navigateFromMenu('/jobs')}>Jobs</button>
          <button className="text-left px-3 py-3 rounded-lg hover:bg-gray-100" onClick={() => navigateFromMenu('/companies')}>Companies</button>
          {isLoggedIn && <button className="text-left px-3 py-3 rounded-lg hover:bg-gray-100" onClick={handleDashboard}>Dashboard</button>}
          <button className="text-left px-3 py-3 rounded-lg hover:bg-gray-100" onClick={() => navigateFromMenu('/contact-us')}>Contact Us</button>
        </nav>
      </div>}
    </div>
  );
};

export default Navbar;
