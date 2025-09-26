import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import getCookie from "../../../Backend/src/utils/GetToken.js";

function ProtectedRoutes({ allowedRoles }) {


  const token = getCookie("accessToken");


  if (!token) {
    return <Navigate to="/login" />;
  }




  try {
    const decoded = jwtDecode(token);
    
    
   const  role = decoded.role

   if(!allowedRoles.includes(role)){
    return <Navigate to={"/login"}/>
  }


  return <Outlet/>
  


  } catch (err) {
    console.log(err)
    return <Navigate to="/login" />;

  }


  

 

}

export default ProtectedRoutes;
