import express from "express"
import { sendotp, verifyotp } from "../controllers/SendOtp.js"
const VerifyRoutes = express.Router()
VerifyRoutes.post("/sendotp", sendotp)
VerifyRoutes.post("/verifyotp", verifyotp)
export default VerifyRoutes