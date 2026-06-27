import { Router } from "express";
import { Login ,Logout,RefreshAccessToken,Register,Profile, UpdateProfile, ProfileChangePassword,GetAllUsers} from "../controllers/user.controller.js";

import verifyToken from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/checkRole.js";





const router = Router()


router.route("/register").post(Register)
router.route("/get-users").get(verifyToken,authorizeRoles(["admin"]),GetAllUsers)
router.route("/unlock-user/:id").patch(verifyToken,authorizeRoles(["admin"]),)
router.route("/login").post(Login)
router.route("/profile").get(verifyToken,authorizeRoles(["admin","user"]),Profile)
router.route("/profile-update").put(verifyToken,authorizeRoles(["admin","user"]),UpdateProfile)
router.route("/profile-change-password").put(verifyToken,authorizeRoles(["admin","user"]),ProfileChangePassword)
router.route("/refresh-token").post(RefreshAccessToken)
router.route("/logout").post(verifyToken,Logout)




export default router
