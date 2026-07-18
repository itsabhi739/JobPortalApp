import { useContext } from "react";
import { useState } from "react";
import {toast} from 'react-toastify'
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

  const {backendURL,setIsLoggedIn,getUserData,inputClass} = useContext(AuthContext);
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
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(isSignup){
      if(password !== confirmPassword){
        toast.error("Password and Confirm Password must be the same")
        return
      }
      if (role === 'Recruiter' && !companyName) {
        toast.error("Please enter your company name")
        return
      }

       const payload = { username, email, password, phonenumber, role }
        if (role === 'Recruiter') {
          payload.companyName = companyName
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className={`w-full bg-white rounded-2xl shadow-lg p-8 ${isSignup ? 'max-w-2xl' : 'max-w-md'}`}>

        <h2 className="text-3xl font-bold text-center mb-2">
          {isSignup ? "Create Account" : "Login"}
        </h2>

        <p className="text-center text-gray-500 mb-8">
          {isSignup
            ? "Join us and start your journey."
            : "Welcome back! Please login to continue."}
        </p>

        <form onSubmit={handleSubmit}>
          <div className={`${isSignup ? 'grid grid-cols-2 gap-4' : 'space-y-5'}`}>

          {/* Username only for Signup */}
          {isSignup && (
            <div>
              <label className="block mb-2 text-gray-700">
                Username
              </label>

              <input
                type="text"
                name = 'username'
                placeholder="Enter username"
                className={inputClass}
                value={username}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block mb-2 text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter password"
              className={inputClass}
            />
          </div>

          {/* Confirm Password only for Signup */}
          {isSignup && (
            <div>
              <label className="block mb-2 text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmpassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className={inputClass}
              />
            </div>
          )}

          {/* Phone Number only for Signup */}
          {isSignup && (
            <div>
              <label className="block mb-2 text-gray-700">
                Phone Number
              </label>

              <input
                type="text"
                name="phonenumber"
                value={phonenumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={inputClass}
              />
            </div>
          )}

          {/* Role Selection only for Signup */}
          {isSignup && (
            <div className="col-span-2">
              <label className="block mb-3 text-gray-700">
                Select Role
              </label>

              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="Student"
                    checked={role === "Student"}
                    onChange={handleChange}
                  />
                  Student
                </label>

                <label className="flex items-center gap-2">
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
            <div>
              <label className="block mb-2 text-gray-700">
                Company Name
              </label>

              <input
                type="text"
                name="companyName"
                value={companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                className={inputClass}
              />
            </div>
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
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all mt-6"
          >
            {isSignup ? "Create Account" : "Login"}
          </button>

          <p className="text-center text-gray-600 mt-4">
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