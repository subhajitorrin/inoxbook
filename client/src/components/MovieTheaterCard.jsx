import React from "react";
import { MdOutlineDirections } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import { IoFastFoodOutline, IoCarSportOutline } from "react-icons/io5";
import { BiCoffee } from "react-icons/bi";
import MovieTimingCard from "./MovieTimingCard";
import { GoDotFill } from "react-icons/go";

function MovieTheaterCard() {
  return (
    <div className="min-h-[130px] border-b border-[#0000001f] flex ">
      <div className="w-[30%] flex flex-col gap-[1rem]">
        <p className="font-[500] text-[20px]">INOX SOUTH CITY</p>
        <div className="flex gap-[10px]">
          <button className="border border-[#00000040] flex items-center gap-[7px] text-[12px] px-[10px] py-[1px] rounded-[20px]">
            <MdOutlineDirections />
            Get Direction
          </button>
          <button className="border border-[#00000040] flex items-center gap-[7px] text-[12px] px-[10px] py-[1px] rounded-[20px]">
            <CiCircleInfo />
            Info
          </button>
        </div>
        <div className="flex gap-[15px] ">
          <p className="flex items-center gap-[5px] text-[green]">
            <span className="text-[20px]">
              <IoFastFoodOutline />
            </span>
            <span className="text-[12px]">Food</span>
          </p>
          <p className="flex items-center gap-[5px] text-[#9b7028]">
            <span className="text-[20px]">
              <BiCoffee />
            </span>
            <span className="text-[12px]">Coffee</span>
          </p>
          <p className="flex items-center gap-[5px] text-[#3588cc]">
            <span className="text-[20px]">
              <IoCarSportOutline />
            </span>
            <span className="text-[12px]">Parking</span>
          </p>
        </div>
      </div>
      <div className="w-[70%]  flex flex-col gap-[1rem] justify-center">
        <div className="w-full flex gap-[2rem] flex-wrap">
          <MovieTimingCard />
          <MovieTimingCard />
          <MovieTimingCard />
          <MovieTimingCard />
          <MovieTimingCard />
          <MovieTimingCard />
        </div>
        <p className="text-[12px] flex items-center gap-[5px] mb-[1rem]">
          <GoDotFill />
          Non-cancellable
        </p>
      </div>
    </div>
  );
}

export default MovieTheaterCard;
