import axios from "axios";
import React, { useEffect, useState } from "react";
import ScheduleCard from "./ScheduleCard";

function Schedule() {
  const [allSchedules, setallSchedules] = useState([]);
  useEffect(() => {
    async function getAllSchedules() {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/getschedules"
        );
        if (response.status === 200) {
          setallSchedules(response.data.schedules);
          console.log(response.data.schedules);
        }
      } catch (error) {
        console.log("Error while fetching schedules", error);
      }
    }
    getAllSchedules();
  }, []);
  return (
    <div className="h-full w-full p-[2.5%] flex flex-col gap-[1rem]">
      <div className="w-full flex text-[17px] font-[500] border-b border-white pb-[1rem]">
        <div className="w-[16.6666666667%]  text-center">Date</div>
        <div className="w-[16.6666666667%]  text-center">Start Time</div>
        <div className="w-[16.6666666667%]  text-center">End Time</div>
        <div className="w-[16.6666666667%]  text-center">Screen</div>
        <div className="w-[16.6666666667%]  text-center">Movie</div>
        <div className="w-[16.6666666667%]  text-center">Next Show Time</div>
      </div>
      <div className="">
        <ScheduleCard />
      </div>
      <div className="w-full flex justify-center">
        <button className="px-[1rem] py-[10px] bg-[green] rounded-[7px]">
          Add Schedule
        </button>
      </div>
    </div>
  );
}

export default Schedule;
