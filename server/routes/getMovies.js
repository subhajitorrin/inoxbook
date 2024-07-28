import currentMovies from "../data/moviedata.json" assert { type: "json" };
import theaterList from "../data/theaterdata.json" assert { type: "json" };
import seatmatrices from "../data/seatmatrix.json" assert { type: "json" };
import express from "express"
import movieModel from "../models/movieModels.js";

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

function getMovieDetailById(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Movie ID is required" });
    }
    try {
        const movie = currentMovies.find((item) => item.id === id);

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
function getSeatmatrixById(req, res) {
    try {
        const { showid } = req.params;
        const resultedseatmatrix = seatmatrices.find((item) => item.showid === showid);
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


router.get("/getallmovies", getCurrentMovies)
router.get("/moviedetail/:id", getMovieDetailById)
router.get("/gettheaterbyid/:id", getTheaterById)
router.get("/gettheaterbyid/:id", getTheaterById)
router.get("/getseatmatrixbyid/:showid", getSeatmatrixById)

export default router