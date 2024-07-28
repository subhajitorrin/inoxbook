import React, { useEffect, useRef, useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";
import { FaAngleLeft } from "react-icons/fa6";
import gsap from "gsap";
import OtpBox from "./OtpBox";
import axios from "axios";

function Login({ settoggleLogin }) {
  const wrapperRef = useRef([]);
  const [otpArray, setOtpArray] = useState(["", "", "", "", ""]);
  const [email, setemail] = useState("");
  const [isOtpScreen, setisOtpScreen] = useState(false);

  function revealNext() {
    wrapperRef.current.forEach((item) => {
      gsap.to(item, {
        left: "-364px",
      });
    });
  }
  async function revealNext1() {
    try {
      const response = await axios.post(
        "http://localhost:5000/sendotp",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
      return;
    }
    wrapperRef.current.forEach((item) => {
      gsap.to(item, {
        left: "-724px",
      });
    });
    setisOtpScreen(true);
  }
  function revertBack() {
    wrapperRef.current.forEach((item) => {
      gsap.to(item, {
        left: "0",
      });
    });
  }
  function revertBack1() {
    wrapperRef.current.forEach((item) => {
      gsap.to(item, {
        left: "-364px",
      });
    });
    setisOtpScreen(false);
  }

  const handleFocusNext = (index) => {
    const nextIndex = index + 1;
    if (nextIndex < otpArray.length) {
      document.querySelectorAll(".otpInputFields")[nextIndex].focus();
    }
  };
  const handleFocusPrev = (index) => {
    const prevIndex = index - 1;
    if (prevIndex >= 0) {
      document.querySelectorAll(".otpInputFields")[prevIndex].focus();
    }
  };

  useEffect(() => {
    console.log(otpArray);
  }, [otpArray]);

  return (
    <div
      className="select-none opacity-0 pointer-events-none h-screen fixed flex items-center justify-center w-full backdrop-filter backdrop-blur-[3px]"
      id="loginContainer"
    >
      <div className="h-full w-full opacity-[.6] bg-[#000000]"></div>
      <div
        id="loginWrapper"
        className="overflow-hidden gap-[2.5rem] flex items-center h-[500px] w-[400px] bg-white rounded-[10px] absolute p-[2%]"
      >
        <div
          ref={(el) => (wrapperRef.current[0] = el)}
          className="flex items-center justify-center relative min-w-[100%] bg-transparent h-full"
        >
          <RxCross2
            onClick={() => {
              settoggleLogin(false);
            }}
            className="absolute text-[500] top-0 right-0 text-[20px] cursor-pointer"
          />
          <div
            onClick={revealNext}
            className="hover:bg-[#da4b63] hover:text-[white] w-full hover:border-transparent transition-all ease-linear duration-100 cursor-pointer flex items-center justify-center border border-[#00000054] rounded-[5px] text-center py-[10px] font-[500]"
          >
            <TfiEmail className="absolute left-[20px]" />
            <p>Continue with Email</p>
          </div>
        </div>
        <div
          ref={(el) => (wrapperRef.current[1] = el)}
          className="min-w-[100%] bg-transparent h-full flex flex-col justify-between py-[15%] relative right-0 left-0"
        >
          <FaAngleLeft
            onClick={revertBack}
            className="absolute text-[500] top-0 left-0 text-[20px] cursor-pointer"
          />
          <div className="flex flex-col gap-[2rem]">
            <p className="font-bold text-[22px]">Login with Email</p>
            <div className="">
              <p className="font-[500] mb-[10px]">Email</p>
              <input
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                type="email"
                name=""
                id=""
                placeholder="Enter your email"
                className="outline-none py-[10px] w-full px-[20px] rounded-[5px] border border-[#00000055]"
              />
            </div>
          </div>
          <div
            onClick={revealNext1}
            className="hover:bg-[#b63f53] bg-[#da4b63] text-[white] w-full hover:border-transparent transition-all ease-linear duration-100 cursor-pointer flex items-center justify-center  rounded-[5px] text-center py-[10px] font-[500]"
          >
            <p>Send OTP</p>
          </div>
        </div>
        <div
          ref={(el) => (wrapperRef.current[2] = el)}
          className="min-w-[100%] bg-transparent h-full relative py-[15%] flex flex-col justify-between"
        >
          <FaAngleLeft
            onClick={revertBack1}
            className="absolute text-[500] top-0 left-0 text-[20px] cursor-pointer"
          />
          <p className="font-bold text-[22px]">Verify your Email address</p>
          <div className="">
            <p className="font-[500] mb-[10px]">Enter OTP</p>
            <div className="flex justify-between">
              {otpArray.map((item, index) => {
                return (
                  <OtpBox
                    key={index}
                    index={index}
                    onFocusNext={handleFocusNext}
                    onFocusPrev={handleFocusPrev}
                    isOtpScreen={isOtpScreen}
                    setOtpArray={setOtpArray}
                  />
                );
              })}
            </div>
          </div>
          <div className="">
            <p className=" mb-[15px] text-[14px]">
              Don't received OTP ?{" "}
              <span className="text-[#b63f53] cursor-pointer">Resend OTP</span>
            </p>
            <div className="hover:bg-[#b63f53] bg-[#da4b63] text-[white] w-full hover:border-transparent transition-all ease-linear duration-100 cursor-pointer flex items-center justify-center  rounded-[5px] text-center py-[10px] font-[500]">
              <p>Continue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
