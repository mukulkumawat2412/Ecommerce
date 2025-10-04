import {Router} from "express"
import verifyToken from "../middleware/auth.middleware.js"
import authorizeRoles from "../middleware/checkRole.js"
import { AddToCart, Checkout, getCart, removeCartItems } from "../controllers/cart.controller.js"



const router = Router()



router.route("/add-to-cart/:id").post(verifyToken,authorizeRoles("user"),AddToCart)
router.route("/cartItem").get(verifyToken,authorizeRoles("user"),getCart)
router.route("/removeItem/:id").delete(verifyToken,authorizeRoles("user"),removeCartItems)
router.route("/create-checkout-session").post(verifyToken,authorizeRoles("user"),Checkout)



export default router
