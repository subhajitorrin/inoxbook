import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./AdminRoutes.css";
import TitleAndInput from "./adminComponents/TitleAndInput";

function AddMovies() {
  const [title, settitle] = useState("");
  const [genereList, setGenereList] = useState([]);
  const [selectGenere, setselectGenere] = useState(null);
  const [duration, setduration] = useState(null);
  const [synopsis, setSynopsis] = useState("");
  const [rating, setrating] = useState(null);
  const [poster, setposter] = useState("");
  const [trailer, settrailer] = useState("");
  const movieCategories = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Science Fiction",
    "Romance",
    "Thriller",
    "Documentary",
    "Animation",
    "Musical",
    "Mystery",
    "Historical",
    "Crime",
    "Family",
    "Biography",
  ];
  const languages = [
    "English",
    "Bengali",
    "Hindi",
    "Tamil",
    "Telegu",
    "Marathi",
  ];

  function handleAddGenre() {
    if (selectGenere && !genereList.includes(selectGenere)) {
      setGenereList((prevList) => [...prevList, selectGenere]);
      setselectGenere("");
    }
  }

  return (
    <div className="h-full w-full flex flex-col gap-[2rem] p-[3%]">
      {/* movie title */}
      <TitleAndInput
        name={"Movie Title"}
        changeName={settitle}
        place={"Enter movie title"}
      />
      {/* genres */}
      <div className="flex gap-[20px] items-center">
        <p className="text-[18px] font-[500] w-[200px]">Select Genres</p>
        <button
          onClick={handleAddGenre}
          className="bg-white px-[40px] py-[4px] text-black font-[500] rounded-[5px]"
        >
          Add
        </button>
        <select
          onChange={(e) => setselectGenere(e.target.value)}
          name="options"
          className="text-black px-[20px] py-[5px] rounded-[5px]"
        >
          <option value="">Select a genre</option>
          {movieCategories.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <div className="flex gap-[20px]">
          {genereList.map((item, index) => {
            return <p>{item}</p>;
          })}
        </div>
      </div>
      {/* duration */}
      <TitleAndInput
        name={"Duration"}
        changeName={setduration}
        place={"Enter movie duration"}
      />
      {/* synopsis */}
      <TitleAndInput
        name={"Snyopsis"}
        changeName={setSynopsis}
        place={"Enter movie snyopsis"}
      />
      {/* rating */}
      <TitleAndInput
        name={"Rating 0/10"}
        changeName={setrating}
        place={"Enter movie rating"}
      />
      {/* posterurl */}
      <TitleAndInput
        name={"Poster link"}
        changeName={setposter}
        place={"drop poster link"}
      />
      {/* trailer */}
      <TitleAndInput
        name={"Trailer link"}
        changeName={settrailer}
        place={"Enter trailer link"}
      />
    </div>
  );
}

export default AddMovies;
