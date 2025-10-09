import {Router} from "express"
import verifyToken from "../middleware/auth.middleware.js"
import authorizeRoles from "../middleware/checkRole.js"
import { AddToCart, AddWishlistProduct, Checkout, DeleteWishlistItems, getCart, GetWishlistProducts, removeCartItems } from "../controllers/cart.controller.js"



const router = Router()



router.route("/add-to-cart/:id").post(verifyToken,authorizeRoles("user"),AddToCart)
router.route("/cartItem").get(verifyToken,authorizeRoles("user"),getCart)
router.route("/removeCartItem/:id").delete(verifyToken,authorizeRoles("user"),removeCartItems)
router.route("/create-checkout-session").post(verifyToken,authorizeRoles("user"),Checkout)
router.route("/add-wishlist/:id").post(verifyToken,authorizeRoles("user"),AddWishlistProduct)
router.route("/wishlist-products").get(verifyToken,authorizeRoles("user"),GetWishlistProducts)
router.route("/delete-wishlistItems/:id").delete(verifyToken,authorizeRoles("user"),DeleteWishlistItems)



export default router
