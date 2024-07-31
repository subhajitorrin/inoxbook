import React from "react";

function TitleAndInput({ name, changeName, place, val }) {
  return (
    <div className="flex gap-[20px] items-center">
      <p className="text-[18px] font-[500] w-[200px]">{name}</p>
      <input
        value={val || ""}
        onChange={(e) => {
          changeName(e.target.value);
        }}
        className="w-[300px] py-[10px] px-[20px] rounded-[5px] outline-none"
        type="text"
        placeholder={place}
      />
    </div>
  );
}

export default TitleAndInput;
