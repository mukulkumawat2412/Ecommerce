import {Router} from "express"
import verifyToken from "../middleware/auth.middleware.js"
import authorizeRoles from "../middleware/checkRole.js"
import { ApplyCoupons, CreateCoupons } from "../controllers/coupon.controller.js"




const router = Router()



router.route("/Coupons").post(verifyToken,authorizeRoles("admin"),CreateCoupons)
router.route("/apply-coupons").post(verifyToken,authorizeRoles("user"),ApplyCoupons)


export default router