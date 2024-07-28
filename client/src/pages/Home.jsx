import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCardsRow from "../components/MovieCardsRow";
import axios from "axios";

function Home() {
  const [currentMovies, setcurrentMovies] = useState([]);
  useEffect(() => {
    async function fetchCurrentMovies() {
      try {
        const res = await axios.get("http://localhost:5000/getallmovies");
        setcurrentMovies(res.data.allMovies);
      } catch (error) {
        console.log("Error while fetching currentmoves", error);
      }
    }
    fetchCurrentMovies();
  }, []);
  return (
    <>
      <Navbar />
      <div className=" min-h-screen  w-full overflow-y-hidden px-[15%]">
        <div className="h-[250px] w-full border border-black my-[1rem]"></div>
        <MovieCardsRow movierow={currentMovies} rowtitle="Recommended Movies" />
        <MovieCardsRow movierow={currentMovies} rowtitle="Recommended Movies" />
        <MovieCardsRow movierow={currentMovies} rowtitle="Recommended Movies" />
      </div>
    </>
  );
}

export default Home;
