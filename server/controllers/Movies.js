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

async function addNewMovie(req, res) {
    const {
        title,
        genre,
        duration,
        language,
        CBFCratnig,
        releaseDate,
        cast,
        synopsis,
        rating,
        posterUrl,
        trailerUrl,
        categories
    } = req.body;

    try {
        const newMovie = new movieModel({
            title,
            genre,
            duration,
            language,
            CBFCratnig,
            releaseDate,
            cast,
            synopsis,
            rating,
            posterUrl,
            trailerUrl,
            categories
        });
        await newMovie.save();
        res.status(201).json({
            message: 'Movie added successfully',
            movie: newMovie
        });

    } catch (err) {
        console.error('Error adding movie:', err);
        res.status(500).json({
            message: 'Failed to add movie',
            error: err.message
        });
    }
}

async function updateMovieById(req, res) {
    const { id } = req.params
    const updates = req.body
    try {
        const updatedMovie = await movieModel.findByIdAndUpdate(id, updates, { new: true })
        if (updatedMovie) {
            res.status(200).json({
                message: "Movie updated successfully",
                movie: updatedMovie
            })
        } else {
            res.status(400).json({ message: 'Movie not found' });
        }
    } catch (err) {
        console.log("Error while updating movie", err);
        res.status(500).json({
            message: "Failed to update movie",
            error: err.message
        })
    }
}

async function deleteMovieById(req, res) {
    const { id } = req.params;
    try {
        const dbres = await movieModel.findByIdAndDelete(id)
        if (dbres) {
            res.status(200).json({ message: "Movie has been deleted" })
        } else {
            res.status(400).json({ message: "Movie not found!!!" })
        }
    } catch (err) {
        console.log("Error while deleting movie", err);
        res.status(500).json({
            message: "Error while deleting movie",
            err: err.message
        })
    }
}

async function getMoviePosterLink(req, res) {
    const { id } = req.params
    try {
        const posterRes = await movieModel.findById(id)
        if (posterRes) {
            res.status(200).json({ poster: posterRes.posterUrl })
        }
    } catch (err) {
        console.log("Error while fetching poster", err);
        res.status(500).json({
            message: "Error while fetching poster",
            err: err.message
        })
    }
}

async function searchMovie(req, res) {
    try {
        const { query } = req.query
        const dbres = await movieModel.find({ title: { $regex: query, $options: 'i' } });
        if (dbres.length > 0) {
            res.status(200).json(dbres)
        } else {
            res.status(201).json([])
        }
    } catch (err) {
        console.log("Error while searching movie");
        res.status(500).json({ msg: "Error while searching movie" })
    }
}

export { getAllMovies, getMovieDetailById, addNewMovie, updateMovieById, deleteMovieById, getMoviePosterLink, searchMovie }