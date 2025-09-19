import {Router} from "express"
import verifyToken from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js"
import { CreateProduct, GetProducts } from "../controllers/product.controller.js"
import authorizeRoles from "../middleware/checkRole.js"


const router = Router()



router.route("/create-product").post(upload.single("image"),verifyToken,CreateProduct)
router.route("/products").get(verifyToken,authorizeRoles("admin","user"),GetProducts)




export default router