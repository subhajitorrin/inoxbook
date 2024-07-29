import React, { useEffect, useRef, useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";
import { FaAngleLeft } from "react-icons/fa";
import OtpBox from "./OtpBox";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

function Login({ settoggleLogin }) {
  const [wrappersArr, setWrappersArr] = useState([true, false, false]);
  const [otpArray, setOtpArray] = useState(["", "", "", "", ""]);
  const [email, setemail] = useState("");
  const [isOtpScreen, setisOtpScreen] = useState(false);
  const [optid, setoptid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyLoading, setverifyLoading] = useState(false)
  const [resendTimer, setresendTimer] = useState(null);

  useEffect(() => {
    if (!resendTimer) return;
    let timer = null;
    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setresendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  async function handleSendOtp() {
    try {
      setIsLoading(true);
      if (!email.toLowerCase().includes("@gmail.com")) {
        toast.warning("Enter a valid email address");
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/sendotp",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setoptid(response.data.otpid);
      setWrappersArr([false, false, true]);
      setisOtpScreen(true);
      setresendTimer(30);
      toast.success("OTP sent successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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

  async function handleVerifyOtp() {
    try {
      setverifyLoading(true);
      const response = await axios.post(
        "http://localhost:5000/verifyotp",
        { email, optid, otp: otpArray.join("") },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setverifyLoading(false);
    }
  }

  function revertBackOtpScreen() {
    setisOtpScreen(false);
    setWrappersArr([false, true, false]);
  }

  return (
    <div
      className="select-none opacity-0 pointer-events-none h-screen fixed flex items-center justify-center w-full backdrop-filter backdrop-blur-[3px]"
      id="loginContainer"
    >
      <div className="h-full w-full opacity-[.6] bg-[#000000]"></div>
      <div
        id="loginWrapper"
        className="gap-[2.5rem] flex items-center h-[500px] w-[400px] bg-white rounded-[10px] absolute p-[2.5rem]"
      >
        {wrappersArr[0] && (
          <div className="flex items-center justify-center relative min-w-[100%] bg-transparent h-full">
            <RxCross2
              onClick={() => {
                settoggleLogin(false);
              }}
              className="absolute text-[500] top-0 right-0 text-[20px] cursor-pointer"
            />
            <div
              onClick={() => {
                setWrappersArr([false, true, false]);
              }}
              className="hover:bg-[#da4b63] hover:text-[white] w-full hover:border-transparent transition-all ease-linear duration-100 cursor-pointer flex items-center justify-center border border-[#00000054] rounded-[5px] text-center py-[10px] font-[500]"
            >
              <TfiEmail className="absolute left-[20px]" />
              <p>Continue with Email</p>
            </div>
          </div>
        )}
        {wrappersArr[1] && (
          <div className="min-w-[100%] bg-transparent h-full flex flex-col justify-between py-[15%] relative right-0 left-0">
            <FaAngleLeft
              onClick={() => {
                setWrappersArr([true, false, false]);
              }}
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
                  placeholder="Enter your email"
                  className="outline-none py-[10px] w-full px-[20px] rounded-[5px] border border-[#00000055]"
                />
              </div>
            </div>
            <div
              onClick={handleSendOtp}
              style={{ pointerEvents: isLoading ? "none" : "auto" }}
              className="hover:bg-[#b63f53] bg-[#da4b63] text-[white] w-full hover:border-transparent transition-all ease-linear duration-100 cursor-pointer flex items-center justify-center rounded-[5px] text-center h-[40px] font-[500]"
            >
              {isLoading ? (
                <BeatLoader color="white" margin={2} size={7} />
              ) : (
                <p>Send OTP</p>
              )}
            </div>
          </div>
        )}
        {wrappersArr[2] && (
          <div className="min-w-[100%] bg-transparent h-full relative py-[15%] flex flex-col justify-between">
            <FaAngleLeft
              onClick={revertBackOtpScreen}
              className="absolute text-[500] top-0 left-0 text-[20px] cursor-pointer"
            />
            <div className="">
              <p className="font-bold text-[22px] mb-[3px]">
                Verify your Email address
              </p>
              <div className="font-[500] text-[14px]">
                <p>
                  OTP sent to{" "}
                  {email.length <= 35 ? (
                    email
                  ) : (
                    <span>{email.slice(0, 35)}...</span>
                  )}
                </p>
              </div>
            </div>
            <div className="">
              <p className="font-[500] mb-[10px]">Enter OTP</p>
              <div className="flex justify-between w-full">
                {otpArray.map((item, index) => (
                  <OtpBox
                    key={index}
                    index={index}
                    onFocusNext={handleFocusNext}
                    onFocusPrev={handleFocusPrev}
                    isOtpScreen={isOtpScreen}
                    setOtpArray={setOtpArray}
                  />
                ))}
              </div>
            </div>
            <div className="">
              <p className=" mb-[15px] text-[14px]">
                <span className="">Don't received OTP ?&nbsp;&nbsp;</span>
                <span className=" ">
                  {resendTimer > 0 ? (
                    <span className="pointer-events-none">
                      Next OTP in{" "}
                      <span className="text-[#b63f53]">{resendTimer} sec</span>
                    </span>
                  ) : isLoading ? (
                    <div className=" text-center w-[70px] inline">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <BeatLoader color="black" margin={2} size={3} />
                    </div>
                  ) : (
                    <span
                      className="cursor-pointer text-[#b63f53]"
                      onClick={handleSendOtp}
                    >
                      Resend OTP
                    </span>
                  )}
                </span>
              </p>
              <div
                onClick={handleVerifyOtp}
                className="hover:bg-[#b63f53] bg-[#da4b63] text-[white] w-full hover:border-transparent transition-all ease-linear duration-100 cursor-pointer flex items-center justify-center rounded-[5px] text-center h-[40px] font-[500]"
              >
                {verifyLoading ? (
                  <BeatLoader color="white" margin={2} size={7} />
                ) : (
                  <p>Continue</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
