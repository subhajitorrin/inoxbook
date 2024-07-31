import React, { useEffect, useState } from "react";
import UpdateCards from "./adminComponents/UpdateCards";
import axios from "axios";
import UpdateWrapper from "./adminComponents/UpdateWrapper";

function UpdateMovies() {
  const [allMovies, setallMovies] = useState([]);
  const [toggle, settoggle] = useState(false);
  const [clickedId, setClickedId] = useState(null);
  const [movieDetail, setmovieDetail] = useState(null);
  useEffect(() => {
    async function fetchAllMovies() {
      try {
        const res = await axios.get("http://localhost:5000/getallmovies");
        setallMovies(res.data.allMovies);
      } catch (error) {
        console.log("Error while fetching currentmoves", error);
      }
    }
    fetchAllMovies();
  }, [toggle]);

  useEffect(() => {
    async function fetchMovieDetail() {
      if (clickedId) {
        try {
          const res = await axios.get(
            `http://localhost:5000/moviedetail/${clickedId}`
          );
          setmovieDetail(res.data.movie);
        } catch (error) {
          console.log("Error while fetching movie details", error);
        }
      }
    }
    if (clickedId) fetchMovieDetail();
  }, [clickedId]);

  return (
    <div className="h-full w-full flex flex-wrap overflow-auto justify-center p-[3%] gap-[2rem]">
      {toggle ? (
        movieDetail && <UpdateWrapper movieData={movieDetail} />
      ) : (
        <>
          {allMovies.map((item, index) => {
            return (
              <UpdateCards
                key={index}
                item={item}
                settoggle={settoggle}
                setClickedId={setClickedId}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default UpdateMovies;
