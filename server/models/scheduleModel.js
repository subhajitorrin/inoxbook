import mongoose from "mongoose";
const scheduleSchema = new mongoose.Schema({
    screen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'screens',
        required: true
    },
    screenName: {
        type: String
    },
    theaterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'theaters',
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
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    nextShowTime: {
        type: String,
        default: null
    }
});
const scheduleModel = mongoose.model("schedules", scheduleSchema)

export default scheduleModel