import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import crypto from "crypto";

const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    // ✅ 1. Access Token from Cookie or Header
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      throw new ApiError(401, "Access token missing");
    }

    try {
      // ✅ 2. Verify Access Token
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );

      const user = await User.findById(decoded._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        throw new ApiError(401, "User not found");
      }

      req.user = user;
      return next();

    } catch (accessError) {


      // ✅ 3. If Access Token Expired → Auto Refresh
      if (accessError.name === "TokenExpiredError") {

        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
          throw new ApiError(401, "Session expired. Please login again.");
        }


        const hashedRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex")


        const decoded = jwt.verify(refreshToken
          ,process.env.REFRESH_TOKEN_SECRET
        )


      const user =  await User.findById(decoded._id)



        if(user.refreshToken !== hashedRefreshToken){
             throw new ApiError(401, "Invalid refresh Token")
        }

        // const user = await User.findOne({ refreshToken: hashedRefreshToken }).select("-refreshToken -password")

        // if (!user) {
        //
        // }


        // ✅ 5. Generate NEW Access Token
        const newAccessToken = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );


        // ✅ SAFE COOKIE OPTIONS (ALWAYS OBJECT)
        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production" ? true :false,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          path: "/",
          maxAge: 15 * 60 * 1000,
        };

        res.cookie("accessToken", newAccessToken, cookieOptions);


        // ✅ 6. Set New Cookie

        req.user = user;

        return next(); // ✅ REQUEST CONTINUES WITHOUT ERROR
      }

      throw new ApiError(401, "Invalid access token");
    }

  } catch (error) {
    throw new ApiError(401, error?.message || "Authentication failed");
  }
});

export default verifyToken;
