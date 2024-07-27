import currentMovies from "../data/moviedata.json" assert { type: "json" };
import express from "express"

const router = express.Router();

function getCurrentMovies(req, res) {
    res.json(currentMovies)
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


router.get("/getcurrentmovies", getCurrentMovies)
router.get("/moviedetail/:id", getMovieDetailById)

export default router