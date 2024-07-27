import React from "react";
import { IoIosSearch } from "react-icons/io";
import { RiArrowDropDownFill } from "react-icons/ri";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoTicketOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="select-none flex justify-between items-center text-[14px] font-[500] py-[1rem] px-[15%]">
      <div
        className="flex items-center text-[20px] cursor-pointer"
        onClick={() => {
          navigate(`/`);
        }}
      >
        INOX{" "}
        <div className="text-[30px]">
          <IoTicketOutline />
        </div>{" "}
        BOOK
      </div>
      <div className="border border-[#bcbcbc] rounded-[20px] items-center flex h-[40px]">
        <input
          type="text"
          name=""
          id=""
          className="w-[500px] h-full outline-none px-[20px] rounded-l-[20px]"
          placeholder="Search movie to watch in theater..."
        />
        <button className="text-[#bcbcbc] text-[20px] items-center w-[40px] flex justify-center">
          <IoIosSearch />
        </button>
      </div>
      <div className="flex items-center gap-[20px]">
        <button className="flex items-center gap-[3px]">
          Kolkata
          <div className="relative text-[20px] top-[1px]">
            <RiArrowDropDownFill />
          </div>
        </button>
        <button className="bg-[#da4b63] rounded-[5px] px-[10px] py-[2px] text-white">
          Sign in
        </button>
        <div className="text-[20px] cursor-pointer">
          <CgMenuRightAlt />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
