import React, { useState } from "react";

function AddCast({ index, cast, updateCast, removeCast }) {
  const [name, setname] = useState(null);
  const [profileUrl, setprofileUrl] = useState(null);
  return (
    <div className="border-t border-b border-[#ffffff60] py-[20px] flex flex-col gap-[10px]">
      <div className="flex gap-[20px] items-center ">
        <p className="text-[18px] font-[500] w-[200px]">Cast name</p>
        <input
          onChange={(e) => {
            updateCast({ ...cast, name: e.target.value });
          }}
          className="w-[300px] py-[10px] px-[20px] rounded-[5px] outline-none"
          type="text"
          placeholder="Enter caster name"
        />
      </div>
      <div className="flex gap-[20px] items-center">
        <p className="text-[18px] font-[500] w-[200px] ">Cast Profile Image</p>
        <input
          onChange={(e) => {
            updateCast({ ...cast, imageUrl: e.target.value });
          }}
          className="w-[300px] py-[10px] px-[20px] rounded-[5px] outline-none"
          type="text"
          placeholder="Enter caster image url"
        />
      </div>
      <button
        className="border border-red-500 text-red-500 px-[1rem] py-[5px] rounded-[5px]"
        onClick={removeCast}
      >
        Remove
      </button>
    </div>
  );
}

export default AddCast;
