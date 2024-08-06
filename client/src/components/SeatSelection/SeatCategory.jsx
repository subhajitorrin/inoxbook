import React, { useEffect, useState } from "react";
import Seat from "./Seat";

function SeatCategory({
  category,
  setSelectedCategory,
  setactiveCategory,
  activeCategory,
}) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (selectedSeats.length > 0) {
      setSelectedCategory(selectedSeats);
    }
  }, [selectedSeats]);

  return (
    <div className=" w-[100%] flex flex-col gap-[1rem]">
      <p className="text-[17px] font-bold uppercase text-center mt-[2rem]">
        {category.category}: &#8377;{category.price}
      </p>
      <div className="flex gap-[10px] flex-col">
        {category.seatrows.map((item, index) => {
          return (
            <div key={index} className="flex items-center">
              <p className="w-[50px] font-bold text-[17px]">{item.row}</p>
              <div className="flex gap-[10px]">
                {item.columns.map((s, i) => {
                  return (
                    <Seat
                      key={`${item.row}-${s.column}`}
                      row={item.row}
                      seatNumber={s.column}
                      available={!s.isBooked}
                      seatid={s.seatCode}
                      setSelectedSeats={setSelectedSeats}
                      categoryname={category.category}
                      activeCategory={activeCategory}
                      selectedSeats={selectedSeats}
                      setactiveCategory={setactiveCategory}
                      price={category.price}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SeatCategory;
