import { useContext } from "react";
import { useState } from "react";
import {toast} from 'react-toastify'
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
const Auth = () => {

  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [phonenumber, setPhoneNumber] = useState('')
  const [role, setRole] = useState('Student')
  const [companyName, setCompanyName] = useState('')
  const [designation, setDesignation] = useState('')
  const [location, setLocation] = useState('')

  const {backendURL,setIsLoggedIn,getUserData} = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const authInputClass = isDarkMode
    ? "w-full border border-[#273449] bg-[#111827] text-white rounded-xl px-4 py-3 outline-none shadow-sm transition-all placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-500/20"
    : "w-full border border-gray-300 bg-white text-slate-800 rounded-xl px-4 py-3 outline-none shadow-sm transition-all placeholder:text-gray-400 focus:border-[#6055FF] focus:ring-4 focus:ring-blue-500/20";
  const handleChange = (e)=>{

    const {name,value} = e.target;

    if(name === 'username'){
      setUsername(value)
    }
    if(name === 'email'){
      setEmail(value)
    }
    if(name === 'password'){
      setPassword(value)
    }
    if(name === 'confirmpassword'){
      setConfirmPassword(value);
    }
    if(name === 'phonenumber'){
      setPhoneNumber(value)
    }
    if(name === 'role'){
      setRole(value)
    }
    if(name === 'companyName'){
      setCompanyName(value)
    }
    if(name === 'designation') setDesignation(value)
    if(name === 'location') setLocation(value)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(isSignup){
      if(password !== confirmPassword){
        toast.error("Password and Confirm Password must be the same")
        return
      }
      if (role === 'Recruiter' && (!companyName || !designation || !location)) {
        toast.error("Please fill full name, phone, designation, company, and location")
        return
      }

       const payload = { username, email, password, phonenumber, role }
        if (role === 'Recruiter') {
          payload.companyName = companyName
          payload.designation = designation
          payload.location = location
        }

      try{
        const response = await axios.post(`${backendURL}/api/auth/register`,payload)
        if(response.data.success){
          toast.success(response.data.message);
          navigate('/verify-email')
        } 
        else if (response.data.requiresCompanyProfile || response.data.message?.includes('company profile')) {
          navigate('/register-company', {
            replace: true,
            state: {
              companyName: companyName.trim(),
              recruiterPayload: payload
            }
          });
          toast.info(response.data.message)
        }else{
          toast.error(response.data.message)
        }
      }catch(e){
        const errorMessage = e.response?.data?.message || e.message || "Registration failed";
        if (e.response?.data?.requiresCompanyProfile || errorMessage.includes('company profile')) {
          navigate('/register-company', {
            replace: true,
            state: {
              companyName: companyName.trim(),
              recruiterPayload: payload
            }
          });
          toast.info(errorMessage)
        } else {
          toast.error(errorMessage);
        }
      }
    }else{
      try {
        const response = await axios.post(`${backendURL}/api/auth/login`,{email,password})
        if(response.data.success){
          toast.success(response.data.message);
          setIsLoggedIn(true);
          await getUserData();
          navigate('/')
        }else{
          toast.error(response.data.message)
        }
      } catch (e) {
        const errorMessage = e.response?.data?.message || e.message || "Login failed";
        toast.error(errorMessage);
      }
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 ${isDarkMode ? "bg-[#0B1120]" : "bg-slate-50"}`}>
      <div className={`relative w-full rounded-2xl shadow-[0_18px_50px_rgba(47,54,140,0.15)] p-8 ${isSignup ? 'max-w-2xl' : 'max-w-md'} ${isDarkMode ? "border border-[#273449] bg-[#151E2E]" : "border border-gray-200 bg-white"}`}>
        <button
          type="button"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleTheme}
          className={`absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border transition ${isDarkMode ? "border-[#273449] text-yellow-400 hover:bg-[#1C273A]" : "border-gray-300 text-slate-700 hover:bg-gray-100"}`}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="mb-4 text-center">
          <Link to="/" className="inline-flex items-center gap-3 justify-center">
            <img
              src="/favicon.svg"
              alt="AbhiJob logo"
              className="h-11 w-11 rounded-xl object-cover shadow-sm"
            />
            <span className="text-2xl font-black tracking-tight">
              <span className="text-blue-700">Abhi</span>
              <span className="text-yellow-500">Job</span>
            </span>
          </Link>
        </div>

        <h2 className={`text-2xl font-bold text-center mb-1 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
          {isSignup ? "Create Account" : "Login"}
        </h2>

        <p className={`text-center mb-5 ${isDarkMode ? "text-slate-300" : "text-gray-500"}`}>
          {isSignup
            ? "Join us and start your journey."
            : "Welcome back! Please login to continue."}
        </p>

        <form onSubmit={handleSubmit}>
          <div className={`${isSignup ? 'grid grid-cols-2 gap-3' : 'space-y-3'}`}>

          {/* Username only for Signup */}
          {isSignup && (
            <div>
              <label className={`block mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                Username
              </label>

              <input
                type="text"
                name = 'username'
                placeholder="Enter username"
                className={authInputClass}
                value={username}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className={`block mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={authInputClass}
            />
          </div>

          {/* Password */}
          <div>
            <label className={`block mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter password"
              className={authInputClass}
            />
          </div>

          {/* Confirm Password only for Signup */}
          {isSignup && (
            <div>
              <label className={`block mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmpassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className={authInputClass}
              />
            </div>
          )}

          {/* Phone Number only for Signup */}
          {isSignup && (
            <div>
              <label className={`block mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                Phone Number
              </label>

              <input
                type="text"
                name="phonenumber"
                value={phonenumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={authInputClass}
              />
            </div>
          )}

          {/* Role Selection only for Signup */}
          {isSignup && (
            <div className="col-span-2">
              <label className={`block mb-2 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                Select Role
              </label>

              <div className="flex gap-6">
                <label className={`flex items-center gap-2 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                  <input
                    type="radio"
                    name="role"
                    value="Student"
                    checked={role === "Student"}
                    onChange={handleChange}
                  />
                  Student
                </label>

                <label className={`flex items-center gap-2 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                  <input
                    type="radio"
                    name="role"
                    value="Recruiter"
                    checked={role === "Recruiter"}
                    onChange={handleChange}
                  />
                  Recruiter
                </label>
              </div>
            </div>
          )}

          {isSignup && role === 'Recruiter' && (
            <>
            <div>
              <label className={`block mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                Company Name
              </label>

              <input
                type="text"
                name="companyName"
                value={companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                className={authInputClass}
              />
            </div>
            <div>
              <label className={`block mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>Designation</label>
              <input type="text" name="designation" value={designation} onChange={handleChange} placeholder="e.g. HR Manager" className={authInputClass} required />
            </div>
            <div>
              <label className={`block mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>Location</label>
              <input type="text" name="location" value={location} onChange={handleChange} placeholder="Enter your location" className={authInputClass} required />
            </div>
            </>
          )}

          {/* Forgot Password only for Login */}
   {!isSignup && (
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
                onClick={()=>navigate('/reset-password')}
              >
                Forgot Password?
              </button>
            </div>
          )}
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#6055FF] to-[#4F5AD8] text-white py-2.5 rounded-xl hover:brightness-110 transition-all mt-4 shadow-[0_12px_25px_rgba(47,54,140,0.2)]"
          >
            {isSignup ? "Create Account" : "Login"}
          </button>

          <p className={`text-center mt-3 ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="ml-2 text-blue-600 hover:underline"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Auth;