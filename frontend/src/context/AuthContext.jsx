import { useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Enable credentials for all axios requests globally
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
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
        setUserData(response.data.userData);
        if(userData.role === "Student"){
          setIsStudent(true);
        }
        return response.data.userData;
      } else {
        toast.error(response.data.message);
        return null;
      }
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
      return null;
    }
  };

  const getAuthState = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/user/is-auth`); 
      setIsLoggedIn(true);
      await getUserData();
    } catch (e) {
      console.log(e.message)
      setIsLoggedIn(false);
      // Only show error toast if it's not the initial auth check
      // (avoid spamming toast on page load when user isn't logged in)
    }finally{
       setAuthLoading(false);
    }
  };

    useEffect(() => {
      getAuthState();
    } , []);

    const logout = async(req,res)=>{
      try{
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(`${backendURL}/api/auth/logout`);
        data.success && setIsLoggedIn(false);
        data.success && setUserData(false);
        navigate('/login')
      }catch(e){
        toast.error(e.message)
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
