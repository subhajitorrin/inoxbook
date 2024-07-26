import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

function MovieDetail() {
  const { id } = useParams();
  const [movieDetail, setmovieDetail] = useState(null);
  useEffect(() => {
    async function getMovieDetailById() {
      try {
        const res = await axios.get(`http://localhost:5000/moviedetail/${id}`);
        setmovieDetail(res.data.movie);
        console.log(res.data.movie);
      } catch (error) {
        console.log("Error while fetching movie detail", error);
      }
    }
    getMovieDetailById();
  }, [id]);

  const opts = {
    height: "450",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  function getYouTubeId(url) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  function formatMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}hr ${mins}m`;
  }

  return (
    movieDetail && (
      <div className="min-h-screen px-[15%] my-[1rem]">
        <div className="flex justify-between w-full ">
          <div className="w-[30%] flex flex-col gap-[10px]">
            <div className="h-[550px] w-[90%]  rounded-[10px] overflow-hidden">
              <img
                src={movieDetail.posterUrl}
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
            <div className="flex gap-[10px]  items-center ">
              <p className="text-[25px] font-bold">{movieDetail.title}</p>
              <p className="">•</p>
              <p className="text-[15px] font-bold">
                <span className="bg-[yellow] mr-[5px] p-[5px] rounded-[7px]">
                  {movieDetail.rating}
                </span>
                IMDB
              </p>
            </div>
            <div className="flex gap-[10px] font-[600]">
              {formatMinutesToHours(movieDetail.duration)}
              <p>•</p>
              <div className=" flex gap-[10px]">
                {movieDetail.language.map((item, index) => {
                  return index < 3 && <p>{item}</p>;
                })}
              </div>
              <p>•</p>
              <p>{movieDetail.releaseDate}</p>
            </div>
            <div className="flex gap-[15px] text-[13px]">
              {movieDetail.genre.map((item, index) => {
                return (
                  <div className="py-[5px] px-[10px] bg-[#d7d7d7df] rounded-[7px] cursor-pointer font-[500]">
                    {item}
                  </div>
                );
              })}
            </div>
            <div className=" w-[90%] mt-[1rem]">
              <p className="font-[500]">About the movie</p>
              <p>{movieDetail.synopsis}</p>
            </div>
          </div>
          <div className="w-[70%] flex flex-col gap-[1rem] h-full">
            <div className="h-[450px] w-[100%]  rounded-[10px] overflow-hidden">
              <YouTube
                videoId={getYouTubeId(movieDetail.trailerUrl)}
                opts={opts}
              />
            </div>
            <div className=" flex justify-center w-full flex-col items-center gap-[5px]">
              <button className="bg-[#da4b63] text-white hover:bg-[#b94155] transition-all duration-200 ease-linear  font-[500] w-[60%] cursor-pointer py-[10px] rounded-[5px]">
                Book Ticket
              </button>
              <p className="font-[600] text-[13px]">
                *Get ready to secure your spot! Check timings now.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default MovieDetail;
