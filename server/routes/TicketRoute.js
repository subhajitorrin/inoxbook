import express from "express"
import getTicketById from "../controllers/Ticket.js"
const TicketRouter = express.Router()
TicketRouter.get("/getticketbyid/:id",getTicketById)
export default TicketRouter