import express from "express"
import getTheaterById from "../controllers/Theater.js"

const TheaterRoutes = express.Router()

TheaterRoutes.get("/gettheaterbyid/:id", getTheaterById)

export default TheaterRoutes