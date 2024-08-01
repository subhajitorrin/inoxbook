import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { MdArrowDropDown } from "react-icons/md";

function ScheduleCard({ allMovies }) {
  const [toggleSelectMovie, setToggleSelectMovie] = useState(false);
  const [date, setdate] = useState(null);
  const [startTime, setstartTime] = useState(null);
  const [endTime, setendTime] = useState(null);
  const [movie, setMovie] = useState({ movieId: "", title: "" });
  function handleDateSelect(selectedDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate >= today) {
      setdate(selectedDate);
      console.log(selectedDate);
    } else {
      toast.warning("Don't select past date");
    }
  }
  function handleStartTimeSelect(time) {
    setstartTime(time);
  }
  function handleEndTimeSelect(time) {
    setendTime(time);
  }

  function formatMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}hr ${mins}m`;
  }

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  return (
    <div className=" w-full flex text-[17px] border border-white py-[1rem] rounded-[5px]">
      <div className="w-[16.6666666667%]  text-center">
        <DatePicker
          className="w-[150px] text-center py-[5px] rounded-[5px] cursor-pointer "
          selected={date}
          onChange={handleDateSelect}
          placeholderText="Select a date"
        />
      </div>
      <div className="w-[16.6666666667%]  text-center">
        <DatePicker
          className="w-[150px] text-center py-[5px] rounded-[5px] cursor-pointer"
          selected={startTime}
          showTimeSelect
          showTimeSelectOnly
          onChange={handleStartTimeSelect}
          placeholderText="Select Time"
          timeIntervals={15}
        />
      </div>
      <div className="w-[16.6666666667%]  text-center">
        <DatePicker
          className="w-[150px] text-center py-[5px] rounded-[5px] cursor-pointer"
          selected={endTime}
          showTimeSelect
          showTimeSelectOnly
          onChange={handleEndTimeSelect}
          placeholderText="Select Time"
          timeIntervals={15}
        />
      </div>
      <div className="w-[16.6666666667%]  text-center">Screen</div>
      <div className="w-[16.6666666667%]  text-center relative flex items-center justify-center rounded-[5px] gap-[1rem] ">
        <div
          onClick={() => {
            setToggleSelectMovie((prev) => !prev);
          }}
          className="cursor-pointer w-[90%] flex justify-between border border-white py-[5px] rounded-[5px] px-[2rem] items-center"
        >
          {movie.title == "" ? (
            <span className="flex items-center">
              Select Movie <MdArrowDropDown className="text-[25px]" />
            </span>
          ) : (
            <span className="text-white">
              {movie.title.length > 10 ? (
                <span> {movie.title.slice(0, 10)}...</span>
              ) : (
                movie.title
              )}
            </span>
          )}
        </div>
        {toggleSelectMovie && (
          <div className=" h-[600px] overflow-auto w-[350px] absolute right-[5%] top-[110%] bg-white text-black rounded-[7px] ">
            {allMovies.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setMovie({ movieId: item._id, title: item.title });
                    setToggleSelectMovie(false);
                  }}
                  className="hover:bg-[#cbcbcb] flex items-center justify-between p-[1rem] gap-[1rem] my-[1rem] cursor-pointer"
                >
                  <div className="h-[100px]">
                    <img
                      src={item.posterUrl}
                      alt=""
                      className="h-full object-cover w-[100px] rounded-[7px]"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-start w-full">
                      {item.title} •{" "}
                      <span className="text-[12px]">{item.CBFCratnig}</span>
                    </p>
                    <p className="text-[12px] text-start">
                      {formatMinutesToHours(item.duration)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="w-[16.6666666667%]  text-center">
        <button className="px-[1rem] py-[7px] bg-[green]  rounded-[7px] text-[15px] font-[500]">
          Add Schedule
        </button>
      </div>
    </div>
  );
}

export default ScheduleCard;
