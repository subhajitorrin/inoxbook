import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import MovieCardsRow from "../components/MovieCardsRow";
import { useNavigate } from "react-router-dom";
import { BeatLoader, FadeLoader } from "react-spinners";
import Footer from "../components/Footer";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieDetail, setmovieDetail] = useState(null);
  const [currentMovies, setcurrentMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    async function fetchCurrentMovies() {
      try {
        const res = await axios.get("http://localhost:5000/getallmovies");
        setcurrentMovies(shuffleArray(res.data.allMovies));
      } catch (error) {
        console.log("Error while fetching currentmoves", error);
      }
    }
    fetchCurrentMovies();
  }, []);

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

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleVideoReady = () => {
    setIsLoading(false);
  };

  return (
    movieDetail && (
      <>
        <div className="min-h-screen px-[15%] my-[1rem] mb-[5rem]">
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
                <p className="text-[25px] font-bold">
                  <span>
                    {movieDetail.title.slice(0, 14)}
                    {movieDetail.title.length > 14 && "..."}
                  </span>
                </p>
                <p className="">•</p>
                <p className="text-[15px] font-bold">
                  <span className="bg-[yellow] mr-[5px] p-[5px] rounded-[7px]">
                    {movieDetail.rating}
                  </span>
                  IMDB
                </p>
                <p className="">•</p>
                <p className="text-[17px] font-[500]">
                  {movieDetail.CBFCratnig}
                </p>
              </div>
              <div className="flex gap-[10px] font-[600]">
                {formatMinutesToHours(movieDetail.duration)}
                <p>•</p>
                <div className=" flex gap-[10px]">
                  {movieDetail.language.map((item, index) => {
                    return index < 3 && <p key={index}>{item}</p>;
                  })}
                </div>
                <p>•</p>
                <p>{movieDetail.releaseDate}</p>
              </div>
              <div className="flex gap-[15px] text-[13px]">
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
              <div className=" w-[90%] mt-[1rem]">
                <p className="font-[500]">About the movie</p>
                <p>{movieDetail.synopsis}</p>
              </div>
            </div>
            <div className="w-[70%] flex flex-col gap-[1rem] h-full ">
              <div
                className={`h-[450px] w-[100%] rounded-[10px] overflow-hidden ${
                  isLoading && "flex items-center justify-center"
                }`}
              >
                {isLoading && <FadeLoader color="#da4b63" />}
                <YouTube
                  videoId={getYouTubeId(movieDetail.trailerUrl)}
                  opts={opts}
                  onReady={handleVideoReady}
                  className={isLoading ? "hidden" : "block"}
                />
              </div>
              <div className="flex justify-center w-full flex-col items-center gap-[5px]">
                <button
                  className="bg-[#da4b63] text-white hover:bg-[#b94155] transition-all duration-200 ease-linear  font-[500] w-[60%] cursor-pointer py-[10px] rounded-[5px]"
                  onClick={() => {
                    navigate(`/timings/${id}`);
                  }}
                >
                  Book Ticket
                </button>
                <p className="font-[600] text-[13px]">
                  *Get ready to secure your spot! Check timings now.
                </p>
              </div>
              <div className="border-b border-[#00000057] "></div>
              <div className=" flex flex-col gap-[1rem] items-start ml-[3rem]">
                <p className="text-[20px] font-bold">Starring</p>
                <div className="flex gap-[2rem]">
                  {movieDetail.cast.map((item, index) => {
                    return (
                      <div className="flex flex-col gap-[5px]" key={index}>
                        <div className="h-[100px] w-[100px] rounded-[50%] overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="font-[500]">{item.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[3rem]">
            <MovieCardsRow
              movierow={currentMovies}
              rowtitle="Recommended Movies"
            />
          </div>
        </div>
        <Footer />
      </>
    )
  );
}

export default MovieDetail;
