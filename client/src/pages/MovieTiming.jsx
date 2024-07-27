import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDateCard from "../components/MovieDateCard";
import MovieTheaterCard from "../components/MovieTheaterCard";
import Navbar from "../components/Navbar";

function MovieTiming() {
  const { id } = useParams();
  const [movieDetail, setmovieDetail] = useState(null);
  const [movieTimings, setmovieTimings] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    async function getMovieDetailById() {
      try {
        const res = await axios.get(`http://localhost:5000/moviedetail/${id}`);
        setmovieDetail(res.data.movie);
        setmovieTimings(res.data.movie.timings);
      } catch (error) {
        console.log("Error while fetching movie detail", error);
      }
    }
    getMovieDetailById();
  }, [id]);

  useEffect(() => {
    // if (movieDetail) console.log(movieDetail.movie);
  }, [movieDetail]);

  function formatMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}hr ${mins}m`;
  }

  return (
    movieDetail && (
      <>
        <Navbar />
        <div className="min-h-screen my-[1rem] px-[15%] w-full flex select-none flex-col">
          <div className="flex pb-[1.5rem]  border-b border-[#00000057] w-full h-[140px]">
            <div className="flex flex-col gap-[7px] ">
              <h1 className="text-[30px] font-bold">{movieDetail.title}</h1>
              <div className="flex gap-[10px] font-[600]">
                {formatMinutesToHours(movieDetail.duration)}
                <p>•</p>
                <div className=" flex gap-[10px]">
                  {movieDetail.language.map((item, index) => {
                    return index < 3 && <p key={index}>{item}</p>;
                  })}
                </div>
              </div>
              <div className="flex gap-[15px] text-[13px] mt-[5px]">
                {movieDetail.genre.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="py-[5px] px-[10px] bg-[#d7d7d7df] rounded-[7px] cursor-pointer font-[500]"
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="ml-[2rem] h-[120px] w-[400px] rounded-[10px] overflow-hidden">
              <img
                src={movieDetail.backPoster}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className=" flex-1">
              <p className="font-[600] text-[13px] text-center mb-[-10px]">
                *Kindly select the date that best suits your preferences for the
                show.
              </p>
              <div className="flex gap-[10px] justify-center items-center h-full">
                {movieTimings.map((item, index) => {
                  return (
                    <MovieDateCard
                      date={item.date}
                      key={index}
                      isSelected={index === selectedIndex}
                      onClick={() => setSelectedIndex(index)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-[2rem] flex flex-col gap-[3rem]">
            {movieTimings.map((item, index) => {
              if (index !== selectedIndex) return null;
              return item.theaters.map((theater, i) => {
                if (!movieTimings[selectedIndex] > 0) return;
                return (
                  <MovieTheaterCard
                    key={`theater${i}`}
                    theater={theater}
                    movieId={movieDetail.id}
                    datecode={movieTimings[selectedIndex].date}
                  />
                );
              });
            })}
          </div>
        </div>
      </>
    )
  );
}

export default MovieTiming;
