import React from "react";
import { Link } from "react-router-dom";
import { MdOpenInNew } from "react-icons/md";

function SearchCards({ item, setMovieName }) {
  function formatMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}hr ${mins}m`;
  }

  return (
    <Link to={`moviedetail/${item._id}`}>
      <div
        onClick={() => {
          setMovieName("");
        }}
        className="hover:bg-[#d3d3d3] relative transition-all ease-linear duration-200 hover:border-transparent border-b border-[#00000039] rounded-[7px] py-[10px] px-[2rem] flex gap-[20px] items-start cursor-pointer"
      >
        <div className="h-[200px] w-[130px] rounded-[5px] overflow-hidden">
          <img
            src={item.posterUrl}
            alt=""
            className=" h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-[3px]">
          <p className="text-[17px]">
            {item.title} •{" "}
            <span className="text-[.9rem]">{item.CBFCratnig}</span>
          </p>
          <p>
            <span className="">IMDB</span>
            {item.rating}
          </p>
          <p className="text-[15px]">{item.releaseDate}</p>
          <div className="flex gap-[10px]">
            {item.genre.map((gen, i) => {
              return (
                <p
                  key={`${i}`}
                  className="border border-black text-center px-[10px] py-[3px] rounded-[5px]"
                >
                  {gen}
                </p>
              );
            })}
          </div>
          <div className="flex gap-[10px]">
            {item.language.map((lan, i) => {
              return (
                <p key={`${i}`} className="">
                  {lan}
                </p>
              );
            })}
          </div>
          <p>{formatMinutesToHours(item.duration)}</p>
        </div>
        <div className="h-full absolute right-0 flex items-center mr-[2rem]">
          <MdOpenInNew className="text-[20px]" />
        </div>
      </div>
    </Link>
  );
}

export default SearchCards;
