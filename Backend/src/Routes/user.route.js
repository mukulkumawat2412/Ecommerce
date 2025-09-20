import { Router } from "express";
import { Login ,Logout,RefreshAccessToken,Register,Profile, UpdateProfile, ProfileChangePassword} from "../controllers/user.controller.js";

import verifyToken from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/checkRole.js";





const router = Router()


router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/profile").get(verifyToken,authorizeRoles("user"),Profile)
router.route("/profile-update").put(verifyToken,authorizeRoles("user"),UpdateProfile)
router.route("/profile-change-password").put(verifyToken,authorizeRoles("user"),ProfileChangePassword)
router.route("/refresh-token").post(RefreshAccessToken)
router.route("/logout").post(verifyToken,Logout)




export default router