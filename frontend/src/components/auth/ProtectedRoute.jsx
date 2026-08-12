import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import { AuthContext} from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;