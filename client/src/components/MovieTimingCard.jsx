import React from "react";

function MovieTimingCard({ type, showtime, showid }) {
  return (
    <>
      <div className="font-[500] border border-[#00000040] inline-block px-[10px] py-[3px] rounded-[4px] cursor-pointer">
        <p className="text-[12px] text-center">{type}</p>
        <p className=" ">{showtime}</p>
      </div>
    </>
  );
}

export default MovieTimingCard;
