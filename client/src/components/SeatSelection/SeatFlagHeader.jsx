import React, { useEffect } from "react";

function SeatFlagHeader({ date }) {
  function formatDate(date) {
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

  function getWeekday(date) {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6) - 1;
    const day = date.slice(6, 8);
    const dateObj = new Date(year, month, day);
    const weekdayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekdayList[dateObj.getDay()];
  }

  return (
    <div className="flex justify-between items-center w-[60%]">
      {/* two line timing and weekday */}
      <div className="font-bold">
        <div className="text-[20px]">
          <p className="text-[#878787] text-[15px]">
            {date && getWeekday(date)}
          </p>
          <p className="text-[18px] mt-[-5px]">{date && formatDate(date)}</p>
        </div>
      </div>
      {/* Seat flags */}
      <div className="flex gap-[30px]">
        <div className="flex gap-[10px] items-center">
          <div className="h-[20px] w-[20px] bg-transparent border border-black rounded-[3px]"></div>
          <p className="font-[500]">Available</p>
        </div>
        <div className="flex gap-[10px] items-center">
          <div className="h-[20px] w-[20px] bg-[#d3d3d3] rounded-[3px] border border-transparent"></div>
          <p className="font-[500]">Booked</p>
        </div>
        <div className="flex gap-[10px] items-center">
          <div className="h-[20px] w-[20px] bg-black rounded-[3px]"></div>
          <p className="font-[500]">Selected</p>
        </div>
      </div>
    </div>
  );
}

export default SeatFlagHeader;
