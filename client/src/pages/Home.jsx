import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCardsRow from "../components/MovieCardsRow";
import axios from "axios";

function Home({ settoggleLogin, toggleSideNavbar }) {
  const [currentMovies, setcurrentMovies] = useState([]);
  const [bengaliMovies, setBengaliMovies] = useState([]);
  const [hotmovies, setHotmovies] = useState([]);
  const [southMovies, setSouthMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    if (currentMovies.length > 0 && bengaliMovies.length == 0) {
      const bengaliMoviesList = currentMovies.filter((item) =>
        item.language.some((lan) => lan.toLowerCase() === "bengali")
      );
      setBengaliMovies(bengaliMoviesList);
    }
    if (currentMovies.length > 0 && southMovies.length == 0) {
      const southMoviesList = currentMovies.filter((item) =>
        item.language.some((lan) => lan.toLowerCase() === "tamil")
      );
      setSouthMovies(southMoviesList);
    }
    if (currentMovies.length > 0 && hotmovies.length == 0) {
      const hotMoviesList = currentMovies.filter(
        (item) => item.categories.toLowerCase() === "trending"
      );
      const hindiHotMovies = hotMoviesList.filter((item) =>
        item.language.some((lan) => lan.toLowerCase() === "hindi")
      );
      setHotmovies(hindiHotMovies);
    }
    if (
      currentMovies.length > 0 &&
      hotmovies.length > 0 &&
      bengaliMovies.length > 0
    ) {
      let recommendedList = [...hotmovies, ...bengaliMovies];
      setRecommendedMovies(recommendedList);
    }
  }, [currentMovies, hotmovies, bengaliMovies]);

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
      <div className=" min-h-screen  w-full overflow-y-hidden px-[15%]">
        <div className="h-[250px] w-full border border-black my-[1rem]"></div>
        <MovieCardsRow
          movierow={currentMovies}
          rowtitle="Recommended Movies"
        />
        <MovieCardsRow movierow={hotmovies} rowtitle="Hot Movies" />
        {/* <MovieCardsRow movierow={southMovies} rowtitle="South Indian Movies" /> */}
        <MovieCardsRow movierow={bengaliMovies} rowtitle="Bengali Movies" />
      </div>
    </>
  );
}

export default Home;
