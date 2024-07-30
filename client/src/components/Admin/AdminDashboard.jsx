import React from "react";

function AdminDashboard({ setisLoggedInAdmin }) {
  const navList = ["Dashboard", "Edit Movies", "", "Schedule", "Admin Details"];
  const editMoviesList = ["Add Movies", "Update Movies", "Delete Movies"];
  return (
    <div className="h-screen w-full flex select-none">
      <div className="h-full w-[20%] border-r border-black flex flex-col justify-between p-[2rem] ">
        <div className="flex flex-col gap-[20px] font-bold text-[18px] uppercase ">
          <p className="text-center text-[30px] mb-[30px] uppercase">
            Welcome ADMIN
          </p>
          {navList.map((item, index) => {
            if (index === 2) {
              return (
                <div className="text-[15px] ml-[20px] mt-[-15px]">
                  {editMoviesList.map((item, index) => {
                    return (
                      <>
                        <p
                          key={index}
                          className="cursor-pointer hover:opacity-[.7]"
                        >
                          - {item}
                        </p>
                      </>
                    );
                  })}
                </div>
              );
            }
            return (
              <p key={index} className="cursor-pointer hover:opacity-[.7]">
                {item}
              </p>
            );
          })}
        </div>
        <div className="">
          <div
            onClick={() => {
              setisLoggedInAdmin(false);
            }}
            className="hover:bg-[#b63f53] bg-[#da4b63] text-[white] w-full hover:border-transparent transition-all ease-linear duration-100 cursor-pointer flex items-center justify-center rounded-[5px] text-center h-[40px] font-[500]"
          >
            Logout
          </div>
        </div>
      </div>
      <div className="h-full w-[80%] ">
        <div className="h-[10%] w-full border-b border-black flex items-center justify-center">
          <p className="text-[20px] font-bold uppercase">Admin Dashboard</p>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}

export default AdminDashboard;
