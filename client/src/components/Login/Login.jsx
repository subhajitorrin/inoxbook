import React, { useEffect, useRef, useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";
import { FaAngleLeft } from "react-icons/fa";
import OtpBox from "../OtpBox";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { RiAdminLine } from "react-icons/ri";
import OtpRow from "./OtpRow";

function Login({ settoggleLogin, setuser, wrappersArr, setWrappersArr }) {
  // const [wrappersArr, setWrappersArr] = useState([true, false, false, false]);
  const [otp, setOtp] = useState(null);
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [isOtpScreen, setisOtpScreen] = useState(false);
  const [optid, setoptid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyLoading, setverifyLoading] = useState(false);
  const [resendTimer, setresendTimer] = useState(null);
  const emailRef = useRef(null);
  const nameRef = useRef(null);

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
      setWrappersArr([false, false, true, false]);
      setisOtpScreen(true);
      setresendTimer(30);
      toast.success("OTP sent successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerifyOtp() {
    if (otp.length !== 5) {
      toast.warning("Fill the otp");
      return;
    }
    try {
      setverifyLoading(true);
      const serverres = await axios.post(
        "http://localhost:5000/verifyotp",
        { email, optid, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (serverres.status == 200) {
        setuser(serverres.data);
        settoggleLogin(false);
        localStorage.setItem("userid", serverres.data.userId);
        setemail("");
        setname("");
        toast.success("Login Successfull");
      }
      if (serverres.status == 201) {
        toast.success("OTP verified");
        setWrappersArr([false, false, false, true]);
      }
      if (serverres.status == 202) {
        toast.warning("Wrong OTP");
      }
      if (serverres.status == 203) {
        toast.warning("OTP expired, send again");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setverifyLoading(false);
    }
  }

  function revertBackOtpScreen() {
    setisOtpScreen(false);
    setWrappersArr([false, true, false, false]);
  }

  async function handleCreateUser() {
    try {
      setIsLoading(true);
      if (email != "" && name != "") {
        const serverRes = await axios.post(
          "http://localhost:5000/createuser",
          {
            email,
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (serverRes.status == 200) {
          settoggleLogin(false);
          setemail("");
          setname("");
          localStorage.setItem("userid", serverRes.data.userId);
          toast.success("Login Successfull");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, [wrappersArr]);

  useEffect(() => {
    if (otp && otp.length === 5) {
      handleVerifyOtp();
    }
  }, [otp]);

  return (
    <div
      className="z-[100] select-none opacity-0 pointer-events-none h-screen fixed flex items-center justify-center w-full backdrop-filter backdrop-blur-[3px]"
      id="loginContainer"
    >
      <div className="h-full w-full opacity-[.6] bg-[#000000]"></div>
      <div
        id="loginWrapper"
        className="gap-[2.5rem] flex items-center h-[500px] w-[400px] bg-white rounded-[10px] absolute p-[2.5rem]"
      >
        {wrappersArr[0] && (
          <div className="flex flex-col gap-[2rem] items-center justify-center relative min-w-[100%] bg-transparent h-full">
            <RxCross2
              onClick={() => {
                settoggleLogin(false);
              }}
              className="absolute text-[500] top-0 right-0 text-[20px] cursor-pointer"
            />
            <div
              onClick={() => {
                setWrappersArr([false, true, false, false]);
              }}
              className="hover:bg-[#da4b63] hover:text-[white] w-full hover:border-transparent transition-all ease-linear duration-100 cursor-pointer flex items-center justify-center border border-[#00000054] rounded-[5px] text-center py-[10px] font-[500]"
            >
              <TfiEmail className="absolute left-[20px]" />
              <p>User Login</p>
            </div>
            <div
              onClick={() => {
                window.open("/admin", "_blank");
              }}
              className="hover:bg-[#da4b63] hover:text-[white] w-full hover:border-transparent transition-all ease-linear duration-100 cursor-pointer flex items-center justify-center border border-[#00000054] rounded-[5px] text-center py-[10px] font-[500]"
            >
              <RiAdminLine className="absolute left-[20px]" />
              <p>Admin Login</p>
            </div>
          </div>
        )}
        {wrappersArr[1] && (
          <div className="min-w-[100%] bg-transparent h-full flex flex-col justify-between py-[15%] relative right-0 left-0">
            <FaAngleLeft
              onClick={() => {
                setWrappersArr([true, false, false, false]);
              }}
              className="absolute text-[500] top-0 left-0 text-[20px] cursor-pointer"
            />
            <div className="flex flex-col gap-[2rem]">
              <p className="font-bold text-[22px]">Login with Email</p>
              <div className="">
                <p className="font-[500] mb-[10px]">Email</p>
                <input
                  ref={emailRef}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendOtp();
                    }
                  }}
                  value={email}
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
              <div className="w-full">
                <OtpRow setOtp={setOtp} />
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
        {wrappersArr[3] && (
          <div className="min-w-[100%] bg-transparent h-full flex flex-col justify-between py-[15%] relative right-0 left-0">
            <div className="flex flex-col gap-[2rem]">
              <p className="font-bold text-[22px]">Enter your name</p>
              <div className="">
                <p className="font-[500] mb-[10px]">Name</p>
                <input
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreateUser();
                    }
                  }}
                  ref={nameRef}
                  value={name}
                  type="text"
                  placeholder="Enter your name"
                  className="outline-none py-[10px] w-full px-[20px] rounded-[5px] border border-[#00000055]"
                />
              </div>
            </div>
            <div
              onClick={handleCreateUser}
              style={{ pointerEvents: isLoading ? "none" : "auto" }}
              className="hover:bg-[#b63f53] bg-[#da4b63] text-[white] w-full hover:border-transparent transition-all ease-linear duration-100 cursor-pointer flex items-center justify-center rounded-[5px] text-center h-[40px] font-[500]"
            >
              {isLoading ? (
                <BeatLoader color="white" margin={2} size={7} />
              ) : (
                <p>Book Show</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
