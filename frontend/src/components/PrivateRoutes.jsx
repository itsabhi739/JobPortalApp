import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import Seo from "./Seo";


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

  // Every private page is kept out of search results.
  return (
    <>
      <Seo title="My Account" noindex />
      {children}
    </>
  );
};