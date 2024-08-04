import axios from "axios";
import React, { useEffect, useState } from "react";
import ScheduleCard from "./ScheduleCard";

function Schedule() {
  const [allSchedules, setallSchedules] = useState([]);
  const [allMovies, setallMovies] = useState([]);
  const [toggleUpdateSchedule, settoggleUpdateSchedule] = useState(false);
  const [dateSlots, setDateSlots] = useState([]);
  useEffect(() => {
    async function getAllSchedules() {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/getschedules"
        );
        if (response.status === 200) {
          const setOfDates = [
            ...new Set(response.data.schedules.map((sch) => sch.date)),
          ];
          let datesArr = [];
          for (const item of setOfDates) {
            const res = await getSchedulesByDate(item);
            const obj = {
              date: item,
              schedules: res,
            };
            datesArr.push(obj);
          }
          datesArr.sort((a, b) => new Date(a.date) - new Date(b.date));
          setDateSlots(datesArr);
          setallSchedules(response.data.schedules);
        }
      } catch (error) {
        console.log("Error while fetching schedules", error);
      }
    }
    getAllSchedules();
  }, [toggleUpdateSchedule]);

  async function getSchedulesByDate(date) {
    const response = await axios.get(
      `http://localhost:5000/admin/getschedulesbydate/${date}`
    );
    if (response.status === 200) {
      // console.log("schedules by date", response.data.schedules);
      return response.data.schedules;
    } else {
      return null;
    }
  }

  useEffect(() => {
    async function fetchCurrentMovies() {
      try {
        const res = await axios.get("http://localhost:5000/getallmovies");
        setallMovies(res.data.allMovies);
      } catch (error) {
        console.log("Error while fetching currentmoves", error);
      }
    }
    fetchCurrentMovies();
  }, []);

  function formatDate(input) {
    const inputDate = new Date(input);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = inputDate.getDate();
    const month = monthNames[inputDate.getMonth()];
    const year = inputDate.getFullYear();
    return `${day} ${month} ${year}`;
  }

  return (
    <div className="h-full w-full p-[2.5%] flex flex-col gap-[1rem]">
      <div className="w-full flex text-[17px] font-[500] border-b border-[#ffffff38] pb-[1rem]">
        <div className="w-[16.6666666667%] text-center">Date</div>
        <div className="w-[16.6666666667%] text-center">Start Time</div>
        <div className="w-[16.6666666667%] text-center">End Time</div>
        <div className="w-[16.6666666667%] text-center">Screen</div>
        <div className="w-[25%] text-center">Movie</div>
        <div className="w-[7%] text-center"></div>
      </div>
      <div className="">
        <ScheduleCard
          allMovies={allMovies}
          settoggleUpdateSchedule={settoggleUpdateSchedule}
        />
      </div>
      <p className="w-full text-center font-[500] text-[17px] ">
        Already Scheduled
      </p>
      <div className="w-full flex flex-col gap-[2rem] overflow-y-auto py-[2rem] scrollNone">
        {dateSlots.map((item, index) => {
          return (
            <div key={`${index}-1`} className="flex flex-col gap-[1rem]">
              <p>{formatDate(item.date)}</p>
              <div className="flex flex-col gap-[1rem]">
                {item.schedules.map((sch, i) => {
                  return (
                    <ScheduleCard
                      key={i}
                      allMovies={allMovies}
                      isDelete={true}
                      item={sch}
                      isDeleteBtn={i == item.schedules.length - 1}
                      settoggleUpdateSchedule={settoggleUpdateSchedule}
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

export default Schedule;
