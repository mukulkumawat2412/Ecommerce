import asyncHandler from "../utils/AsyncHandler.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessTokenAndRefreshToken } from "../utils/generateAccessAndRefreshToken.js";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()




const Register = asyncHandler(async(req,res)=>{

const {username,email,password,fullName,} =    req.body


if([username,email,password,fullName].some((value)=>value?.trim()==="")){
   throw new ApiError(400,"All field are required")
}

const alreadyExist = await User.findOne({
   $or:[{email,username}]
})


if(alreadyExist){
   throw new ApiError(400,"Username and email already exist")
}


const user = await User.create({
   username:username.toLowerCase(),
   email,
   password,
   fullName
})


const createdUser = await User.findById(user._id).select("-password -refreshToken")

if(!createdUser){
   throw new ApiError(400,"something went wrong registering user")
}


return res.status(201).json(new ApiResponse(200,createdUser,"User Register successfully"))


})










const Login = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email && !username) {
    throw new ApiError(400, "email or username are required");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(400, "user does not exist");
  }

  const isValidPassword = await user.isPasswordCorrect(password);
  if (!isValidPassword) {
    throw new ApiError(400, "Password does not match");
  }

  const { accessToken, refreshToken: newRefreshToken} = await generateAccessTokenAndRefreshToken(user._id);

  const loggedIn = await User.findById(user._id).select("-password -refreshToken");

  // ✅ 1. Access Token Options (30s)
  const accessTokenOptions = {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge:24 * 1000  // 20 seconds
  };

  // ✅ 2. Refresh Token Options (1 day)
  const refreshTokenOptions = {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 day
  };

  // ✅ 3. Send Both Cookies with Correct Expiry
  return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", newRefreshToken, refreshTokenOptions)
    .json(
      new ApiResponse(
        200,
        { loggedIn, accessToken, newRefreshToken },
        "User login successfully"
      )
    );
});



const RefreshAccessToken = asyncHandler(async (req, res) => {
 
  
//   console.log("received token by backend refreshTOken",req.cookies)
  const incomingRefreshToken =  req.cookies?.refreshToken || req.body?.refreshToken;

 
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request - No refresh token found");
  }

  try {
    // 🔹 2. Verify Refresh Token
    const decodedRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    

    const user = await User.findById(decodedRefreshToken._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token: user not found");
    }

    // 🔹 3. Compare with database token (to detect logout or reuse)
    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(400, "Refresh token expired or already used");
    }

    // 🔹 4. New Access & Refresh Tokens
    const { accessToken, refreshToken: newRefreshToken } = await generateAccessTokenAndRefreshToken(user._id);

    // 🔹 5. Cookie options
    const accessTokenOptions = {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // same as login: 1 day 
    };

    const refreshTokenOptions = {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 day
    };

    // 🔹 6. Return New Tokens
    return res 
      .status(200)
      .cookie("accessToken", accessToken, accessTokenOptions)
      .cookie("refreshToken", newRefreshToken, refreshTokenOptions)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});



const Logout = asyncHandler(async(req,res)=>{

   const userId = req.user?._id

   await User.findByIdAndUpdate(userId,{
      $unset:{
         refreshToken:1
      },

      
   },

   {
      new:true
   }


)

const options = {
   httpOnly:true,
   secure:true,
   
}


return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(new ApiResponse(200,{},"Logout successfully"))

})



const Profile = asyncHandler(async(req,res)=>{

   const userId = req.user?._id

const user =   await User.findById(userId).select("-password -refreshToken")

if(!user){
   throw new ApiError(404,"User not found")
}


return res.status(200).json(new ApiResponse(200,user,"User profile successfully fetched"))

})


const UpdateProfile = asyncHandler(async(req,res)=>{
const user =   await User.findById(req.user?._id)

if(!user){
   throw new ApiError(404,"User not found")
}

const {username,fullName,email} = req.body

if([username,fullName,email].some((value)=>value?.trim()==="")){
   throw new ApiError(400,"Some field is required")
   
}





const updatedProfile = await User.findByIdAndUpdate(req.user?._id,{
   username,
   fullName,
   email
   
   

},{new:true, select:"-password"})


if(!updatedProfile){
   throw new ApiError(400,"Profile not updated")
}


return res.status(200).json(new ApiResponse(200,updatedProfile,"Profile updated successfully"))


})


const ProfileChangePassword = asyncHandler(async(req,res)=>{

const user =   await User.findById(req.user?._id)

if(!user){
   throw new ApiError(404,"User not found")
}

const {oldPassword,newPassword,confirmNewPassword} = req.body


const isMatch =  await bcrypt.compare(oldPassword,user.password)

if(!isMatch){
   throw new ApiError(400,"oldPassword is incorrect, please correct oldPassword")

}


if(newPassword !==confirmNewPassword){
   throw new ApiError(400,"newPassword and confirmPassword do not match ")
}



 user.password = newPassword

 await user.save()



return res.status(200).json(new ApiResponse(200,user,"Profile password change successfully"))


})




export {Login,RefreshAccessToken,Logout,Register,Profile,UpdateProfile,ProfileChangePassword}




