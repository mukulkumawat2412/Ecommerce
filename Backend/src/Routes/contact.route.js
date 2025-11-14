import {Router} from "express"
import verifyToken from "../middleware/auth.middleware.js"
import authorizeRoles from "../middleware/checkRole.js"
import { AdminReplyMessage, contactUs, ContactUserDetails, deleteContactRecord, GetContactRecordById, updateContactRecord } from "../controllers/contact.controller.js"




const router = Router()

router.route("/createContact").post(verifyToken,authorizeRoles("user"),contactUs)
router.route("/admin-reply/:contactId").post(verifyToken,authorizeRoles("admin"),AdminReplyMessage)
router.route("/all-Contact").get(verifyToken,authorizeRoles("admin"),ContactUserDetails)
router.route("/delete-Contact/:cId").delete(verifyToken,authorizeRoles("admin"),deleteContactRecord)
router.route("/getContactRecord/:cId").get(verifyToken,authorizeRoles("admin"),GetContactRecordById)
router.route("/update-contactRecord/:cId").put(verifyToken,authorizeRoles("admin"),updateContactRecord)




export default router