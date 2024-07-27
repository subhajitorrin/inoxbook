import React from "react";
import { useNavigate } from "react-router-dom";

function MovieTimingCard({ type, showtime, showid, theaterId, movieId }) {
  const navigate = useNavigate();
  return (
    <div
      className="font-[500] border border-[#00000040] inline-block px-[10px] py-[3px] rounded-[4px] cursor-pointer"
      onClick={() => {
        navigate(`/seatmatrix/${movieId}-${showid}-${theaterId}`);
      }}
    >
      <p className="text-[12px] text-center">{type}</p>
      <p className=" ">{showtime}</p>
    </div>
  );
}

export default MovieTimingCard;
