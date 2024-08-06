import mongoose from "mongoose"

const seatSchema = new mongoose.Schema({
    column: { type: Number, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    isBooked: { type: Boolean, default: false },
    seatCode: { type: String, required: true }
});

const seatModel = mongoose.model('seats', seatSchema);

export { seatSchema, seatModel } 