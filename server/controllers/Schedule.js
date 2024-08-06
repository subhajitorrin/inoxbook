import scheduleModel from "../models/scheduleModel.js"

async function addSchedule(req, res) {
    try {
        const newScheduleData = req.body
        const nextDay = new Date(newScheduleData.date);
        nextDay.setDate(nextDay.getDate() + 1);
        newScheduleData.date = nextDay
        const newSchedule = new scheduleModel(newScheduleData)
        const dbres = await newSchedule.save()
        if (dbres) {
            res.status(200).json({ "msg": "New schedule added" })
        }
    } catch (err) {
        res.status(500).json({ "msg": "Error while adding schedule", err })
    }
}

async function getSchedules(req, res) {
    try {
        const dbres = await scheduleModel.find().sort({ date: 1 }).exec();
        if (dbres) {
            res.status(200).json({ schedules: dbres })
        } else {
            res.status(300).json({ msg: "Schedules not find" })
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteSchedule(req, res) {
    const { id } = req.params;
    console.log("inside delete scheduel");
    try {
        const dbres = await scheduleModel.findByIdAndDelete(id);
        if (dbres) {
            res.status(200).json({ msg: "Schedule deleted successfully" });
        } else {
            res.status(404).json({ msg: "Schedule not found" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error while deleting schedule" });
    }
}

async function updateSchedule(req, res) {
    const { id } = req.params
    const updatedData = req.body
    try {
        const dbres = await scheduleModel.findByIdAndUpdate(id, updatedData, { new: true })
        if (dbres) {
            res.status(200).json({
                message: "Schedule updated successfully",
                schedule: dbres
            })
        } else {
            res.status(400).json({ message: 'Schedule not found' });
        }
    } catch (error) {
        console.log("Error while updating schedule", err);
        res.status(500).json({
            message: "Failed to update schedule",
            error: err.message
        })
    }
}

async function getSchedulesByDate(req, res) {
    const { id } = req.params
    try {
        const dbres = await scheduleModel.find({ date: id }).sort({ startTime: 1 });
        if (dbres) {
            res.status(200).json({ schedules: dbres })
        } else {
            res.status(400).json({ msg: "Schedule on date not find" })
        }
    } catch (err) {
        console.log("Error while fetching date schedule", err);
        res.status(500).json({
            message: "Failed to fetch date schedule",
            error: err.message
        })
    }
}

async function getScreenAvailability(req, res) {
    const { screen, date, startTime, endTime } = req.body;
    const start = new Date(startTime);
    const end = new Date(endTime);
    try {
        const conflictingShows = await scheduleModel.find({
            screen,
            date,
        });

        let flag = true

        for (const item of conflictingShows) {
            const exStart = new Date(item.startTime)
            const exEnd = new Date(item.endTime)
            if ((start >= exStart && start <= exEnd) || (end >= exStart && end <= exEnd)) {
                flag = false
                break
            }
        }

        if (flag) {
            res.status(200).json({ "status": "screen available", conflictingShows })
        } else {
            res.status(201).json({ "status": "screen not available" })
        }
    } catch (err) {
        console.log("Error while fetching screen availability", err);
        res.status(500).json({
            message: "Failed to fetch screen availability",
            error: err.message
        })
    }
}

async function getSchedulesByMovieIdandDate(req, res) {
    const { id, date, theater } = req.params
    try {
        const providedDate = new Date(date);
        const startOfDay = new Date(providedDate);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(providedDate);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const dbres = await scheduleModel.find({
            movie: id, date: {
                $gte: startOfDay, $lte: endOfDay
            },
            theaterId: theater
        })

        console.log(dbres);
        res.status(200).json({ schedules: dbres })
    } catch (error) {
        console.log("Error while fetching schedules", err);
        res.status(500).json({
            message: "Failed to fetch schedule",
            error: err.message
        })
    }
}

async function getScheduleById(req, res) {
    const { id } = req.params
    try {
        const dbres = await scheduleModel.findById(id)
        if (dbres) {
            res.status(200).json({ msg: "Schedule find successfull", schedule: dbres })
        } else {
            res.status(404).json({ msg: "Schedule not present" })
        }
    } catch (err) {
        console.log("Error while fetching schedule", err);
        res.status(500).json({
            message: "Failed to fetch schedule",
            error: err.message
        })
    }
}

export { addSchedule, getSchedules, deleteSchedule, updateSchedule, getSchedulesByDate, getScreenAvailability, getSchedulesByMovieIdandDate, getScheduleById }