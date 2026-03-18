import {Router} from "express"
import verifyToken from "../middleware/auth.middleware.js"


import authorizeRoles from "../middleware/checkRole.js"
import { DeleteProducts, getProductById, GetProducts, UpdateProduct } from "../controllers/admin.product.controller.js"
import { upload } from "../middleware/multer.middleware.js"

const router = Router()



router.route("/get-products").get(verifyToken,authorizeRoles("admin"),GetProducts)
router.route("/Delete-products/:id").delete(verifyToken,authorizeRoles("admin"),DeleteProducts)
router.route("/get-products/:id").get(verifyToken,authorizeRoles("admin"),getProductById)
router.route("/product-update/:id").put(verifyToken,authorizeRoles("admin"),upload.array("images",4),UpdateProduct)



export default router

