import {Router} from "express"
import verifyToken from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js"
import { CreateProduct, GetProducts,GetProductsByCategory,getSingleProduct, PaginationProducts, ProductSearch } from "../controllers/product.controller.js"
import authorizeRoles from "../middleware/checkRole.js"


const router = Router()



router.route("/create-product").post(upload.array("images",4),verifyToken,CreateProduct)
router.route("/products").get(verifyToken,authorizeRoles("admin","user"),GetProducts)
router.route("/Pagination-products").get(verifyToken,authorizeRoles("user"),PaginationProducts)
router.route("/categoryBy-products/:categoryId").get(verifyToken,authorizeRoles("user"),GetProductsByCategory)
router.route("/single-product/:id").get(verifyToken,authorizeRoles("user"),getSingleProduct)
router.route("/search").get(verifyToken,authorizeRoles("user"),ProductSearch)



export default router