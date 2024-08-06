import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderSeatSelection from "../components/SeatSelection/HeaderSeatSelection";
import SeatFlagHeader from "../components/SeatSelection/SeatFlagHeader";
import SeatCategory from "../components/SeatSelection/SeatCategory";
import Seat from "../components/SeatSelection/Seat";

function SeatSelection() {
  const { id } = useParams();
  const [movieId, setMovieId] = useState(null);
  const [movieDetail, setMovieDetail] = useState(null);
  const [scheduleId, setscheduleId] = useState(null);
  const [theaterId, setTheaterId] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [theaterDetail, setTheaterDetail] = useState(null); // Assuming you'll fetch theater details too
  const [language, setLanguage] = useState("Hindi"); // Assuming you'll have language details
  const [seatMatrix, setSeatMatrix] = useState([]);
  const [screen, setscreen] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [activeCategory, setactiveCategory] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAnySeatIsActive, setisAnySeatIsActive] = useState(false);

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const params = id.split("-");
    setMovieId(params[0]);
    setscheduleId(params[1]);
    setTheaterId(params[2]);
    setDate(params[3]);
    setTime(params[4]);
  }, [id]);

  async function getMovieDetailById(id) {
    try {
      const res = await axios.get(`http://localhost:5000/moviedetail/${id}`);
      setMovieDetail(res.data.movie);
    } catch (error) {
      console.log("Error while fetching movie detail", error);
    }
  }

  async function getTheaterbyId(id) {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/getthertheater/${id}`
      );
      setTheaterDetail(res.data.theater);
      // console.log(res.data.theater);
    } catch (err) {
      console.log("Error while fetching theater detail", err);
    }
  }

  async function getSeatMatrixByScreen(schid) {
    try {
      const res = await axios.get(
        `http://localhost:5000/getschedulebyid/${schid}`
      );
      if (res.status !== 200) return;
      const screenres = await axios.get(
        `http://localhost:5000/getscreenbyid/${res.data.schedule.screen}`
      );
      setSchedule(screenres);
      setscreen(screenres.data.screen);
      setSeatMatrix(screenres.data.screen.seatmatrix);
    } catch (err) {
      console.error("Error fetching seat matrix:", err);
    }
  }

  useEffect(() => {
    if (movieId) {
      getMovieDetailById(movieId);
    }
  }, [movieId]);

  useEffect(() => {
    if (theaterId) {
      getTheaterbyId(theaterId);
    }
  }, [theaterId]);

  useEffect(() => {
    if (scheduleId) {
      getSeatMatrixByScreen(scheduleId);
    }
  }, [scheduleId]);

  useEffect(() => {
    if (selectedCategory.length > 0 && activeCategory && activeCategory.price) {
      const price = activeCategory.price;
      const n = selectedCategory.length;
      setTotalPrice(price * n);
    }
  }, [selectedCategory, activeCategory]);

  return (
    id && (
      <div className="w-full flex items-center flex-col gap-[2rem] select-none relative ">
        {/* Header portion */}
        <HeaderSeatSelection
          movieDetail={movieDetail}
          theaterDetail={theaterDetail}
          date={date}
          time={time}
        />
        {/* Seat flags header */}
        <SeatFlagHeader date={date} />
        {/* Body portion */}
        <div className="flex w-[60%] flex-wrap  ">
          {seatMatrix.map((item, index) => {
            return (
              <SeatCategory
                key={index}
                category={item}
                setSelectedCategory={setSelectedCategory}
                setactiveCategory={setactiveCategory}
                activeCategory={activeCategory}
              />
            );
          })}
        </div>
        {/* screen this side */}
        <div
          style={{
            marginBottom: selectedCategory.length > 0 ? "130px" : "50px",
          }}
          className="ml-[60px]"
        >
          <img src="https://assetscdn1.paytm.com/movies_new/_next/static/media/screen-icon.8dd7f126.svg" />
        </div>
        {/* selected seat display */}
        {selectedCategory.length > 0 && (
          <div className="flex justify-evenly items-center w-full bg-white border-t border-[#00000030] fixed bottom-0 h-[100px]">
            <div className="font-[500] text-[17px]">
              <p className="text-[18px] font-bold">&#8377;{totalPrice}</p>
              <p>
                Tickets {selectedCategory.length} x {activeCategory.price}
              </p>
            </div>
            <div className="">
              <button className="px-[2rem] py-[1rem] bg-black rounded-[7px] text-white font-[500]">
                Book Ticket
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default SeatSelection;
