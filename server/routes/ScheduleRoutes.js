import express from "express"
import { addSchedule, getSchedules, deleteSchedule, updateSchedule } from "../controllers/Schedule.js"
const ScheduleRoutes = express.Router()
ScheduleRoutes.post("/addschedule", addSchedule)
ScheduleRoutes.get("/getschedules", getSchedules)
ScheduleRoutes.delete("/deleteschedule/:id", deleteSchedule)
ScheduleRoutes.put("/updateschedule/:id", updateSchedule)
export default ScheduleRoutes