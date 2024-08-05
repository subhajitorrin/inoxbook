import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderSeatSelection from "../components/SeatSelection/HeaderSeatSelection";
import SeatFlagHeader from "../components/SeatSelection/SeatFlagHeader";
import SeatCategory from "../components/SeatSelection/SeatCategory";

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

  useEffect(() => {
    const params = id.split("-");
    setMovieId(params[0]);
    setscheduleId(params[1]);
    setTheaterId(params[2]);
    setDate(params[3]);
    setTime(params[4]);
  }, [id]);

  useEffect(() => {
    // console.log(movieId);
    // console.log(scheduleId);
    // console.log(theaterId);
    // console.log(date);
    // console.log(time);
  }, [movieId, scheduleId, theaterId, date, time]);

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
      setSchedule(res.data.schedule);
      const screenres = await axios.get(
        `http://localhost:5000/getscreenbyid/${res.data.schedule.screen}`
      );
      setscreen(screenres.data.screen);
      if (screenres.data.screen.category1) {
        setSeatMatrix((prev) => [...prev, screenres.data.screen.category1]);
      }
      if (screenres.data.screen.category2) {
        setSeatMatrix((prev) => [...prev, screenres.data.screen.category2]);
      }
      if (screenres.data.screen.category3) {
        setSeatMatrix((prev) => [...prev, screenres.data.screen.category3]);
      }
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
  // useEffect(() => {
  //   if (seatMatrix.length > 0) console.log(seatMatrix);
  // }, [seatMatrix]);

  return (
    id && (
      <div className="w-full flex items-center flex-col gap-[2rem] select-none">
        {/* Header portion */}
        <HeaderSeatSelection
          movieDetail={movieDetail}
          theaterDetail={theaterDetail}
          date={date}
          time={time}
        />
        {/* Seat flags header */}
        <SeatFlagHeader />
        {/* Body portion */}
        {seatMatrix.map((item, index) => {
          return <SeatCategory key={index} category={item} />;
        })}
      </div>
    )
  );
}

export default SeatSelection;
