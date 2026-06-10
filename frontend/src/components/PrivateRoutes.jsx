import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


export const PrivateRoute = ({children})=>{
    const {isLoggedIn,userData} = useContext(AuthContext)

    // Logged in but not verified → Redirect to verify
    if(isLoggedIn && !userData?.isVerified){
        return <Navigate to="/verify-email" replace/>
    }

    //loggedin and verfied ==> Allow children
    return children;
};