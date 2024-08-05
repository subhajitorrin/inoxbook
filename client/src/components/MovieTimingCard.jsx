import React from "react";
import { useNavigate } from "react-router-dom";

function MovieTimingCard({
  type,
  showtime,
  scheduleId,
  theaterId,
  movieId,
  date,
}) {
  const navigate = useNavigate();
  function removeDashes(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== "-") {
        result += str[i];
      }
    }
    return result.slice(0, 8);
  }

  function formatTime(time) {
    const istTime = convertToISTAnd12HourFormat(time);
    return istTime
  }

  function convertToISTAnd12HourFormat(isoString) {
    // Create a new Date object from the ISO string
    const date = new Date(isoString);

    // Convert the time to IST (UTC+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const istDate = new Date(date.getTime() + istOffset);

    // Extract the hours and minutes
    let hours = istDate.getUTCHours();
    const minutes = istDate.getUTCMinutes();

    // Determine AM or PM suffix
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format minutes to always have two digits
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // Return the formatted time string
    return `${hours}:${formattedMinutes} ${ampm}`;
  }

  return (
    <div
      className="font-[500] border border-[#00000040] inline-block px-[10px] py-[3px] rounded-[4px] cursor-pointer"
      onClick={() => {
        navigate(
          `/seatmatrix/${movieId}-${scheduleId}-${theaterId}-${removeDashes(
            date
          )}-${formatTime(showtime)}`
        );
      }}
    >
      <p className="text-[12px] text-center">{type}</p>
      <p className=" ">{convertToISTAnd12HourFormat(showtime)}</p>
    </div>
  );
}

export default MovieTimingCard;
