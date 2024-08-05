import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

function HeaderSeatSelection({ movieDetail, theaterDetail, date, time }) {
  const navigate = useNavigate();
  function formatDate(date) {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    const monthList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${day} ${monthList[parseInt(month) - 1]}`;
  }
  return (
    <div className=" bg-black w-full py-[1rem] relative">
      <div className="text-white  text-[40px] absolute  cursor-pointer left-[20%] top-[25%]">
        <MdOutlineKeyboardArrowLeft
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
      <div className="">
        {movieDetail && theaterDetail && date && time ? (
          <>
            <p className="font-bold text-[22px] text-white text-center">
              {movieDetail.title} - {movieDetail.language[0]}
            </p>
            <p className="text-center text-white text-[15px]">
              <span>{formatDate(date)}</span>, <span>{time}</span> at{" "}
              <span>
                {theaterDetail.name}, {theaterDetail.location}
              </span>
            </p>
          </>
        ) : (
          <p className="text-center text-white text-[22px]">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default HeaderSeatSelection;
