import React from "react";
import MovieCard from "./MovieCard";

function MovieCardsRow({ movierow, rowtitle }) {
  return (
    <div className="mt-[1rem]">
      <div className="font-bold text-[20px] mb-[10px]">
        <p>{rowtitle}</p>
      </div>
      <div className="flex gap-[2rem] w-full overflow-y-hidden">
        {movierow.map((item, index) => {
          return (
            <MovieCard
            key={index}
              id={item.id}
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
