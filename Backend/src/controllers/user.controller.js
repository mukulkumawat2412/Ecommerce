import asyncHandler from "../utils/AsyncHandler.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessTokenAndRefreshToken } from "../utils/generateAccessAndRefreshToken.js";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import crypto from "crypto";

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

  if (!email && !username) throw new ApiError(400, "Email or Username is required");

  const user = await User.findOne({ $or: [{ email }, { username }] }).select("+password");
  if (!user) throw new ApiError(404, "User does not exist");

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(400, "Incorrect password");

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

  const sanitizedUser = await User.findById(user._id).select("-password -refreshToken -refreshTokenExpiry");

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 20* 1000 }) // 15m access token
    .json(new ApiResponse(200, { sanitizedUser, accessToken }, "Login successful"));
});








const RefreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;
  if (!incomingRefreshToken) throw new ApiError(401, "Refresh token missing");

  try {
    const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) throw new ApiError(401, "Invalid refresh token: user not found");

    const hashedIncomingToken = crypto.createHash("sha256").update(incomingRefreshToken).digest("hex");
    if (hashedIncomingToken !== user.refreshToken) throw new ApiError(401, "Refresh token invalid");
    if (!user.refreshTokenExpiry || user.refreshTokenExpiry < Date.now()) throw new ApiError(401, "Refresh token expired");
    
    const { accessToken, refreshToken: newRefreshToken } = await generateAccessTokenAndRefreshToken(user._id);

    const sanitizedUser = await User.findById(user._id).select("-password -refreshToken -refreshTokenExpiry");

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    };

    return res
      .status(200)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 20 * 1000 }) // 15m access token
      .json(new ApiResponse(200, { accessToken, user: sanitizedUser }, "Access token refreshed successfully"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid or expired refresh token");
  }
});







const Logout = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // 🧹 Remove refresh token from DB
  await User.findByIdAndUpdate(
    userId,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

 

  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/", // important for clearing
  };

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "Logout successful"));
});




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




