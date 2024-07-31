import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteSectionMovieCards from "./adminComponents/DeleteSectionMovieCards";

function DeleteMovies() {
  const [allMovies, setallMovies] = useState([]);
  useEffect(() => {
    async function fetchAllMovies() {
      try {
        const res = await axios.get("http://localhost:5000/getallmovies");
        setallMovies(res.data.allMovies);
        console.log(res.data.allMovies);
      } catch (error) {
        console.log("Error while fetching currentmoves", error);
      }
    }
    fetchAllMovies();
  }, []);
  return (
    <div className="h-full w-full flex flex-wrap overflow-auto justify-center py-[3%] gap-[2rem]">
      {allMovies.map((item, index) => {
        return <DeleteSectionMovieCards item={item} />;
      })}
    </div>
  );
}

export default DeleteMovies;
