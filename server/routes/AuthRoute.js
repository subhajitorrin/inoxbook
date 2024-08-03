import express from "express"
import authAdmin from "../controllers/Admin.js";
const AuthRoutes = express.Router();

AuthRoutes.post("/adminlogin", authAdmin)
export default AuthRoutes