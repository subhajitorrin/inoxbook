import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { MdArrowDropDown } from "react-icons/md";
import axios from "axios";

function ScheduleCard({
  allMovies,
  isDelete,
  item,
  settoggleUpdateSchedule,
  isDeleteBtn,
}) {
  const [toggleSelectMovie, setToggleSelectMovie] = useState(false);
  const [date, setdate] = useState(null);
  const [startTime, setstartTime] = useState(null);
  const [endTime, setendTime] = useState(null);
  const [movie, setMovie] = useState({ movieId: "", title: "", duration: "" });
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [toggleScreen, setToggleScreen] = useState(false);
  const [screenList, setscreenList] = useState([]);
  const [boolScreenList, setBoolScreenList] = useState([true, true, true]);

  useEffect(() => {
    async function fetchAllScreensByTheater() {
      try {
        const theaterid = localStorage.getItem("theaterId");
        console.log(theaterid);
        if (!theaterid) return;

        const res = await axios.get(
          `http://localhost:5000/getallscreens/${theaterid}`
        );

        if (res.status === 200) {
          res.data.forEach((item, index) => {
            const obj = {
              scrName: item.name,
              scrId: item._id,
            };
            setscreenList((prev) => [...prev, obj]);
          });
        } else {
          console.error(`Unexpected response status: ${res.status}`);
        }
      } catch (error) {
        console.error("Error while fetching screens", error);
      }
    }

    fetchAllScreensByTheater();
  }, []);

  useEffect(() => {
    if (isDelete) {
      setdate(item.date);
      setstartTime(item.startTime);
      setendTime(item.endTime);
      setSelectedScreen(item.screen);
      const matchMovie = allMovies.find((mov) => mov._id === item.movie);
      if (matchMovie) {
        setMovie({
          movieId: matchMovie._id,
          title: matchMovie.title,
          duration: matchMovie.duration,
        });
      }
    }
  }, [isDelete, item, allMovies]);

  function handleDateTimeChange(key, value) {
    if (key === "date") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (value >= today) {
        setdate(value);
      } else {
        toast.warning("Don't select past date");
      }
      if (startTime) {
        const startDateTime = new Date(value);
        startDateTime.setHours(startTime.getHours());
        startDateTime.setMinutes(startTime.getMinutes());
        setstartTime(startDateTime);
      }
      if (endTime) {
        const endDateTime = new Date(value);
        endDateTime.setHours(endTime.getHours());
        endDateTime.setMinutes(endTime.getMinutes());
        setendTime(endDateTime);
      }
    } else if (key === "startTime") {
      if (movie) {
        setendTime(addMinutes(value, movie.duration));
      }
      if (date) {
        const startDateTime = new Date(date);
        startDateTime.setHours(value.getHours());
        startDateTime.setMinutes(value.getMinutes());
        setstartTime(startDateTime);
      }
      if (!movie || !date) {
        setstartTime(value);
      }
    }
  }

  function formatMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}hr ${mins}m`;
  }

  async function handleScheduleDelete() {
    try {
      const res = await axios.delete(
        `http://localhost:5000/admin/deleteschedule/${item._id}`
      );
      if (res.status === 200) {
        toast.success("Schedule Deleted");
        settoggleUpdateSchedule((prev) => !prev);
      }
    } catch (error) {
      console.log("Error while deleted schedule", error);
      toast.warning("Schedule delete error");
    }
  }

  async function handleScheduleAdd() {
    if (date && startTime && selectedScreen && endTime) {
      console.log({
        screen: selectedScreen,
        movie: movie.movieId,
        date,
        startTime,
        endTime,
        nextShowTime: endTime,
      });

      try {
        const response = await axios.post(
          "http://localhost:5000/admin/addschedule",
          {
            screen: selectedScreen,
            movie: movie.movieId,
            date,
            startTime,
            endTime,
            nextShowTime: endTime,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Schedule added");
          settoggleUpdateSchedule((prev) => !prev);
        }
      } catch (error) {
        console.log("Error while fetching schedules", error);
      }
    } else {
      toast.warning("Fill all the fields");
    }
  }

  function handleSelectMovie(item) {
    setMovie({ movieId: item._id, title: item.title, duration: item.duration });
    setToggleSelectMovie(false);
    if (startTime) {
      setendTime(addMinutes(startTime, item.duration));
    }
  }

  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  async function getSchedulesByDate(date) {
    const response = await axios.get(
      `http://localhost:5000/admin/getschedulesbydate/${date}`
    );
    if (response.status === 200) {
      return response.data.schedules;
    } else {
      return null;
    }
  }

  async function isScreenAvailable(sch, date, sTime, eTime) {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/getscreenavailability",
        {
          screen: sch,
          date,
          startTime: sTime,
          endTime: eTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return true;
      }
      if (response.status === 201) {
        return false;
      }
    } catch (error) {
      console.log("Error while fetching screen availability", error);
    }
    return false;
  }

  useEffect(() => {
    async function updateScreenAvailability() {
      const waitForPromise = await Promise.all(
        screenList.map(async (item, index) => {
          const response = await isScreenAvailable(
            item.scrName,
            date,
            startTime,
            endTime
          );
          return response;
        })
      );
      setBoolScreenList(waitForPromise);
    }
    if (date && endTime && startTime && movie.movieId != "" && !isDelete)
      updateScreenAvailability();
  }, [date, startTime, movie]);

  return (
    <div className=" w-full flex text-[17px]  pb-[1rem] rounded-[5px] border-b border-[#ffffff38] ">
      <div
        style={{
          opacity: isDelete ? "0.5" : "1",
          pointerEvents: isDelete ? "none" : "auto",
        }}
        className="w-[16.6666666667%]  text-center"
      >
        <DatePicker
          className="w-[150px] text-center py-[5px] rounded-[5px] cursor-pointer "
          selected={date}
          onChange={(date) => handleDateTimeChange("date", date)}
          placeholderText="Select a date"
          dateFormat="dd/MM/yyyy"
          minTime="10:00"
          maxTime="23:59"
        />
      </div>
      <div
        style={{
          opacity: isDelete ? "0.5" : "1",
          pointerEvents: isDelete ? "none" : "auto",
        }}
        className="w-[16.6666666667%]  text-center"
      >
        <DatePicker
          className="w-[150px] text-center py-[5px] rounded-[5px] cursor-pointer"
          selected={startTime}
          showTimeSelect
          showTimeSelectOnly
          onChange={(t) => handleDateTimeChange("startTime", t)}
          placeholderText="Select Time"
          timeIntervals={15}
          dateFormat="h:mm aa"
          minTime={new Date().setHours(10, 0)} // Set min time to 10:00 AM
          maxTime={new Date().setHours(21, 0)} // Set max time to 09:00 PM
        />
      </div>
      <div
        style={{
          opacity: isDelete ? "0.5" : "1",
          pointerEvents: isDelete ? "none" : "auto",
        }}
        className="w-[16.6666666667%]  text-center"
      >
        <DatePicker
          className="w-[150px] text-center py-[5px] rounded-[5px] cursor-pointer pointer-events-none opacity-[.5]"
          selected={endTime}
          showTimeSelect
          showTimeSelectOnly
          placeholderText="Select Time"
          timeIntervals={15}
          dateFormat="h:mm aa"
        />
      </div>
      <div
        style={{
          opacity: isDelete ? "0.5" : "1",
          pointerEvents: isDelete ? "none" : "auto",
        }}
        className="w-[16.6666666667%]  text-center flex justify-center relative"
      >
        <span
          onClick={() => {
            if (!date || !startTime || movie.title == "") {
              if (!date) toast.warn("Select date");
              if (!startTime) toast.warn("Select start time");
              if (movie.title == "") toast.warn("Select movie");
              return;
            }
            setToggleScreen((prev) => !prev);
          }}
          className="border border-white relative w-[150px] text-center py-[5px] rounded-[5px] cursor-pointer flex justify-center gap-[10px] items-center"
        >
          {selectedScreen ? (
            <span>{selectedScreen}</span>
          ) : (
            <span className="flex">
              <span>Screen</span>{" "}
              <MdArrowDropDown className="text-[25px] absolute right-[12px]" />
            </span>
          )}
        </span>
        {toggleScreen && (
          <div className="absolute w-[100px] bg-white right-[25%] rounded-[10px] top-[110%] overflow-hidden">
            {screenList.map((item, index) => {
              return (
                <p
                  style={{
                    backgroundColor: boolScreenList[index] ? "white" : "grey",
                    pointerEvents: boolScreenList[index] ? "auto" : "none",
                  }}
                  key={index}
                  className="text-black p-[1rem] cursor-pointer "
                  onClick={() => {
                    setSelectedScreen(item.scrName);
                    setToggleScreen(false);
                  }}
                >
                  {item.scrName}
                </p>
              );
            })}
          </div>
        )}
      </div>
      <div
        style={{
          opacity: isDelete ? "0.5" : "1",
          pointerEvents: isDelete ? "none" : "auto",
        }}
        className="w-[25%]  text-center relative flex items-center justify-center rounded-[5px] gap-[1rem] "
      >
        <div
          onClick={() => {
            setToggleSelectMovie((prev) => !prev);
          }}
          className="cursor-pointer w-[90%] flex justify-between border border-white py-[5px] rounded-[5px] px-[2rem] items-center"
        >
          {movie.title == "" ? (
            <span className="flex items-center justify-between w-full px-[15%] relative">
              <span className="w-full">Select Movie</span>{" "}
              <MdArrowDropDown className="text-[25px] absolute right-0" />
            </span>
          ) : (
            <p className="text-white text-center w-full">{movie.title}</p>
          )}
        </div>
        {toggleSelectMovie && (
          <div className=" h-[600px] overflow-auto w-[350px] absolute right-[5%] top-[110%] bg-white text-black rounded-[7px] ">
            {allMovies.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    handleSelectMovie(item);
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
                    <p className="text-start w-full ">
                      {item.title} •{" "}
                      <span className="text-[12px] relative top-[-2px]">
                        {item.CBFCratnig}
                      </span>
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
      <div className="w-[7%] text-center">
        {isDelete ? (
          <button
            style={{
              backgroundColor: "red",
              pointerEvents: isDeleteBtn ? "auto" : "none",
              opacity: isDeleteBtn ? "1" : ".5",
            }}
            onClick={handleScheduleDelete}
            className="px-[1rem] py-[7px] rounded-[7px] text-[15px] font-[500] "
          >
            <span>Delete</span>
          </button>
        ) : (
          <button
            onClick={handleScheduleAdd}
            className="px-[1rem] py-[7px] bg-[green]  rounded-[7px] text-[15px] font-[500] "
          >
            <span>add</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default ScheduleCard;
