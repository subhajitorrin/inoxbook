import theaterList from "../data/theaterdata.json" assert { type: "json" };
import seatmatrices from "../data/seatmatrix.json" assert { type: "json" };
import express from "express"
import movieModel from "../models/movieModels.js";
import seatMatrixModel from "../models/seatMatrixModel.js";
import mailSender from "../utility/sendMail.js";
import otpModel from "../models/otpModel.js";
import userModel from "../models/userModel.js";
import ticketModel from "../models/ticketModel.js";
import getSeatByIndex from "../utility/getSeatnmaByIndex.js";

const router = express.Router();

async function getCurrentMovies(req, res) {
    try {
        const allMovies = await movieModel.find().exec();
        res.status(200).json({ allMovies });
    } catch (err) {
        console.error('Error fetching movie data:', err.message);
        res.status(500).json({ err });
    }
}

async function getMovieDetailById(req, res) {
    const { id } = req.params;
    try {
        const movie = await movieModel.findById(id)

        if (movie) {
            return res.status(200).json({ movie });
        } else {
            return res.status(404).json({ error: "Movie not found" });
        }
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return res.status(500).json({ error: "An internal server error occurred" });
    }
}

function getTheaterById(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Theater ID is required" });
    }
    try {
        const theater = theaterList.find((item) => item.id == id);
        if (theater) {
            return res.status(200).json({ theater });
        } else {
            return res.status(404).json({ error: "Theater not found" });
        }
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return res.status(500).json({ error: "An internal server error occurred" });
    }
}
async function getSeatmatrixByShowId(req, res) {
    try {
        const { showid } = req.params;
        const resultedseatmatrix = await seatMatrixModel.findOne({ showid });
        if (resultedseatmatrix) {
            return res.status(200).json({ seatmatrix: resultedseatmatrix.seats })
        } else {
            return res.status(404).json({ error: "seatmatrix not found" });
        }

    } catch (error) {
        console.error("Error fetching seatmatrix details:", error);
        return res.status(500).json({ error: "An internal server error occurred" });
    }
}

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

async function sendotp(req, res) {
    try {
        const { email } = req.body
        const otp = generate5DigitOTP()
        await mailSender(email, "Your OTP for INOXBOOK", `Your OTP is: ${otp}`);
        const otpRecord = new otpModel({
            email,
            otp
        });
        const otpresponse = await otpRecord.save();
        res.json({ msg: "OTP sent successfully", email, otpid: otpresponse._id });
    } catch (error) {
        res.json({ error })
    }
}

function generate5DigitOTP() {
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    const restDigits = Math.floor(1000 + Math.random() * 9000);
    return `${firstDigit}${restDigits}`
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


async function verifyotp(req, res) {
    try {
        const { email, optid, otp } = req.body;

        const otpresponse = await otpModel.findById(optid);

        if (!otpresponse) {
            return res.status(300).json({ msg: "OTP expired, send again" });
        }

        if (otpresponse.otp === otp) {
            const existingUser = await userModel.findOne({ email })
            if (existingUser) {
                return res.status(200).json({ email: existingUser.email, name: existingUser.name, tickets: existingUser.ticket, userId: existingUser._id });
            } else {
                return res.status(201).json({});
            }
        } else {
            return res.status(301).json({ msg: "Wrong OTP" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}

async function createuser(req, res) {
    const { email, name } = req.body;
    console.log(email, name);
    try {
        const newUser = new userModel({
            email, name
        })
        const dbres = await newUser.save()
        res.status(200).json({ email: dbres.email, name: dbres.name, tickets: dbres.ticket, userId: dbres._id })
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
}

async function getUser(req, res) {
    const { userid } = req.body;
    try {
        if (!userid) {
            return res.status(400).json({ msg: "User ID is required" });
        }
        const dbres = await userModel.findById(userid);
        if (dbres) {
            res.status(200).json({ email: dbres.email, name: dbres.name, tickets: dbres.ticket, userId: dbres._id });
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ msg: "Server error" });
    }
}

router.get("/getallmovies", getCurrentMovies)
router.get("/moviedetail/:id", getMovieDetailById)
router.get("/gettheaterbyid/:id", getTheaterById)
router.get("/getseatmatrixbyid/:showid", getSeatmatrixByShowId)
router.post("/bookticket", bookticket)
router.post("/sendotp", sendotp)
router.post("/verifyotp", verifyotp)
router.post("/createuser", createuser)
router.post("/getuser", getUser)

export default router