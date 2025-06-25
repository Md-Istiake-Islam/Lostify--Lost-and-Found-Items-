import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";

const PrivateRoutes = ({ children }) => {
   const { user, loading } = useContext(AuthContext);
   const location = useLocation();

   if (loading) {
      return <LoadingSpinner></LoadingSpinner>;
   } else if (user && user.email) {
      return children;
   } else {
      return <Navigate state={location.pathname} to={"../../login"}></Navigate>;
   }
};

export default PrivateRoutes;
