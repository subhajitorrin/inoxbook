import mongoose from "mongoose";
const seatMatrixSchema = new mongoose.Schema({
    showid: String,
    seats: [Boolean]
})
const seatMatrixModel = mongoose.model("seatmatrices", seatMatrixSchema)
export default seatMatrixModel