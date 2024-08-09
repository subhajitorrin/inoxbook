import express from "express"
import { getAllMovies, getMovieDetailById, addNewMovie, updateMovieById, deleteMovieById, getMoviePosterLink, searchMovie } from "../controllers/Movies.js"

const MovieRoutes = express.Router();

MovieRoutes.get("/getallmovies", getAllMovies)
MovieRoutes.get("/searchmovie", searchMovie);
MovieRoutes.get("/getposter/:id", getMoviePosterLink)
MovieRoutes.get("/moviedetail/:id", getMovieDetailById)
MovieRoutes.post("/addnewmovie", addNewMovie)
MovieRoutes.put("/updatemovie/:id", updateMovieById);
MovieRoutes.delete("/deletemovie/:id", deleteMovieById);
export default MovieRoutes