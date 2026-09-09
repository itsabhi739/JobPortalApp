import { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

// Enable credentials for all axios requests globally
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isStudent,setIsStudent] = useState(false);

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black transition-all placeholder:text-gray-400";

  const getUserData = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/user/data`);
      if(response.data.success) {
        const user=response.data.userData;
        setUserData(response.data.userData);
        setIsStudent(response.data.userData?.role === "Student");
        return response.data.userData;
      }
      setUserData(null);
      setIsLoggedIn(false);
      setIsStudent(false);
      return null;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      if (!message || /not authorized|not authenticated|login again|failed to authorized/i.test(message)) {
        setUserData(null);
        setIsLoggedIn(false);
        setIsStudent(false);
        return null;
      }
      toast.error(e.response?.data?.message || e.message);
      return null;
    }
  };

  const getAuthState = async () => {
    try {
      await axios.get(`${backendURL}/api/user/is-auth`);
      setIsLoggedIn(true);
      await getUserData();
    } catch (e) {
      setIsLoggedIn(false);
      setUserData(null);
      setIsStudent(false);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    getAuthState();
  } , []);

  const logout = async()=>{
    try{
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(`${backendURL}/api/auth/logout`);
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        setIsStudent(false);
        navigate("/login",{replace:true});
      }
    }catch(e){
      setIsLoggedIn(false);
      setUserData(null);
      setIsStudent(false);
      toast.error(e.response?.data?.message ||e.message|| "Logout failed");
      navigate("/login", { replace: true });
    }
  }

  const value = {
    backendURL,
    isLoggedIn,setIsLoggedIn,
    userData,setUserData,
    getUserData,inputClass,
    authLoading,logout,
    isStudent,setIsStudent
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
