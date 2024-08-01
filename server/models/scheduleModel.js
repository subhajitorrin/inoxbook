import mongoose from "mongoose";
const scheduleSchema = new mongoose.Schema({
    screen: {
        type: Number,
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'currentmovies',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    nextShowTime: {
        type: Date,
        default: null
    }
});
const scheduleModel = mongoose.model("schedules", scheduleSchema)

export default scheduleModel