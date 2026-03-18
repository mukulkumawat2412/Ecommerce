import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function OpenRoutes() {
  const { isAuthenticated, authLoading } = useSelector((state) => state.auth);

  // ✅ Jab auth load ho raha ho tab kuch mat dikhao ya spinner dikhao
  if (authLoading) 
    
    return (
    <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full w-16 h-16 border-b-2 border-green-500">
        </div>
    </div>

    )
  

  // ✅ Agar already login hai → home bhej do
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // ✅ Nahi login hai → public routes dikhao
  return <Outlet />;
}

export default OpenRoutes;
