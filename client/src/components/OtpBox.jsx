import React, { useEffect, useRef } from "react";

function OtpBox({ index, onFocusNext, onFocusPrev, isOtpScreen, setOtpArray }) {
  const inputRef = useRef(null);
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!(value >= 0 && value <= 9)) {
      e.target.value = value.slice(0, 0);
      return;
    }
    if (value.length > 1) {
      e.target.value = value.slice(0, 1);
    }
    if (value.length === 1 && onFocusNext) {
      onFocusNext(index);
    }
    if (value.length === 0 && onFocusPrev) {
      onFocusPrev(index);
    }
    setOtpArray((prev) => {
      const newArr = [...prev];
      newArr[index] = e.target.value;
      return newArr;
    });
  };

  useEffect(() => {
    if (isOtpScreen) {
      inputRef.current.value = "";
    }
  }, [isOtpScreen]);

  return (
    <div className="h-[60px] w-[60px] border border-black rounded-[5px] overflow-hidden">
      <input
        ref={inputRef}
        type="text"
        maxLength="1"
        onChange={handleInputChange}
        className="otpInputFields h-full w-full outline-none text-center text-[20px] font-bold"
      />
    </div>
  );
}

export default OtpBox;
