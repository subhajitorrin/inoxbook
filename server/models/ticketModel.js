import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema({
    moviename: String,
    language: String,
    date: String,
    time: String,
    theater: String,
    seatCount: Number,
    seatCategory: String,
    seats: [String],
    bookingId: String,
    price: Number,
    screen: String
});

const ticketModel = mongoose.model('tickets', ticketSchema);

export default ticketModel;
