import express from "express"
import { addSchedule, getSchedules, deleteSchedule, updateSchedule, getSchedulesByDate, getScreenAvailability, getSchedulesByMovieIdandDate, getScheduleById, blockTheSeats } from "../controllers/Schedule.js"
const ScheduleRoutes = express.Router()
ScheduleRoutes.post("/admin/addschedule", addSchedule)
ScheduleRoutes.post("/admin/getscreenavailability", getScreenAvailability)
ScheduleRoutes.post("/blockseats", blockTheSeats)
ScheduleRoutes.get("/admin/getschedules", getSchedules)
ScheduleRoutes.get("/getschedulesbymovieiddate/:id/:date/:theater", getSchedulesByMovieIdandDate)
ScheduleRoutes.get("/admin/getschedulesbydate/:id", getSchedulesByDate)
ScheduleRoutes.delete("/admin/deleteschedule/:id", deleteSchedule)
ScheduleRoutes.put("/admin/updateschedule/:id", updateSchedule)
ScheduleRoutes.get("/getschedulebyid/:id", getScheduleById)
export default ScheduleRoutes 