import scheduleModel from "../models/scheduleModel.js"

async function addSchedule(req, res) {
    try {
        const newScheduleData = req.body
        // const nextDay = new Date(newScheduleData.date);
        // nextDay.setDate(nextDay.getDate() + 1);
        // newScheduleData.date = nextDay
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
    const { theaterId } = req.params
    try {
        const dbres = await scheduleModel.find({ theaterId }).sort({ date: 1 }).exec();
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
    // console.log("inside delete scheduel");
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

    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    try {
        const conflictingShows = await scheduleModel.find({
            screen,
            date,
        });

        let flag = true

        for (const item of conflictingShows) {
            const exStart = new Date(item.startTime).getTime() - 1200000;
            const exEnd = new Date(item.endTime).getTime() + 1200000; // 20min(in milisec) extra for next show
            if ((start >= exStart && start <= exEnd) || (end >= exStart && end <= exEnd)) {
                flag = false
                break
            }
        }

        // console.log("Flag is ", flag);

        if (flag) {
            console.log("screen available");
            res.status(200).json({ "status": "screen available", conflictingShows })
        } else {
            console.log("screen not available");
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

        const dbres = await scheduleModel.find({
            movie: id, theaterId: theater, date: providedDate
        })

        if (dbres.length > 0) {
            res.status(200).json({ schedules: dbres })
        } else {
            res.status(201).json({ schedules: [] })
        }

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

function isItemInArray(item, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].row === item.row && array[i].seat === item.seat) {
            return true;
        }
    }
    return false;
}

function checkArrayPresence(firstArray, secondArray) {
    for (let i = 0; i < secondArray.length; i++) {
        if (!isItemInArray(secondArray[i], firstArray)) {
            return false;
        }
    }
    return true;
}


async function blockTheSeats(req, res) {
    try {
        const { scheduleId, bookedSeats } = req.body;

        const schedule = await scheduleModel.findById(scheduleId);
        let existingBookedSeats = schedule.bookedSeats;
        const refinedExisting = existingBookedSeats.map((item) => {
            return { row: item.row, seat: item.seat }
        })

        if (checkArrayPresence(refinedExisting, bookedSeats)) {
            return res.status(201).json({ msg: "One or more seats are already booked." });
        }

        const dbres = await scheduleModel.findByIdAndUpdate(scheduleId,
            { $addToSet: { bookedSeats } },
            { new: true }
        )
        if (dbres) {
            res.status(200).json({ msg: "Seats are blocked" })
        } else {
            res.status(400).json({ msg: "Schedule not found!" })
        }
    } catch (error) {
        console.error('Error blocking seats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export { addSchedule, getSchedules, deleteSchedule, updateSchedule, getSchedulesByDate, getScreenAvailability, getSchedulesByMovieIdandDate, getScheduleById, blockTheSeats }