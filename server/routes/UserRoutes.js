import express from "express"
import { createuser, getUser } from "../controllers/User.js"
const UserRoutes = express.Router()
UserRoutes.post("/createuser", createuser)
UserRoutes.post("/getuser", getUser)
export default UserRoutes