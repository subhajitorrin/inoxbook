import theaterList from "../data/theaterdata.json" assert { type: "json" };
import seatmatrices from "../data/seatmatrix.json" assert { type: "json" };
import express from "express"
import movieModel from "../models/movieModels.js";
import seatMatrixModel from "../models/seatMatrixModel.js";
import mailSender from "../utility/sendMail.js";
import otpModel from "../models/otpModel.js";

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
        console.log(movie);

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
    const { showid, seats } = req.body;
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
        await seatMatrix.save();
        res.status(200).json({ msg: "Booking successful", seats: seatMatrix.seats });
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


async function verifyotp(req, res) {
    try {
        const { email, optid, otp } = req.body;

        const otpresponse = await otpModel.findById(optid);

        if (!otpresponse) {
            return res.json({ msg: "OTP record not found" });
        }

        if (otpresponse.otp === otp) {
            return res.status(200).json({ msg: "Login success" });
        } else {
            return res.status(201).json({ msg: "Wrong OTP" });
        }
    } catch (error) {
        console.error(error);
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

export default router