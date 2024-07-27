import React, { useEffect, useState } from "react";

function MovieDateCard({ date, isSelected, onClick }) {
  const [timingobj, setTimingobj] = useState({
    weekday: "",
    month: "",
    day: "",
  });

  function formatDate(dateInput) {
    const date = new Date(dateInput);
    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const weekday = weekdays[date.getUTCDay()];
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();

    setTimingobj({
      weekday: weekday,
      month: month,
      day: day,
    });
  }

  useEffect(() => {
    if (date) {
      formatDate(date);
    }
  }, [date]);

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? "#da4b63" : "transparent",
        color: isSelected ? "white" : "black",
      }}
      className="text-white select-none font-[500] rounded-[5px] h-[65px] w-[55px] cursor-pointer leading-[100%] flex flex-col items-center justify-center gap-[3px]"
    >
      <p className="text-[11px]">{timingobj.weekday}</p>
      <p className="text-[22px]">{timingobj.day}</p>
      <p className="text-[11px] mt-[2px]">{timingobj.month}</p>
    </div>
  );
}

export default MovieDateCard;
