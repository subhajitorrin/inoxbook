import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./AdminRoutes.css";
import TitleAndInput from "./adminComponents/TitleAndInput";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddMovies() {
  const [title, settitle] = useState("");
  const [genereList, setGenereList] = useState([]);
  const [duration, setduration] = useState(null);
  const [languageList, setlanguageList] = useState([]);
  const [cbfcRating, setcbfcRating] = useState(null);
  const [date, setdate] = useState(null);
  const [synopsis, setSynopsis] = useState("");
  const [rating, setrating] = useState(null);
  const [poster, setposter] = useState("");
  const [trailer, settrailer] = useState("");
  const [displayCategory, setdisplayCategory] = useState(null);

  const movieGenres = [
    { value: "action", label: "Action" },
    { value: "comedy", label: "Comedy" },
    { value: "drama", label: "Drama" },
    { value: "horror", label: "Horror" },
    { value: "romance", label: "Romance" },
    { value: "sci-fi", label: "Science Fiction" },
    { value: "fantasy", label: "Fantasy" },
    { value: "thriller", label: "Thriller" },
    { value: "documentary", label: "Documentary" },
    { value: "animation", label: "Animation" },
  ];

  const movieLanguages = [
    { value: "hindi", label: "Hindi" },
    { value: "telugu", label: "Telugu" },
    { value: "tamil", label: "Tamil" },
    { value: "kannada", label: "Kannada" },
    { value: "malayalam", label: "Malayalam" },
    { value: "marathi", label: "Marathi" },
    { value: "bengali", label: "Bengali" },
    { value: "punjabi", label: "Punjabi" },
    { value: "odia", label: "Odia" },
    { value: "gujarati", label: "Gujarati" },
  ];

  const cbfcRatings = [
    { value: "u", label: "U" }, // Universal
    { value: "ua", label: "UA" }, // Parental Guidance
    { value: "a", label: "A" }, // Adult
    { value: "s", label: "S" }, // Specialized (for specific audiences)
    { value: "u/a-7", label: "UA 7+" }, // Parental Guidance for children above 7
    { value: "u/a-13", label: "UA 13+" }, // Parental Guidance for children above 13
    { value: "u/a-16", label: "UA 16+" }, // Parental Guidance for children above 16
  ];

  const movieTags = [
    { value: "featured", label: "Featured" },
    { value: "trending", label: "Trending" },
    { value: "hot", label: "Hot" },
    { value: "new_releases", label: "New Releases" },
    { value: "upcoming", label: "Upcoming" },
  ];

  return (
    <div className="h-full w-full flex justify-between p-[3%] px-[5%]">
      <div className="flex flex-col gap-[2rem]">
        {/* movie title */}
        <TitleAndInput
          name={"Movie Title"}
          changeName={settitle}
          place={"Enter movie title"}
        />
        {/* genres */}
        <div className="flex gap-[20px] items-center">
          <p className="text-[18px] font-[500] w-[200px]">Genre</p>
          <Select
            className="text-black min-w-[150px]"
            options={movieGenres}
            value={genereList}
            onChange={(selectedOptions) => {
              if (selectedOptions.length > 3) {
                setGenereList(selectedOptions.slice(0, 3));
              } else {
                setGenereList(selectedOptions);
              }
            }}
            isMulti={true}
          />
        </div>
        {/* duration */}
        <TitleAndInput
          name={"Duration"}
          changeName={setduration}
          place={"Enter movie duration"}
        />
        {/* languages */}
        <div className="flex gap-[20px] items-center">
          <p className="text-[18px] font-[500] w-[200px]">Language</p>
          <Select
            className="text-black min-w-[150px]"
            options={movieLanguages}
            value={languageList}
            onChange={(item) => {
              if (item.length > 3) {
                setlanguageList(item.slice(0, 3));
              } else {
                setlanguageList(item);
              }
            }}
            isMulti={true}
          />
        </div>
        {/* CBFC rating */}
        <div className="flex gap-[20px] items-center">
          <p className="text-[18px] font-[500] w-[200px]">CBFC Rating</p>
          <Select
            className="text-black w-[150px]"
            options={cbfcRatings}
            value={cbfcRating}
            onChange={(item) => {
              setcbfcRating(item);
            }}
          />
        </div>
        {/* release date */}
        <div className="flex gap-[20px] items-center">
          <p className="text-[18px] font-[500] w-[200px]">Release Date</p>
          <DatePicker
            className="w-[150px] text-center py-[5px] rounded-[5px]"
            selected={date}
            onChange={(date) => {
              setdate(date);
            }}
          />
        </div>

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
      </div>
      <div className="flex flex-col gap-[2rem]">
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

        {/* display category */}
        <div className="flex gap-[20px] items-center">
          <p className="text-[18px] font-[500] w-[200px]">Display Category</p>
          <Select
            className="text-black min-w-[150px]"
            options={movieTags}
            value={displayCategory}
            onChange={(item) => {
              setdisplayCategory(item);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AddMovies;
