import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

function Seat({
  row,
  seatNumber,
  available,
  seatid,
  setSelectedSeats,
  activeCategory,
  categoryname,
  selectedSeats,
  setactiveCategory,
  price,
}) {
  const [onselect, setOnselect] = useState(false);

  function handleOnclick() {
    if (selectedSeats.length < 10) {
      setOnselect((prev) => !prev);
      setactiveCategory({ categoryname, price });
    } else {
      toast.warning("Maximum 10 seats");
    }
  }

  useEffect(() => {
    if (activeCategory && activeCategory.categoryname !== categoryname) {
      setOnselect(false);
      setSelectedSeats([]);
    }
  }, [activeCategory, categoryname, setSelectedSeats]);

  useEffect(() => {
    if (onselect) {
      setSelectedSeats((prev) => [...prev, { seatNumber, seatid, row }]);
    } else {
      setSelectedSeats((prev) => prev.filter((seat) => seat.seatid !== seatid));
    }
  }, [onselect, seatNumber, seatid, row, setSelectedSeats]);

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
