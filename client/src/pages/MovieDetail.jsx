import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const [movieDetail, setmovieDetail] = useState(null);
  useEffect(() => {
    async function getMovieDetailById() {
      try {
        const res = await axios.get(`http://localhost:5000/moviedetail/${id}`);
        setmovieDetail(res.data.movie);
      } catch (error) {
        console.log("Error while fetching movie detail", error);
      }
    }
    getMovieDetailById();
  }, [id]);

  useEffect(() => {
    if (movieDetail) console.log(movieDetail.movie);
  }, [movieDetail]);

  return <div>movie detail {movieDetail && movieDetail.title}</div>;
}

export default MovieDetail;
