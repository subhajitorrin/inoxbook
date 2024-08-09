import React from "react";
import { IoIosSearch } from "react-icons/io";
import { RiArrowDropDownFill } from "react-icons/ri";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoTicketOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";

function Navbar({ settoggleLogin, user, settoggleSideNavbar }) {
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
      <div className="text-[15px] flex items-center gap-[20px] justify-end">
        <button className="flex items-center gap-[3px]">
          Kolkata
          <div className="relative text-[20px] top-[1px]">
            <RiArrowDropDownFill />
          </div>
        </button>
        {user === null ? (
          <div className="w-[150px]"></div>
        ) : user ? (
          <p
            className="w-[150px] flex gap-[10px] items-center cursor-pointer justify-end"
            onClick={() => {
              settoggleSideNavbar(true);
            }}
          >
            <FaRegCircleUser className="text-[20px]" />
            {user.name.length > 14 ? (
              <span>{user.name.slice(0, 14)}...</span>
            ) : (
              <span>{user.name}</span>
            )}
          </p>
        ) : (
          <button
            className="bg-[#da4b63] rounded-[5px] px-[10px] py-[2px] text-white"
            onClick={() => {
              settoggleLogin(true);
            }}
          >
            Login
          </button>
        )}

        <div
          className="text-[20px] cursor-pointer"
          onClick={() => {
            settoggleSideNavbar(true);
          }}
        >
          <CgMenuRightAlt className="text-[25px]" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
