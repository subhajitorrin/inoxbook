import mongoose from "mongoose"
const theaterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    screens: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "screens"
    }]
});
const theaterModel = mongoose.model("theaters", theaterSchema)
export default theaterModel