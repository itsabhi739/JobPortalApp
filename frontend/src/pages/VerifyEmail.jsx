import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmailVerify = () => {
  const [otp, setOtp] = useState("");
  const { backendURL, getUserData, isLoggedIn, userData, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    // If user is verified, redirect to home
    if(isLoggedIn && userData && userData.isVerified) {
      toast.info("User verified")
      navigate('/')
    }
  },[isLoggedIn,userData])

  const verifyUserEmail = async (otp) => {
    try {
      const { data } = await axios.post(`${backendURL}/api/auth/verify-account`,{otp});
      if (data.success) {
        toast.success(data.message)
        setIsLoggedIn(true);
        await getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {toast.error(error.response?.data?.message || error.message)}
  };

  const handleResendOTP = async () => {
    try {
      const { data } = await axios.post(`${backendURL}/api/auth/send-verify-otp`);
      if (data.success) {
        toast.success(data.message || "OTP sent to your email");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyUserEmail(otp);
  };

  return (
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-gray-700">
              Verification Code
            </label>

            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
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
              onClick={handleResendOTP}
              className="text-blue-600 hover:underline text-sm"
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;


//for using 6 inputs in OTP so that after adding single digit it will move forward automatically
//   const inputRefs = useRef([])

//   const inputHandler = (e,index)=>{
//     if(e.target.value.length>0 && inputRefs.current.length-1){
//         inputRefs.current[index + 1].focus();
//     }
//   }

//   const handleKeyDown = (e,index)=>{
//     if(e.key === 'Backspace' && e.target.value === '' && index>0){
//         inputRefs.current[index-1].focus();
//     }
//   }

// const handlePaste = (e)=>{
//     const paste = e.clipboardData.getData('text');
//     const pasteArray = paste.split('')
//     pasteArray.forEach((char,index) => {
//         if(inputRef.current[index]){
//             inputRef.current[index] = char
//         }
//     });
// }

/*
        here we will create 6 input fields 
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
        {Array(6).fill(0).map((_, index)=>(
            <input type="text" maxLength='1' key={index} required
            className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
            ref={e => inputRefs.current[index] = e}
            onInput={(e) => handleInput(e, index) }
            onKeyDown = {handleKeyDown(e,index)}
        />
        ))}
        </div> */