import React, { useEffect, useState } from "react";

function OtpRow({ setOtp }) {
  const [otpArr, setOtpArr] = useState(new Array(5).fill(""));
  function handleInputChange(ele, index) {
    const value = ele.value;
    if (!(value >= 0 && value <= 9)) {
      ele.value = "";
      return;
    }
    const newOtp = [...otpArr];
    newOtp[index] = ele.value;
    setOtpArr(newOtp);

    if (index < otpArr.length - 1) {
      ele.nextSibling.focus();
    }
  }

  function handleBackspace(ele, index) {
    if (index == 0 && otpArr[index] == "") return;
    ele.value = "";
    const newOtp = [...otpArr];
    newOtp[index] = "";
    setOtpArr(newOtp);
    if (index > 0 && otpArr[index] == "") {
      setTimeout(() => {
        ele.previousSibling.focus();
      }, 0);
    }
  }

  function handleOnClick(ele, index) {
    ele.setSelectionRange(1, 1);
  }

  useEffect(() => {
    setOtp(otpArr.join(""));
  }, [otpArr]);

  return (
    <div className="flex justify-between">
      {otpArr.map((item, index) => {
        return (
          <input
            key={index}
            maxLength="1"
            type="text"
            className="select-none border border-black w-[55px] h-[55px] rounded-[7px] outline-none text-center font-[500] text-[18px]"
            onChange={(e) => {
              handleInputChange(e.target, index);
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                handleBackspace(e.target, index);
              }
              if (
                index < otpArr.length - 1 &&
                e.key >= 0 &&
                e.key <= 9 &&
                otpArr[index] != ""
              ) {
                e.target.nextSibling.focus();
              }
            }}
            onClick={(e) => {
              handleOnClick(e.target, index);
            }}
          />
        );
      })}
    </div>
  );
}

export default OtpRow;
