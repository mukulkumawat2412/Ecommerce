import mongoose from "mongoose";
import asyncHandler from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const healthCheck = asyncHandler(async(req,res)=>{
try {
      const dbStatus =   await mongoose.connection.db.admin().ping()
    
    return  res.status(200).json(new ApiResponse(200,"Ok",{uptime:process.uptime(),memory:process.memoryUsage(),database:dbStatus? "Connected" : "disconnected",timestamps:new Date().toISOString()}))
} catch (error) {
   return res.status(500).json(new ApiResponse(500,"Error",{message:error?.message,database:"disconnected",timestamps:new Date().toISOString()}))   
}


})


export default healthCheck