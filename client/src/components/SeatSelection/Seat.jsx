import React, { useRef, useState } from "react";

function Seat({
  seatNumber,
  available,
  seatid,
  setIsSeatSelected,
  alreadySelected,
  setdisplaySeatWarning,
}) {
  const [onselect, setOnselect] = useState(false);
  function handleOnclick(){
    
  }

  return available ? (
    <div
      onClick={handleOnclick}
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
