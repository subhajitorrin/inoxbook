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
      autoplay: 1,
    },
  };

  function getYouTubeId(url) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  return (
    movieDetail && (
      <div className="min-h-screen px-[15%] my-[1rem]">
        <div className="h-[550px]  flex justify-between w-full ">
          <div className="w-[30%] ">
            <div className="h-[550px] w-[90%]  rounded-[10px] overflow-hidden">
              <img
                src={movieDetail.posterUrl}
                className="h-full w-full object-cover"
                alt=""
              />
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
