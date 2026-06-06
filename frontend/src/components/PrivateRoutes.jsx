import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


export const PrivateRoute = ({children})=>{
    const {isLoggedIn,userData} = useContext(AuthContext)

    // Not logged in → Redirect to auth
    if(!isLoggedIn){
        return <Navigate to='/login' replace/>
    }

    // Logged in but not verified → Redirect to verify
    if(isLoggedIn && !userData?.isVerified){
        return <Navigate to="/verify-email" replace/>
    }

    //loggedin and verfied ==> Allow children
    return children;
};