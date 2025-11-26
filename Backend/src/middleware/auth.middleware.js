import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    // 🔍 Extract token (from cookie first, then Authorization)
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Access token missing");
    }

    // 🔐 Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // 🔍 Fetch user without password + refreshToken
    const user = await User.findById(decoded._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    return next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid or expired token");
  }
});

export default verifyToken;
