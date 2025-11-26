import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import getCookie from "../../../Backend/src/utils/GetToken.js";
import { useSelector } from "react-redux";


function ProtectedRoutes({ allowedRoles }) {


  const Accesstoken = getCookie("accessToken");
  console.log(Accesstoken)

  const token = useSelector((state)=>state.auth.accessToken)
  const user = useSelector((state)=>state.auth.user)

  const role = user?.role

  if (!token) {
    return <Navigate to="/login" />;
  }




  try {
   
  
    
    
 

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
