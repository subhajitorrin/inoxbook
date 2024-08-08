import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { GoChevronLeft } from "react-icons/go";

function MovieCardsRow({ movierow, rowtitle }) {
  const [isVisibleLeft, setIsVisibleLeft] = useState(false);
  const [isVisibleRight, setIsVisibleRight] = useState(true);

  const wrapperRef = useRef(null);
  function handleSlideRight() {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({
        left: wrapperRef.current.scrollLeft + 1360,
        behavior: "smooth",
      });
    }
  }
  function handleSlideLeft() {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({
        left: wrapperRef.current.scrollLeft - 1360,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    function updateVisibility() {
      if (wrapperRef.current) {
        const scrollLeft = wrapperRef.current.scrollLeft;
        const scrollWidth = wrapperRef.current.scrollWidth;
        const clientWidth = wrapperRef.current.clientWidth;

        setIsVisibleLeft(scrollLeft > 0);
        setIsVisibleRight(scrollLeft < scrollWidth - clientWidth);
      }
    }
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener("scroll", updateVisibility);
    }

    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener("scroll", updateVisibility);
      }
    };
  }, []);

  return (
    <div className="select-none mt-[1rem] relative">
      {isVisibleLeft && (
        <div
          onClick={handleSlideLeft}
          className="text-white cursor-pointer bg-[#79797980] flex top-[37%] left-[-3%] items-center justify-center absolute h-[40px] w-[40px] rounded-[6px]"
        >
          <GoChevronLeft className="text-[30px] " />
        </div>
      )}

      {isVisibleRight && (
        <div
          onClick={handleSlideRight}
          className="text-white rotate-[180deg] cursor-pointer bg-[#79797980] flex top-[37%] right-[-3%] items-center justify-center absolute h-[40px] w-[40px] rounded-[6px]"
        >
          <GoChevronLeft className="text-[30px] " />
        </div>
      )}

      <div className="font-bold text-[20px] mb-[10px]">
        <p>{rowtitle}</p>
      </div>
      <div
        ref={wrapperRef}
        className="transition-all ease-linear duration-200 scrollNone flex gap-[2rem] w-full overflow-y-hidden"
      >
        {movierow.map((item, index) => {
          return (
            <MovieCard
              key={index}
              id={item._id}
              title={item.title}
              languages={item.language}
              rating={item.rating}
              img={item.posterUrl}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MovieCardsRow;
