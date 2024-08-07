import React, { useEffect, useState } from "react";
import Seat from "./Seat";

function SeatCategory({
  category,
  setSelectedCategory,
  setactiveCategory,
  activeCategory,
  alreadyBookedList,
}) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [gaps, setGaps] = useState([]);

  useEffect(() => {
    console.log(gaps);
  }, [gaps]);

  useEffect(() => {
    if (category && category.gaps.length > 0) {
      setGaps(category.gaps);
    }
  }, [category]);

  useEffect(() => {
    if (selectedSeats.length > 0) {
      setSelectedCategory(selectedSeats);
    }
  }, [selectedSeats]);

  // useEffect(() => {
  //   if (alreadyBookedList.length > 0) console.log(alreadyBookedList);
  // }, [alreadyBookedList]);

  function checkIfSeatAlreadyBooked(row, col) {
    for (let i = 0; i < alreadyBookedList.length; i++) {
      const item = alreadyBookedList[i];
      if (item.row === row && item.seat === col) {
        return false;
      }
    }
    return true;
  }

  function getCountGap(n) {
    let count = 0;
    for (let i = 0; i < gaps.length; i++) {
      if (n === gaps[i]) {
        count++;
      }
    }
    return count;
  }

  return (
    <div className=" w-[100%] flex flex-col gap-[1rem] ">
      <p className="text-[17px] font-bold uppercase text-center mt-[2rem]">
        {category.category}: &#8377;{category.price}
      </p>
      <div className="flex gap-[10px] flex-col ">
        {category.seatrows.map((item, index) => {
          return (
            <div key={index} className="flex items-center ">
              <p className="w-[50px] font-bold text-[17px] ">{item.row}</p>
              <div className="flex gap-[10px]">
                {item.columns.map((s, i) => {
                  return (
                    <span key={i}>
                      {getCountGap(i) > 0 ? (
                        <div className="flex gap-[10px]">
                          {Array.from({ length: getCountGap(i) }).map(
                            (ix, indx) => {
                              return (
                                <div
                                  key={`${indx}-${i}`}
                                  className="h-[28px] w-[28px] mt-[3px] m-[3px]"
                                ></div>
                              );
                            }
                          )}
                          <Seat
                          key={`${item.row}-${s.column}`}
                          row={item.row}
                          seatNumber={s.column}
                          available={checkIfSeatAlreadyBooked(
                            item.row,
                            s.column
                          )}
                          seatid={s.seatCode}
                          setSelectedSeats={setSelectedSeats}
                          categoryname={category.category}
                          activeCategory={activeCategory}
                          selectedSeats={selectedSeats}
                          setactiveCategory={setactiveCategory}
                          price={category.price}
                        />
                        </div>
                      ) : (
                        <Seat
                          key={`${item.row}-${s.column}`}
                          row={item.row}
                          seatNumber={s.column}
                          available={checkIfSeatAlreadyBooked(
                            item.row,
                            s.column
                          )}
                          seatid={s.seatCode}
                          setSelectedSeats={setSelectedSeats}
                          categoryname={category.category}
                          activeCategory={activeCategory}
                          selectedSeats={selectedSeats}
                          setactiveCategory={setactiveCategory}
                          price={category.price}
                        />
                      )}
                    </span>
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
