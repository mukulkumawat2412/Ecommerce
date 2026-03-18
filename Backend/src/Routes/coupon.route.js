import {Router} from "express"
import verifyToken from "../middleware/auth.middleware.js"
import authorizeRoles from "../middleware/checkRole.js"
import { ApplyCoupons, CreateCoupons, DeleteCoupon, GetCouponById, GetCoupons, UpdateCoupon } from "../controllers/coupon.controller.js"




const router = Router()



router.route("/Coupons").post(verifyToken,authorizeRoles("admin"),CreateCoupons)
router.route("/all/coupons").get(verifyToken,authorizeRoles("admin"),GetCoupons)
router.route("/delete/coupon/:id").delete(verifyToken,authorizeRoles("admin"),DeleteCoupon)
router.route("/get-coupon/:id").get(verifyToken,authorizeRoles("admin"),GetCouponById)
router.route("/update-coupon/:id").put(verifyToken,authorizeRoles("admin"),UpdateCoupon)
router.route("/apply-coupons").post(verifyToken,authorizeRoles("user"),ApplyCoupons)


export default router