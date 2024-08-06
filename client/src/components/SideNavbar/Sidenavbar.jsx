import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineArrowRight } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Sidenavbar({
  toggleSideNavbar,
  settoggleSideNavbar,
  user,
  settoggleLogin,
  setuser,
  setWrappersArr,
}) {
  const navigate = useNavigate();
  const [menulist, setmenulist] = useState([
    {
      icon: <IoTicketOutline />,
      name: "Your Bookings",
      desc: "View all your bookings",
    },
    {
      icon: <MdHelpOutline />,
      name: "Help & Support",
      desc: "Get help from support team",
    },
  ]);
  function handleLogout() {
    localStorage.removeItem("userid");
    setuser(null);
    setWrappersArr([true, false, false, false]);
    settoggleSideNavbar(false);
  }
  function handleOffSidebar(e) {
    let flag = false;
    e.target.classList.forEach((item) => {
      if (item === "sidenavbar") {
        flag = true;
      }
    });
    if (flag) {
      settoggleSideNavbar(false);
    }
  }
  return (
    <div
      className="bg-[#00000049] fixed w-full h-screen transition-all ease-linear duration-200 backdrop-filter backdrop-blur-[5px]"
      style={{
        opacity: toggleSideNavbar ? "1" : "0",
        pointerEvents: toggleSideNavbar ? "auto" : "none",
      }}
      onClick={handleOffSidebar}
    >
      <div
        style={{ right: toggleSideNavbar ? "0" : "-100%" }}
        className=" bg-white select-none transition-all ease-linear duration-200 absolute z-[100] h-full w-[320px] rounded-l-[20px]"
      >
        <div className="w-full  py-[20px] flex flex-col gap-[1rem]">
          <p className="font-bold text-[20px] px-[1rem]">
            {user ? (
              <span>Welcome</span>
            ) : (
              <span className="font-[500] text-[17px] flex items-center gap-[10px]">
                <FaRegCircleUser className="text-[25px] " />
                Guest
              </span>
            )}
          </p>
          {user ? (
            <>
              <p className="font-[500] text-[17px] flex items-center gap-[10px] px-[1rem] mt-[1rem]">
                <FaRegCircleUser className="text-[25px] " />
                {user.name}
              </p>
              <div className="flex flex-col gap-[1rem]">
                {menulist.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        if (index == 0) {
                          navigate(`/mybookings/${user.userId}`);
                          settoggleSideNavbar(false);
                        }
                      }}
                      key={index}
                      className="flex flex-col cursor-pointer hover:bg-[#c6c6c6] px-[1rem] py-[5px]"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex gap-[20px] items-center">
                          <span className="text-[25px]">{item.icon}</span>{" "}
                          <div className="">
                            <p>{item.name}</p>
                            <p className="text-[.9rem]">{item.desc}</p>
                          </div>
                        </div>{" "}
                        <MdOutlineArrowRight />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-[1rem]">
              <p className="text-center">* Log in to purchase tickets.</p>
            </div>
          )}
        </div>
        <div className="w-full px-[1rem] absolute bottom-[20px]">
          {!user ? (
            <button
              className="w-full rounded-[7px] bg-[#da4b63] text-white py-[5px] font-[500]"
              onClick={() => {
                settoggleLogin(true);
              }}
            >
              Login
            </button>
          ) : (
            <button
              className="w-full rounded-[7px] bg-[#da4b63] text-white py-[5px] font-[500]"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
        <RxCross1
          className="text-black absolute top-[25px] right-[20px] cursor-pointer font-bold text-[19px]"
          onClick={() => {
            settoggleSideNavbar(false);
          }}
        />
      </div>
      <div className="h-full w-full sidenavbar"></div>
    </div>
  );
}

export default Sidenavbar;
