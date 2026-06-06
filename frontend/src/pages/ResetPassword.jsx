import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [newconfirmpassword, setNewConfirmPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [isEmailSent,setIsEmailSent] = useState(false);
  const [isOTPSubmitted,setIsOTPSubmitted] = useState(false)
  const { inputClass,backendURL} = useContext(AuthContext);
  const navigate = useNavigate();


    axios.defaults.withCredentials = true;

    const handleSubmitEmail = async(e)=>{
        e.preventDefault()
        try{
            const {data} = await axios.post(`${backendURL}/api/auth/send-reset-otp`,{email})
            data.success?toast.success(data.message):toast.error(data.message)
            data.success && setIsEmailSent(true);
        }catch(e){
            toast.error(e.message)
        }
    }

    const handleSubmitOTP = async(e)=>{
        e.preventDefault()
        setIsOTPSubmitted(true)
    }

     const handleChangePassword = async(e)=>{
        e.preventDefault()
        if(newpassword !== newconfirmpassword){
            toast.error("Password and Confirm Password dont match")
            return
        }
        try{
            const {data} = await axios.post(`${backendURL}/api/auth/reset-password`,{email,otp,newPassword:newpassword})
            data.success?toast.success(data.message):toast.error(data.message)
            data.success && navigate("/login")
        }catch(e){
            toast.error(e.message)
        }
    }
    

  return (
    <>
      {!isEmailSent && !isOTPSubmitted && (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <img
              src="https://cdn.dribbble.com/userupload/42179759/file/original-8939a7332eb5bdc39b71ea43d0b14965.jpg?resize=800x600&vertical=center"
              alt="Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Reset Password
          </h2>

          <p className="text-center text-gray-500 mb-2">
            Please enter your email
          </p>

          <p className="text-center text-sm text-gray-400 mb-8">
            You will recieve an OTP in your MailBox
          </p>
          <form className="space-y-5" onSubmit={handleSubmitEmail}>
            <div>
              <label className="block mb-2 text-gray-700">Email ID</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email ID"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={email.length === 0}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get OTP
            </button>

            <div className="text-center">
              <button
                type="button"
                className="text-blue-600 hover:underline text-sm"
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      </div>
      )}

      {isEmailSent && !isOTPSubmitted && (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="https://cdn.dribbble.com/userupload/42179759/file/original-8939a7332eb5bdc39b71ea43d0b14965.jpg?resize=800x600&vertical=center"
              alt="Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Verify Your Email
          </h2>

          <p className="text-center text-gray-500 mb-2">
            We've sent a verification code to your email address.
          </p>

          <p className="text-center text-sm text-gray-400 mb-8">
            Enter the 6-digit OTP below to verify your account.
          </p>

          <form  className="space-y-5" onSubmit={handleSubmitOTP}>
            <div>
              <label className="block mb-2 text-gray-700">
                Verification Code
              </label>

              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOTP(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter OTP"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-2xl tracking-[0.5em] outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              disabled={otp.length !== 6}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify OTP
            </button>

            <div className="text-center">
              <button
                type="button"
                className="text-blue-600 hover:underline text-sm"
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      </div>
      )}

      {isEmailSent && isOTPSubmitted && (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <img
              src="https://cdn.dribbble.com/userupload/42179759/file/original-8939a7332eb5bdc39b71ea43d0b14965.jpg?resize=800x600&vertical=center"
              alt="Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Change Password
          </h2>

          <p className="text-center text-gray-500 mb-2">
            Please enter your new password
          </p>

          <p className="text-center text-sm text-gray-400 mb-8">
            After changing the password you can login with new password
          </p>
          <form className="space-y-5" onSubmit={handleChangePassword}>
            <div>
              <label className="block mb-2 text-gray-700">New Password</label>

              <input
                type="password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className={inputClass}
              />
            </div>

             <div>
              <label className="block mb-2 text-gray-700">Confirm New Password</label>

              <input
                type="password"
                value={newconfirmpassword}
                onChange={(e) => setNewConfirmPassword(e.target.value)}
                placeholder="New Confirm Password"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={newpassword !== newconfirmpassword}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>

            <div className="text-center">
              <button
                type="button"
                className="text-blue-600 hover:underline text-sm"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
      )}


    </>
  );
};

export default ResetPassword;
