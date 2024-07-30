import express from "express"
import getSeatmatrixByShowId from "../controllers/SeatMatrix.js"
const SeatMatrixRoutes = express.Router()
SeatMatrixRoutes.get("/getseatmatrixbyid/:showid", getSeatmatrixByShowId)
export default SeatMatrixRoutes