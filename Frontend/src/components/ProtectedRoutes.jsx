import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoutes({ allowedRoles }) {
  const { user, isAuthenticated, authLoading } = useSelector(state => state.auth);

  // ✅ Show spinner while auth state is loading
  if (authLoading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500"></div>
    </div>
  );

  // ❌ Not authenticated → redirect to login
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  // ❌ Role not allowed → redirect to login
  if (!allowedRoles.includes(user.role)) return <Navigate to="/login" replace />;

  // ✅ All good → render child routes
  return <Outlet />;
}

export default ProtectedRoutes;
