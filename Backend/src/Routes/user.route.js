import { Router } from "express";
import { Login ,Logout,RefreshAccessToken,Register} from "../controllers/user.controller.js";

import verifyToken from "../middleware/auth.middleware.js";





const router = Router()


router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/refresh-token").post(RefreshAccessToken)
router.route("/logout").post(verifyToken,Logout)




export default router