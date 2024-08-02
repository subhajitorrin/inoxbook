import express from "express"
import { addSchedule, getSchedules, deleteSchedule, updateSchedule, getSchedulesByDate } from "../controllers/Schedule.js"
const ScheduleRoutes = express.Router()
ScheduleRoutes.post("/addschedule", addSchedule)
ScheduleRoutes.get("/getschedules", getSchedules)
ScheduleRoutes.get("/getschedulesbydate/:id", getSchedulesByDate)
ScheduleRoutes.delete("/deleteschedule/:id", deleteSchedule)
ScheduleRoutes.put("/updateschedule/:id", updateSchedule)
export default ScheduleRoutes 