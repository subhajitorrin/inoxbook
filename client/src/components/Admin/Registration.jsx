import React from "react";

function AdminLogin() {
  return (
    <div className="select-none h-screen w-full flex items-center justify-center">
      <div className="flex flex-col justify-between p-[40px] w-[500px] h-[500px] border border-[#00000044] rounded-[10px]">
        <p className="text-center font-bold text-[30px] uppercase ">
          Admin Panel
        </p>
        <div className="flex flex-col gap-[20px]">
          <div className="">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter admin email"
              className="mt-[7px] border border-[#00000044]  w-full px-[20px] text-[15px] py-[10px] rounded-[10px]"
            />
          </div>
          <div className="">
            <label htmlFor="email">Password</label>
            <input
              type="email"
              name="email"
              placeholder="Password"
              className="mt-[7px] border border-[#00000044]  w-full px-[20px] text-[15px] py-[10px] rounded-[10px]"
            />
          </div>
        </div>
        <div className="hover:bg-[#b63f53] bg-[#da4b63] text-[white] w-full hover:border-transparent transition-all ease-linear duration-100 cursor-pointer flex items-center justify-center rounded-[5px] text-center h-[40px] font-[500]">
          Login
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
