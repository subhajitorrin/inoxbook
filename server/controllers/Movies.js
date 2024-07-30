import movieModel from "../models/movieModels.js";

async function getAllMovies(req, res) {
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

export { getAllMovies, getMovieDetailById }