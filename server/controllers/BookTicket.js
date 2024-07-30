import seatMatrixModel from "../models/seatMatrixModel.js";
import userModel from "../models/userModel.js";
import ticketModel from "../models/ticketModel.js";
import mailSender from "../utility/sendMail.js";
import getSeatByIndex from "../utility/getSeatByIndex.js"

async function bookticket(req, res) {
    const { showid, seats, userId, ticketDetail, email, name } = req.body;
    try {
        const seatMatrix = await seatMatrixModel.findOne({ showid });
        if (!seatMatrix) {
            return res.status(404).json({ error: "Seat matrix not found" });
        }
        for (let seatIndex of seats) {
            if (seatMatrix.seats[seatIndex] === false) {
                return res.status(400).json({ error: `Seat ${seatIndex} is already booked` });
            }
            seatMatrix.seats[seatIndex] = false;
        }
        const ticket = new ticketModel({
            ...ticketDetail,
            seats,
            bookingId: generateRandomString()
        })

        const seatMatrixres = await seatMatrix.save();
        const ticketRes = await ticket.save();
        await userModel.findByIdAndUpdate(userId, {
            $push: { ticket: ticketRes._id }
        });

        let seatsStr = ""
        seats.forEach((item) => {
            seatsStr += getSeatByIndex(item) + ", "
        })

        const title = "Ticket Booking Successfull"
        const body = `
    <h1>Booking Confirmation</h1>
    <p>Dear Customer,</p>
    <p>Thank you ${name} for booking with us! Your ticket has been successfully booked. Below are the details of your booking:</p>
    <h2>Booking Details</h2>
    <ul>
        <li><strong>Movie Name:</strong> ${ticketDetail.moviename}</li>
        <li><strong>Language:</strong> ${ticketDetail.language}</li>
        <li><strong>Date:</strong> ${ticketDetail.date}</li>
        <li><strong>Time:</strong> ${ticketDetail.time}</li>
        <li><strong>Theater:</strong> ${ticketDetail.theater}</li>
        <li><strong>Seat Count:</strong> ${ticketDetail.seatCount}</li>
        <li><strong>Booked Seats:</strong> ${seatsStr}</li>
        <li><strong>Seat Category:</strong> ${ticketDetail.seatCategory}</li>
        <li><strong>Price:</strong> ₹${ticketDetail.price}</li>
        <li><strong>Screen:</strong> ${ticketDetail.screen}</li>
    </ul>
    <p>We hope you have a great time at the movie!</p>
    <p>If you have any questions or need further assistance, feel free to contact us.</p>
    <p>Best regards,<br>INOXBOOK Team</p>
`;
        await mailSender(email, title, body)

        res.status(200).json({ msg: "Booking successful", ticket: ticketRes });
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