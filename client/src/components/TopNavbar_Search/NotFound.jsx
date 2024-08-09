import React from "react";
import { IoTicketOutline } from "react-icons/io5";

function NotFound() {
  return (
    <div className="h-[500px] w-[60%] mt-[4rem]">
      <div className="rounded-[7px] p-[10px] pt-[35px] bg-[#ffffff] flex items-center justify-center flex-col gap-[1rem]">
        <IoTicketOutline className="text-[100px]" />
        <p className="mb-[-20px] font-[500] text-[17px]">Movie not found...</p>
      </div>
    </div>
  );
}

export default NotFound;
