import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCardsRow from "../components/MovieCardsRow";
import axios from "axios";
import Footer from "../components/Footer";

function Home() {
  const [currentMovies, setcurrentMovies] = useState([]);
  const [bengaliMovies, setBengaliMovies] = useState([]);
  const [hotmovies, setHotmovies] = useState([]);
  const [southMovies, setSouthMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const sliderRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carousolList, setCarousolList] = useState([
    "https://i.ytimg.com/vi/BVGZ-ZVuWWs/maxresdefault.jpg",
    "https://assets-in.bmscdn.com/discovery-catalog/events/et00374797-eudtdmbxxn-landscape.jpg",
    "https://i.ytimg.com/vi/Idh8n5XuYIA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLASVHZQZdujw8GwNy9xPvlzTp-puw",
    "https://static.tnn.in/thumb/msid-111236559,thumbsize-90518,width-1280,height-720,resizemode-75/111236559.jpg?quality=100",
    "https://i.ytimg.com/vi/BVGZ-ZVuWWs/maxresdefault.jpg",
    "https://i.ytimg.com/vi/lU_NKNZljoQ/maxresdefault.jpg",
    "https://assets-in.bmscdn.com/discovery-catalog/events/et00374797-eudtdmbxxn-landscape.jpg",
  ]);

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

  useEffect(() => {
    sliderRefs.current.forEach((item, index) => {
      item.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? carousolList.length - 3 : prevSlide - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === carousolList.length - 3 ? 0 : prevSlide + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === carousolList.length - 3 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [carousolList.length]);

  return (
    <>
      <div className=" min-h-screen  w-full overflow-y-hidden mb-[5rem]">
        <div className="w-full overflow-x-hidden relative">
          <div className="h-full w-full absolute flex justify-center items-end pb-[2rem]">
            <div className="flex gap-[5px] z-[10]">
              {carousolList.map((item, index) => {
                if (index > 0 && index < carousolList.length - 1) {
                  return (
                    <div
                      style={{
                        backgroundColor:
                          currentSlide === index - 1 ? "white" : "grey",
                      }}
                      className="h-[7px] w-[7px] rounded-[100%]"
                    ></div>
                  );
                }
              })}
            </div>
          </div>
          <div className="left-[-55.8%] h-[400px] w-full my-[1rem] flex relative">
            {carousolList.map((item, index) => {
              return (
                <div
                  ref={(el) => (sliderRefs.current[index] = el)}
                  className="min-w-[1350px] px-[10px] transition-all ease-linear duration-300  rounded-[5px] overflow-hidden"
                  key={index}
                >
                  <div
                    className="h-full w-full object-cover rounded-[10px]"
                    style={{
                      background: `url("${item}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="px-[15%]">
          <MovieCardsRow
            movierow={currentMovies}
            rowtitle="Recommended Movies"
          />
          <MovieCardsRow movierow={hotmovies} rowtitle="Hot Movies" />
          {/* <MovieCardsRow movierow={southMovies} rowtitle="South Indian Movies" /> */}
          <MovieCardsRow movierow={bengaliMovies} rowtitle="Bengali Movies" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
