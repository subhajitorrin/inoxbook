import userModel from "../models/userModel.js";
import ticketModel from "../models/ticketModel.js";
import BookingSuccessEmailSend from "../utility/BookingSuccessEmailSend.js";

async function bookticket(req, res) {
    const { user, BookingData, poster } = req.body;
    const bookingId = generateRandomString()
    BookingData.bookingId = bookingId
    try {

        const newBooking = new ticketModel(BookingData);
        const ticketRes = await newBooking.save()

        console.log("Ticket res", ticketRes);

        if (!ticketRes) res.status(202).json({ msg: "Ticket booking dismissed" })

        await userModel.findByIdAndUpdate(user.userId, {
            $push: { ticket: ticketRes._id }
        })

        await BookingSuccessEmailSend(user, BookingData, poster)

        res.status(200).json({ msg: "Booking successful", ticket: "" });
    } catch (error) {
        console.error("Error booking tickets:", error);
        res.status(500).json({ error: "An internal server error occurred" });
    }
}

function generateRandomString(length = 5) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters[randomIndex];
    }
    return result;
}

export default bookticket