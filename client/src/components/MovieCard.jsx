import React from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";

function MovieCard({ title, img, languages, rating }) {
  return (
    <div className="h-[550px] min-w-[240px] cursor-pointer select-none ">
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
          return index > 2 ? "" : <p>{item}</p>;
        })}
      </div>
      <button className="bg-[#da4b63] text-white hover:bg-[#b94155] transition-all duration-200 ease-linear mt-[15px] font-[500] w-full cursor-pointer py-[5px] rounded-[5px]">
        Book Ticket
      </button>
    </div>
  );
}

export default MovieCard;
