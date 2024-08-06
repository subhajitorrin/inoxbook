import seatMatrixModel from "../models/seatMatrixModel.js";
import userModel from "../models/userModel.js";
import ticketModel from "../models/ticketModel.js";
import mailSender from "../utility/sendMail.js";
import getSeatByIndex from "../utility/getSeatByIndex.js"

function arrToString(arr){
    let str = ""
    arr.forEach((item)=>{
        str+=`${item} `
    })
    return str
}

async function bookticket(req, res) {
    const BookingData = req.body;
    const bookingId = generateRandomString()
    BookingData.bookingId = bookingId
    try {

        const newBooking = new ticketModel(BookingData);
        const ticketRes = await newBooking.save()

        if (!ticketRes) res.status(202).json({ msg: "Ticket booking dismissed" })

        const email = "zummsg@gmail.com"
        const title = "Ticket Booking Successfull"
        const body = `
            <h1>Booking Confirmation</h1>
            <p>Dear Customer,</p>
            <p>Thank you ${"ORRIN"} for booking with us! Your ticket has been successfully booked. Below are the details of your booking:</p>
            <h2>Booking Details</h2>
            <ul>
                <li><strong>Movie Name:</strong> ${BookingData.moviename}</li>
                <li><strong>Language:</strong> ${BookingData.language}</li>
                <li><strong>Date:</strong> ${BookingData.date}</li>
                <li><strong>Time:</strong> ${BookingData.time}</li>
                <li><strong>Theater:</strong> ${BookingData.theater}</li>
                <li><strong>Seat Count:</strong> ${BookingData.seatCount}</li>
                <li><strong>Booked Seats:</strong> ${arrToString(BookingData.seats)}</li>
                <li><strong>Seat Category:</strong> ${BookingData.seatCategory}</li>
                <li><strong>Price:</strong> ₹${BookingData.price}</li>
                <li><strong>Screen:</strong> ${BookingData.screen}</li>
            </ul>
            <p>We hope you have a great time at the movie!</p>
            <p>If you have any questions or need further assistance, feel free to contact us.</p>
            <p>Best regards,<br>INOXBOOK Team</p>
        `;
        await mailSender(email, title, body)

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