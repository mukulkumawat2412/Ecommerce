
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken"


const verifyToken = asyncHandler(async(req,_,next)=>{

 try {
    const token =    req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
 
    if(!token){
       throw new ApiError(400,"AccessToken missing")
    }
   
   const decoded =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
   
   

   const user = await User.findById(decoded._id).select("-password -refreshToken")
   
   if(!user){
       throw new ApiError(400,"Invalid accessToken token")
   }
   
   req.user = user
   console.log(req.user)
  
   next()
   
 } catch (error) {
     throw new ApiError(401,error?.message || "Invalid access Token")
 }

})


export default verifyToken