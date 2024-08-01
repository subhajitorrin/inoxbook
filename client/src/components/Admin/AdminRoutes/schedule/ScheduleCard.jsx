import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

function ScheduleCard() {
  const [date, setdate] = useState(null);
  const [startTime, setstartTime] = useState(null);
  const [endTime, setendTime] = useState(null);
  const [nextTime, setNextTime] = useState(null);
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
  return (
    <div className=" w-full flex text-[17px] font-[500] border border-white py-[1rem] rounded-[5px]">
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
          placeholderText="Select Time"
          timeIntervals={15}
        />
      </div>
      <div className="w-[16.6666666667%]  text-center">Screen</div>
      <div className="w-[16.6666666667%]  text-center">Movie</div>
      <div className="w-[16.6666666667%]  text-center">
        <DatePicker
          className="w-[150px] text-center py-[5px] rounded-[5px] pointer-events-none"
          selected={nextTime}
          showTimeSelect
          showTimeSelectOnly
          placeholderText="Next Show Time"
          timeIntervals={15}
        />
      </div>
    </div>
  );
}

export default ScheduleCard;
