import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import LazyLoader from "../Components/LazyLoader/LazyLoader";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
     <LazyLoader></LazyLoader>
    );
  }

  if (user) {
    return children;
  }
  return (
    <div>
      <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
    </div>
  );
};

export default PrivateRouter;
