import React, { useState } from "react";

function UpdateCards({ item, settoggle, setClickedId }) {
  const [isLoading, setisLoading] = useState(false);

  function handleUpdateMovie() {
    settoggle(true);
    setClickedId(item._id);
  }

  return (
    <div className="relative flex flex-col justify-end overflow-hidden min-h-[550px] min-w-[350px] rounded-[10px] ">
      <div className="z-[100]  h-full w-[350px] overflow-hidden rounded-[10px]">
        <img
          src={item.posterUrl}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <p className="relative z-[101] text-[22px] font-[500] text-center  py-[10px] text-whtie">
        {item.title}
      </p>
      <button
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
        className="relative z-[101] w-full py-[10px] bg-[#0062ff] hover:bg-[#0958d7]"
        onClick={handleUpdateMovie}
      >
        {isLoading ? (
          <BeatLoader color="white" margin={2} size={7} />
        ) : (
          <span>Update</span>
        )}
      </button>
    </div>
  );
}

export default UpdateCards;
