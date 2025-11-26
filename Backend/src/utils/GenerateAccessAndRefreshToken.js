import crypto from "crypto";
import User from "../models/user.model.js";
import { ApiError } from "./ApiError.js";

export const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // ✅ Generate JWT Tokens
    const accessToken = user.generateAccessToken();    // expires in 10–15 min
    const refreshToken = user.generateRefreshToken();  // expires in 7d–30d

    // ✅ ✅ HASH refresh token before storing (INDUSTRY SECURITY)
    const hashedRefreshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // ✅ ✅ Save hashed token + expiry
    user.refreshToken = hashedRefreshToken;
    user.refreshTokenExpiry = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    );

    await user.save({ validateBeforeSave: false });

    // ✅ Return ONLY real tokens (not hashed)
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error("TOKEN GENERATION ERROR:", error);
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};
