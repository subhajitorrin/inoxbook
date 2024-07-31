import React, { useEffect, useRef, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./AdminRoutes.css";
import TitleAndInput from "./adminComponents/TitleAndInput";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddCast from "./adminComponents/AddCast";
import axios from "axios";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

function AddMovies({ isUpdate, movieData }) {
  const [title, settitle] = useState("");
  const [genereList, setGenereList] = useState([]);
  const [duration, setduration] = useState("");
  const [languageList, setlanguageList] = useState([]);
  const [cbfcRating, setcbfcRating] = useState("");
  const [date, setdate] = useState(null);
  const [synopsis, setSynopsis] = useState("");
  const [rating, setrating] = useState(null);
  const [poster, setposter] = useState("");
  const [trailer, settrailer] = useState("");
  const [displayCategory, setdisplayCategory] = useState(null);
  const [castList, setcastList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const cbfcRatnigRef = useRef(null);

  function isFloat(n) {
    let parsedValue = parseFloat(n);
    return !isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10;
  }

  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  async function handleAddMovieToDatabase() {
    if (
      title != "" &&
      genereList.length > 0 &&
      typeof parseInt(duration) === "number" &&
      languageList.length > 0 &&
      cbfcRating &&
      date &&
      synopsis != "" &&
      isFloat(rating) &&
      poster != "" &&
      trailer != "" &&
      displayCategory
    ) {
      setisLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/addnewmovie",
          {
            title,
            genre: genereList.map((item) => item.label),
            duration: parseInt(duration),
            language: languageList.map((item) => item.label),
            CBFCratnig: cbfcRating.label,
            releaseDate: formatDateToDDMMYYYY(date),
            cast: castList,
            synopsis,
            rating,
            posterUrl: poster,
            trailerUrl: trailer,
            categories: displayCategory.label,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          toast.success("Movie added successfully");
          console.log(response.data);
        }
      } catch (error) {
        toast.warning("Something went wrong!!!");
        console.log(error.message);
      } finally {
        setisLoading(false);
      }
    } else {
      toast.warn("Fill all the fields!!!");
    }
  }

  async function handleUpdateMovie() {
    if (
      title != "" &&
      genereList.length > 0 &&
      typeof parseInt(duration) === "number" &&
      languageList.length > 0 &&
      cbfcRating &&
      date &&
      synopsis != "" &&
      isFloat(rating) &&
      poster != "" &&
      trailer != "" &&
      displayCategory
    ) {
      setisLoading(true);
      try {
        const response = await axios.put(
          `http://localhost:5000/updatemovie/${movieData._id}`,
          {
            title,
            genre: genereList.map((item) => item.label),
            duration: parseInt(duration),
            language: languageList.map((item) => item.label),
            CBFCratnig: cbfcRating.label,
            releaseDate: formatDateToDDMMYYYY(date),
            cast: castList,
            synopsis,
            rating,
            posterUrl: poster,
            trailerUrl: trailer,
            categories: displayCategory.label,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toast.success("Movie updated");
        }
        if (response.status === 400) {
          toast.warn("Movie not found");
        }
      } catch (error) {
        toast.warning("Something went wrong!!!");
        console.log(error.message);
      } finally {
        setisLoading(false);
      }
    } else {
      toast.warn("Fill all the fields!!!");
    }
  }

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
    { value: "english", label: "English" },
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

  useEffect(() => {
    if (isUpdate && movieData) {
      settitle(movieData.title);
      setGenereList(movieData.genre.map((g) => ({ label: g, value: g })));
      setduration(movieData.duration || "");
      setlanguageList(movieData.language.map((l) => ({ label: l, value: l })));
      setcbfcRating(movieData.CBFCratnig);
      setdate(new Date(movieData.releaseDate) || null);
      setSynopsis(movieData.synopsis || "");
      setrating(movieData.rating || null);
      setposter(movieData.posterUrl || "");
      settrailer(movieData.trailerUrl || "");
      setdisplayCategory(movieData.categories || null);
      setcastList(movieData.cast || []);
      document
        .querySelector("#cbfcRating")
        .querySelector(".css-1jqq78o-placeholder").innerHTML =
        movieData.CBFCratnig;
      document
        .querySelector("#displayCategory")
        .querySelector(".css-1jqq78o-placeholder").innerHTML =
        movieData.categories;
    }
  }, [isUpdate, movieData]);

  return (
    <div className="h-full w-full flex justify-between p-[2.4%] px-[6%]">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-[2rem]">
          {/* movie title */}
          <TitleAndInput
            name={"Movie Title"}
            changeName={settitle}
            place={"Enter movie title"}
            val={title}
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
            val={duration}
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
              id="cbfcRating"
              className="text-black w-[150px]"
              options={cbfcRatings}
              value={cbfcRating}
              onChange={(item) => {
                setcbfcRating(item);
              }}
              ref={cbfcRatnigRef}
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
            val={synopsis}
          />
          {/* rating */}
          <TitleAndInput
            name={"IMDB Rating"}
            changeName={setrating}
            place={"Enter movie rating"}
            val={rating}
          />
        </div>
        <button
          style={{ pointerEvents: isLoading ? "none" : "auto" }}
          className=" py-[7px] font-[500] rounded-[7px] border border-white hover:bg-white hover:text-black"
          onClick={isUpdate ? handleUpdateMovie : handleAddMovieToDatabase}
        >
          {isLoading ? (
            <BeatLoader color="white" margin={2} size={7} />
          ) : isUpdate ? (
            <span>Update Movie</span>
          ) : (
            <span>Add Movie to Database</span>
          )}
        </button>
      </div>
      <div className="flex flex-col gap-[2rem]">
        {/* posterurl */}
        <TitleAndInput
          name={"Poster link"}
          changeName={setposter}
          place={"drop poster link"}
          val={poster}
        />
        {/* trailer */}
        <TitleAndInput
          name={"Trailer link"}
          changeName={settrailer}
          place={"Enter trailer link"}
          val={trailer}
        />

        {/* display category */}
        <div className="flex gap-[20px] items-center">
          <p className="text-[18px] font-[500] w-[200px]">Display Category</p>
          <Select
            className="text-black min-w-[150px]"
            id="displayCategory"
            options={movieTags}
            value={displayCategory}
            onChange={(item) => {
              setdisplayCategory(item);
            }}
          />
        </div>
        {/* select cast */}
        <div className="border-t border-white pt-[1rem]">
          <p className="text-[18px] font-[500] text-center w-full mb-[1rem]">
            Casting
          </p>
          {castList.map((item, index) => {
            function removeCast() {
              setcastList(castList.filter((item, i) => i !== index));
            }
            function updateCast(updatedCast) {
              const newCastList = [...castList];
              newCastList[index] = updatedCast;
              setcastList(newCastList);
            }
            return (
              <AddCast
                key={index}
                index={index}
                cast={item}
                updateCast={updateCast}
                removeCast={removeCast}
                prename={item.name}
                preurl={item.imageUrl}
              />
            );
          })}
          <div className="flex justify-center mt-[10px]">
            <button
              style={{ display: castList.length == 2 ? "none" : "" }}
              className="border border-white px-[1rem] py-[5px] rounded-[5px]"
              onClick={() => {
                if (castList.length < 2) {
                  setcastList([...castList, { name: "", imageUrl: "" }]);
                } else {
                  setcastList((prev) => prev.slice(0, 2));
                }
              }}
            >
              Add Cast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMovies;
