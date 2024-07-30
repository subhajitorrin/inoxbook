import express from "express"
import bookticket from "../controllers/BookTicket.js"
const BookingRoutes = express.Router()
BookingRoutes.post("/bookticket", bookticket)
export default BookingRoutes