import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin({ setisLoggedInAdmin }) {
  const navigate = useNavigate();
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  async function handleAdminLogin() {
    if (!email || !password) {
      toast.warn("Enter credentials!!!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/adminlogin",
        { username: email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("theaterId", response.data.theaterId);
        setisLoggedInAdmin(true);
        navigate("/admin/dashboard");
        toast.success("Admin login successful");
        setemail(null);
        setpassword(null);
      } else if (response.status === 401) {
        toast.warn("Wrong admin credentials!!!");
      } else {
        toast.warn("Unexpected response from server");
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error("Login error:", error);
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#111111]">
      <div className="h-[550px] w-[450px] text-white bg-[#2b2b2b] border border-black rounded-[10px] p-[2rem] flex flex-col justify-between py-[3rem] select-none">
        <p className="text-[30px] font-bold text-center uppercase">
          Admin Login
        </p>
        <div className="flex flex-col gap-[1rem]">
          <div className="">
            <p className="text-[15px] mb-[7px] font-[500]">Username</p>
            <input
              className="bg-[#424242] w-full border border-[#00000057] outline-none rounded-[6px] h-[50px] px-[20px]"
              type="text"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="Enter admin username"
            />
          </div>
          <div className="">
            <p className="text-[15px] mb-[7px] font-[500]">Password</p>
            <input
              className="bg-[#424242] w-full border border-[#00000057] outline-none rounded-[6px] h-[50px] px-[20px]"
              type="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder="Enter admin password"
            />
          </div>
        </div>
        <div className="">
          <button
            onClick={handleAdminLogin}
            className="w-full bg-[#dd3c3c] py-[8px] text-white font-[500] rounded-[5px]"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
