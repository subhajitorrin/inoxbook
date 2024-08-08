import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDateCard from "../components/MovieDateCard";
import MovieTheaterCard from "../components/MovieTheaterCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MovieTiming() {
  const { id } = useParams();
  const [movieDetail, setmovieDetail] = useState(null);
  const [upcomingDates, setupcomingDates] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [schedules, setSchedules] = useState([]);
  const [theaterList, setTheaterList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getAllTheaters() {
      const res = await axios.get("http://localhost:5000/getalltheaters");
      if (res.status === 200) {
        setTheaterList(res.data.theaters);
        // console.log("Theater lists",res.data.theaters);
      }
    }
    getAllTheaters();
  }, [id]);

  useEffect(() => {
    function generateNext7Days() {
      const today = new Date();
      const dates = [];

      for (let i = 0; i < 7; i++) {
        const nextDate = new Date();
        nextDate.setDate(today.getDate() + i);
        const date = nextDate.toDateString();
        setupcomingDates((prev) => [...prev, date]);
        // console.log(date);
      }
    }
    generateNext7Days();
  }, [id]);

  useEffect(() => {
    async function getMovieDetailById() {
      try {
        const res = await axios.get(`http://localhost:5000/moviedetail/${id}`);
        setmovieDetail(res.data.movie);
      } catch (error) {
        console.log("Error while fetching movie detail", error);
      }
    }
    getMovieDetailById();
  }, [id]);

  useEffect(() => {
    async function getSchedulesByMovieIdAndDateandTheaterId() {
      setIsLoading(true);
      try {
        setSchedules([]);
        theaterList.forEach(async (theater, index) => {
          const res = await axios.get(
            `http://localhost:5000/getschedulesbymovieiddate/${id}/${upcomingDates[selectedIndex]}/${theater._id}`
          );
          // setSchedules(res.data.schedules);
          const schs = res.data.schedules;
          // console.log("Timing of theater", theater.name, res.data.schedules);
          if (schs.length === 0) return;
          const obj = {
            theaterId: theater._id,
            theaterName: theater.name,
            theaterAddress: theater.address,
            timings: res.data.schedules,
          };
          // console.log(obj);
          // setSchedules([])
          setSchedules((prev) => {
            return [...prev, obj];
          });
        });
      } catch (err) {
        console.log("Error while fetching ");
      }
    }
    if (id && upcomingDates.length > 0 && theaterList.length > 0)
      getSchedulesByMovieIdAndDateandTheaterId();
  }, [id, upcomingDates, selectedIndex, theaterList]);

  function formatMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}hr ${mins}m`;
  }

  return (
    movieDetail && (
      <>
        {/* <Navbar /> */}
        <div className="min-h-screen my-[1rem] px-[15%] w-full flex select-none flex-col">
          <div className="flex pb-[1.5rem]  border-b border-[#00000057] w-full h-[200px]">
            <div className="flex flex-col gap-[7px] h-full justify-center">
              <h1 className="text-[30px] font-bold">{movieDetail.title}</h1>
              <div className="flex gap-[10px] font-[600]">
                {formatMinutesToHours(movieDetail.duration)}
                <p>•</p>
                <div className=" flex gap-[10px]">
                  {movieDetail.language.map((item, index) => {
                    return index < 3 && <p key={index}>{item}</p>;
                  })}
                </div>
              </div>
              <div className="flex gap-[15px] text-[13px] mt-[5px]">
                {movieDetail.genre.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="py-[5px] px-[10px] bg-[#d7d7d7df] rounded-[7px] cursor-pointer font-[500]"
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="ml-[2rem] w-[120px] h-[100%] rounded-[10px] overflow-hidden">
              <img
                src={movieDetail.posterUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className=" flex-1">
              <p className="font-[600] text-[13px] text-center mb-[-10px]">
                *Kindly select the date that best suits your preferences for the
                show.
              </p>
              <div className="flex gap-[10px] justify-center items-center h-full">
                {upcomingDates.map((item, index) => {
                  return (
                    <MovieDateCard
                      date={item}
                      key={index}
                      isSelected={index === selectedIndex}
                      onClick={() => setSelectedIndex(index)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-[2rem] flex flex-col gap-[3rem]">
            {schedules.map((item, index) => {
              return <MovieTheaterCard key={index} schedule={item} />;
            })}
          </div>
        </div>
        <Footer />
      </>
    )
  );
}

export default MovieTiming;
