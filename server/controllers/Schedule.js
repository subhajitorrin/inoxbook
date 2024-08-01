import scheduleModel from "../models/scheduleModel.js"

async function addSchedule(req, res) {
    try {
        const newScheduleData = req.body
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
        const dbres = await scheduleModel.find().exec()
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

export { addSchedule, getSchedules, deleteSchedule, updateSchedule }