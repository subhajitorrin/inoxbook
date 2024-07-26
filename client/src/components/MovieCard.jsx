import React from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { GoInfo } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function MovieCard({ id, title, img, languages, rating }) {
  const navigate = useNavigate();
  function handleCardClick(e) {
    if (e.target.tagName.toLowerCase() === "button") {
      navigate(`/bookticket/${id}`);
    } else {
      navigate(`/movieinsights/${id}`);
    }
  }
  return (
    <div
      className="h-[550px] min-w-[240px] cursor-pointer select-none "
      onClick={handleCardClick}
    >
      <div className="h-[400px] w-full rounded-[10px] overflow-hidden mb-[5px]">
        <img src={img} className="h-full w-full object-cover" />
      </div>
      <div className="font-bold text-[15px]">{title}</div>
      <div className="flex gap-[5px] items-center">
        <MdOutlineStarPurple500 className="text-[#da4b63]" />
        {rating}/10
      </div>
      <div className="font-[500] text-[15px] flex gap-[10px]">
        {languages.map((item, index) => {
          return index > 2 ? "" : <p key={index}>{item}</p>;
        })}
      </div>
      <div className="flex justify-between items-center  mt-[15px]">
        <button className="bg-[#da4b63] text-white hover:bg-[#b94155] transition-all duration-200 ease-linear  font-[500] w-[80%] cursor-pointer py-[5px] rounded-[5px]">
          Book Ticket
        </button>
        <div className="hover:bg-[#e9e9e9] transition-all duration-200 ease-linear border border-[#00000032] h-[35px] w-[35px] text-[20px] flex items-center justify-center rounded-[10px] text-[#b94155]">
          <GoInfo />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
