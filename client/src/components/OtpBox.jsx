import React from "react";

function OtpBox() {
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length > 1) {
      e.target.value = value.slice(0, 1);
    }
  };

  return (
    <div className="h-[60px] w-[60px] border border-black">
      <input
        type="text"
        maxLength="1"
        onChange={handleInputChange}
        className="h-full w-full outline-none text-center text-[20px] font-bold"
      />
    </div>
  );
}

export default OtpBox;
