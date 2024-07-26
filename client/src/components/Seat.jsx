import React, { useState } from "react";

function Seat({ seatNumber, available }) {
  const [onselect, setOnselect] = useState(false);
  return available ? (
    <div
      onClick={() => {
        setOnselect((prev) => !prev);
      }}
      style={{
        backgroundColor: onselect ? "black" : "",
        color: onselect ? "white" : "",
      }}
      className="hover:bg-black hover:text-white select-none m-[3px] transition-all duration-200 ease-linear cursor-pointer border border-black h-[28px] w-[28px] rounded-[4px] flex items-center justify-center"
    >
      <p className="font-bold text-[11px]">{seatNumber}</p>
    </div>
  ) : (
    <div className="bg-[#c8c8c8] pointer-events-none opacity-[0.5] select-none m-[3px] transition-all duration-200 ease-linear cursor-pointer border border-transparent h-[28px] w-[28px] rounded-[4px] flex items-center justify-center">
      <p className="font-bold text-[11px]">{seatNumber}</p>
    </div>
  );
}

export default Seat;
