import React from "react";

function DeleteSectionMovieCards({ item }) {
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
      <button className="relative z-[101] w-full py-[10px] bg-[red] hover:bg-[#da1818]">
        Delete
      </button>
    </div>
  );
}

export default DeleteSectionMovieCards;
