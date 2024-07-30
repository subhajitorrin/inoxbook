import React, { useState } from "react";
import "./AdminLogin.css"

function AdminLogin({ setisLoggedInAdmin }) {
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  function handleAdminLogin() {
    if (true) {
      setisLoggedInAdmin(true);
    }
  }
  return (
    <div className="select-none h-screen w-full flex items-center justify-center adminLoginContainer" >
      <div className="adminWrapper flex flex-col justify-between p-[40px] w-[500px] h-[550px] rounded-[10px] py-[55px]">
        <p className="text-center font-bold text-[30px] uppercase ">
          Admin Panel
        </p>
        <div className="flex flex-col gap-[30px]">
          <div className="">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type="email"
              name="email"
              placeholder="Enter admin email"
              className="mt-[7px] border border-[#00000044]  w-full px-[20px] text-[15px] py-[10px] rounded-[10px]"
            />
          </div>
          <div className="">
            <label htmlFor="email">Password</label>

            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type="email"
              name="email"
              placeholder="Password"
              className="mt-[7px] border border-[#00000044]  w-full px-[20px] text-[15px] py-[10px] rounded-[10px]"
            />
          </div>
        </div>
        <div
          onClick={handleAdminLogin}
          className="hover:bg-[#346527] bg-[#3c752c] text-[white] w-full hover:border-transparent transition-all ease-linear duration-100 cursor-pointer flex items-center justify-center rounded-[5px] text-center h-[40px] font-[500]"
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
