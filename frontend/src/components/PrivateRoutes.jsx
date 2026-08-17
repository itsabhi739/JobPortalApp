import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


export const PrivateRoute = ({ children }) => {
  const { isLoggedIn, userData, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!userData?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};