import React from "react";

function SeatFlagHeader() {
  return (
    <div className="flex justify-between items-center w-[60%]">
      {/* two line timing and weekday */}
      <div className="font-bold">
        <div className="text-[20px]">
          <p className="text-[#878787] text-[15px]">{"Mon"}</p>
          <p className="text-[18px] mt-[-5px]">
            {5} {"Aug"}
          </p>
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
