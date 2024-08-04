import express from "express"
import { addTheater, updateTheater, getTheaterById, getAllTheaters } from "../controllers/Theater.js"

const TheaterRoutes = express.Router()

TheaterRoutes.get("/getalltheaters", getAllTheaters)
TheaterRoutes.get("/admin/getthertheater/:id", getTheaterById)
TheaterRoutes.post("/admin/addtheater", addTheater)
TheaterRoutes.put("/admin/updatetheater/:id", updateTheater)

export default TheaterRoutes