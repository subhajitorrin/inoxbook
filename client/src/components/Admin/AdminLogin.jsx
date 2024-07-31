import React, { useState } from "react";
import "./AdminLogin.css";
import { toast } from "react-toastify";

function AdminLogin({ setisLoggedInAdmin }) {
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  function handleAdminLogin() {
    if (!email || !password) {
      toast.warn("Enter credentials!!!");
      return;
    }
    if (email == "111" && password == "111") {
      setisLoggedInAdmin(true);
      toast.success("Admin login successfull");
    } else {
      toast.warn("Wrong admin credentials!!!");
    }
  }
  return (
    <div className="select-none h-screen w-full flex items-center justify-center adminLoginContainer">
      <div className="adminWrapper flex flex-col justify-between p-[40px] w-[500px] h-[550px] rounded-[10px] py-[55px]">
        <p className="text-center font-bold text-[30px] uppercase ">
          Admin Panel
        </p>
        <div className="flex flex-col gap-[30px]">
          <div className="">
            <label htmlFor="text">Username</label>
            <input
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type="text"
              name="text"
              placeholder="Enter admin username"
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
              placeholder="Enter admin password"
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
