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

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default:"Guest"
    },
    ticket: {
        type: [ticketSchema],
        default: []
    }
});

const userModel = mongoose.model('users', userSchema);

export default userModel;
