import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import currentMoviesData from "../data/moviedata.json";
import MovieCard from "../components/MovieCard";
import MovieCardsRow from "../components/MovieCardsRow";

function Home() {
  const [currentMovies, setcurrentMovies] = useState([]);
  useEffect(() => {
    setcurrentMovies(currentMoviesData);
  }, []);
  return (
    <div className=" min-h-screen px-[15%] w-full overflow-y-hidden ">
      <Navbar />
      <div className="h-[300px] w-full border border-black my-[1rem]"></div>
      <MovieCardsRow movierow={currentMovies} rowtitle="Recommended Movies" />
      <MovieCardsRow movierow={currentMovies} rowtitle="Recommended Movies" />
      <MovieCardsRow movierow={currentMovies} rowtitle="Recommended Movies" />
    </div>
  );
}

export default Home;
