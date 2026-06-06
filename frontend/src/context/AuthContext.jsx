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
  const [userData, setUserData] = useState([]);

  const inputClass =
  "w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black transition-all placeholder:text-gray-400";

  const getUserData = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/user/data`);
      if(response.data.success) {
        setUserData(response.data.userData);
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
      getUserData();
    } catch (e) {
      console.log(e.message)
      setIsLoggedIn(false);
      // Only show error toast if it's not the initial auth check
      // (avoid spamming toast on page load when user isn't logged in)
    }
  };

    useEffect(() => {
      getAuthState();
    } , []);

  const value = {
    backendURL,
    isLoggedIn,setIsLoggedIn,
    userData,setUserData,
    getUserData,inputClass
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
