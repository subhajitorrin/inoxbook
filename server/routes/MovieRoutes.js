import express from "express"
import { getAllMovies, getMovieDetailById } from "../controllers/Movies.js"

const MovieRoutes = express.Router();

MovieRoutes.get("/getallmovies", getAllMovies)
MovieRoutes.get("/moviedetail/:id", getMovieDetailById)


export default MovieRoutes