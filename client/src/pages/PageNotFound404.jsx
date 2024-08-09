import React from "react";
import { IoTicketOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

function PageNotFound404() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center select-none">
      <div className="">
        <div className="flex gap-[10px] items-center">
          <p className="text-[200px] font-[500]">4</p>{" "}
          <IoTicketOutline className="text-[150px]" />
          <p className="text-[200px] font-[500] ml-[-20px]">4</p>
        </div>
        <p className="text-center text-[30px] font-[500] mt-[-40px]">
          Page not found
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="relative flex gap-[10px] items-center mt-[20px] py-[10px] px-[2rem] rounded-[7px] bg-[#da4b63] text-white font-[500]"
          >
            <FaChevronLeft className="text-[10px] absolute left-[10px]" />
            Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound404;
