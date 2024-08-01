import React, { useEffect, useState } from "react";
import axios from "axios";
import AddMovies from "../AddMovies";

function UpdateWrapper({ clickedId, setisBackActive }) {
  const [movieDetail, setmovieDetail] = useState(null);
  const [movieId, setmovieId] = useState(null);
  useEffect(() => {
    async function fetchMovieDetail() {
      if (movieId) {
        try {
          const res = await axios.get(
            `http://localhost:5000/moviedetail/${movieId}`
          );
          setmovieDetail(res.data.movie);
        } catch (error) {
          console.log("Error while fetching movie details", error);
        }
      }
    }
    if (movieId) fetchMovieDetail();
  }, [movieId]);

  useEffect(() => {
    setisBackActive(true);
    const idToUpdate = localStorage.getItem("updateMovieId");
    console.log(idToUpdate);
    if (idToUpdate) {
      setmovieId(idToUpdate);
    }
  }, []);

  return <AddMovies isUpdate={true} movieData={movieDetail} />;
}

export default UpdateWrapper;
