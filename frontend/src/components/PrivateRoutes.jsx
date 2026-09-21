import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";


export const PrivateRoute = ({ children }) => {
  const { isLoggedIn, userData, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <Loader />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!userData?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};