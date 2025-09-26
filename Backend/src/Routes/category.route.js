import {Router} from "express"
import verifyToken from "../middleware/auth.middleware.js"
import authorizeRoles from "../middleware/checkRole.js"
import { CreateCategory, GetCategories } from "../controllers/category.controller.js"


const router  = Router()


router.route("/create-category").post(verifyToken,authorizeRoles("admin"),CreateCategory)
router.route("/categories").get(verifyToken,authorizeRoles("user","admin"),GetCategories)



export default router