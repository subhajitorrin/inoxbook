import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

function DeleteSectionMovieCards({ item, settoggle }) {
  const [isLoading, setisLoading] = useState(false);
  async function handleDeleteMovie() {
    try {
      setisLoading(true);
      const response = await axios.delete(
        `http://localhost:5000/deletemovie/${item._id}`
      );
      if (response.status === 200) {
        toast.success("Movie has been deleted");
        settoggle((prev) => !prev);
      }
      if (response.status === 44) {
        toast.warn("Movie not found!!!");
      }
    } catch (err) {
      console.log("Error while deleting movie", err.message);
    } finally {
      setisLoading(false);
    }
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
        className="relative z-[101] w-full py-[10px] bg-[red] hover:bg-[#da1818]"
        onClick={handleDeleteMovie}
      >
        {isLoading ? (
          <BeatLoader color="white" margin={2} size={7} />
        ) : (
          <span>Delete</span>
        )}
      </button>
    </div>
  );
}

export default DeleteSectionMovieCards;
