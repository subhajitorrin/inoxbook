import React, { useEffect, useState } from "react";
import seatmatrixarr from "../data/seating.json";
import Seat from "../components/Seat";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import axios from "axios";
import { useParams } from "react-router-dom";

function SeatSelection() {
  const [movieDetail, setmovieDetail] = useState(null);
  const [theaterDetail, settheaterDetail] = useState(null);
  const [params, setparams] = useState([]);
  const [seat, setseat] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    setparams(id.split("-"));
  }, [id]);

  useEffect(() => {
    async function getMovieDetailById() {
      try {
        if (params.length > 0) {
          const res = await axios.get(
            `http://localhost:5000/moviedetail/${params[0]}`
          );
          setmovieDetail(res.data.movie);
          console.log(res.data.movie);
        }
      } catch (error) {
        console.log("Error while fetching movie detail", error);
      }
    }
    getMovieDetailById();
  }, [params]);

  useEffect(() => {
    async function getTheaterById() {
      try {
        if (params.length > 0) {
          const res = await axios.get(
            `http://localhost:5000/gettheaterbyid/${params[2]}`
          );
          settheaterDetail(res.data.theater);
        }
      } catch (error) {
        console.log("Error while fetching movie detail", error);
      }
    }
    getTheaterById();
  }, [params]);

  useEffect(() => {
    setseat(seatmatrixarr[0]);
  }, [seatmatrixarr]);
  if (!seat) {
    return;
  }
  return (
    movieDetail &&
    theaterDetail && (
      <div className="w-full flex items-center flex-col gap-[3rem] select-none">
        <div className=" bg-black w-full py-[1rem] relative">
          <div className="text-white text-[40px] absolute  cursor-pointer left-[20%] top-[25%]">
            <MdOutlineKeyboardArrowLeft />
          </div>
          <div className="">
            <p className="font-bold text-[22px] text-white text-center">
              {movieDetail.title}
            </p>
            <p className="text-center text-white text-[15px] ">
              Today, 23 Jul, 10:10 AM at <span>{theaterDetail.name}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between w-[60%] items-center ">
          <div className="flex gap-[2rem] items-center">
            <div className="font-bold">
              <div className="text-[20px]">
                <p className="text-[#878787]">Tue</p>
                <p>23 Jul</p>
              </div>
            </div>
            <div className="border border-transparent w-[500px] h-[50px]">
              {/* <p>timings will be shown here</p> */}
            </div>
          </div>
          <div className="flex gap-[30px]">
            <div className="flex gap-[10px] items-center">
              <div className="h-[20px] w-[20px] bg-transparent border border-black rounded-[3px]"></div>
              <p className="font-[500]">Available</p>
            </div>
            <div className="flex gap-[10px] items-center">
              <div className="h-[20px] w-[20px] bg-[#d3d3d3] rounded-[3px] border border-transparent"></div>
              <p className="font-[500]">Booked</p>
            </div>
            <div className="flex gap-[10px] items-center">
              <div className="h-[20px] w-[20px] bg-black rounded-[3px]"></div>
              <p className="font-[500]">Selected</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[2rem]">
          <div>
            <p className="text-center mb-[15px] font-bold">
              StarSuite &#x20B9;330
            </p>
            {seat.seatMatrix.map(
              (row, rowIndex) =>
                rowIndex < 1 && (
                  <div
                    key={rowIndex}
                    className="flex mb-2 gap-[2rem] select-none"
                  >
                    <div className="font-bold mb-1 w-[20px]  flex items-center">
                      {row.row}
                    </div>
                    <div className="flex">
                      {row.seats.map((seat) =>
                        seat.seat === 2 ? (
                          <>
                            <Seat
                              key={seat.seat}
                              seatNumber={seat.seat}
                              available={seat.available}
                            />
                            <div className="w-[50px]"></div>
                          </>
                        ) : (
                          <Seat
                            key={seat.seat}
                            seatNumber={seat.seat}
                            available={seat.available}
                          />
                        )
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
          <div>
            <p className="text-center mb-[15px] font-bold">
              PlatinumView &#x20B9;240
            </p>
            {seat.seatMatrix.map(
              (row, rowIndex) =>
                rowIndex >= 1 &&
                rowIndex <= 3 && (
                  <div
                    key={rowIndex}
                    className="flex mb-2 gap-[2rem] select-none"
                  >
                    <div className="font-bold mb-1 w-[20px] flex items-center">
                      {row.row}
                    </div>
                    <div className="flex">
                      {row.seats.map((seat) =>
                        seat.seat === 2 ||
                        seat.seat === 7 ||
                        seat.seat === 20 ? (
                          <>
                            <Seat
                              key={seat.seat}
                              seatNumber={seat.seat}
                              available={seat.available}
                            />
                            <div className="w-[50px] "></div>
                          </>
                        ) : (
                          <Seat
                            key={seat.seat}
                            seatNumber={seat.seat}
                            available={seat.available}
                          />
                        )
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
          <div>
            <p className="text-center mb-[15px] font-bold">
              SilverScreen &#x20B9;180
            </p>
            {seat.seatMatrix.map(
              (row, rowIndex) =>
                rowIndex >= 4 &&
                rowIndex <= 13 && (
                  <div
                    key={rowIndex}
                    className="flex mb-2 gap-[2rem] select-none"
                  >
                    <div className="font-bold mb-1 w-[20px] flex items-center">
                      {row.row}
                    </div>
                    <div className="flex">
                      {row.seats.map((seat) =>
                        seat.seat === 2 ||
                        seat.seat === 7 ||
                        seat.seat === 20 ? (
                          <>
                            <Seat
                              key={seat.seat}
                              seatNumber={seat.seat}
                              available={seat.available}
                            />
                            <div className="w-[50px]"></div>
                          </>
                        ) : (
                          <Seat
                            key={seat.seat}
                            seatNumber={seat.seat}
                            available={seat.available}
                          />
                        )
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
          <div>
            <p className="text-center mb-[15px] font-bold">
              CineBasics &#x20B9;180
            </p>
            {seat.seatMatrix.map(
              (row, rowIndex) =>
                rowIndex >= 14 && (
                  <div
                    key={rowIndex}
                    className="flex mb-2 gap-[2rem] select-none"
                  >
                    <div className="font-bold mb-1 w-[20px] flex items-center">
                      {row.row}
                    </div>
                    <div className="flex">
                      {row.seats.map((seat) =>
                        seat.seat === 2 || seat.seat === 7 ? (
                          <>
                            <Seat
                              key={seat.seat}
                              seatNumber={seat.seat}
                              available={seat.available}
                            />
                            <div className="w-[50px]"></div>
                          </>
                        ) : (
                          <Seat
                            key={seat.seat}
                            seatNumber={seat.seat}
                            available={seat.available}
                          />
                        )
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
        <div className="mb-[20px]">
          <img src="https://assetscdn1.paytm.com/movies_new/_next/static/media/screen-icon.8dd7f126.svg" />
        </div>
      </div>
    )
  );
}

export default SeatSelection;
