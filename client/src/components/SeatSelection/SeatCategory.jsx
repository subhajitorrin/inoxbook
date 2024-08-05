import React, { useEffect } from "react";
import Seat from "./Seat";

function SeatCategory({ category }) {
  useEffect(() => {
    if (category) console.log(category);
  }, [category]);
  return (
    <div className="border border-black w-[60%]">
      <p className="text-[17px] font-bold uppercase text-center">
        {category.name}: &#8377;{category.price}
      </p>
      <div className="flex gap-[10px]">
        {Array.from({ length: category.seats }, (_, index) => (
          <Seat key={index} available={true} seatNumber={index + 1} />
        ))}
      </div>
    </div>
  );
}

export default SeatCategory;
