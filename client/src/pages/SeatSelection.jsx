import React, { useEffect, useState } from "react";
import seatmatrixarr from "../data/seating.json";
import Seat from "../components/Seat";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SeatSelection({ user, settoggleLogin }) {
  const [pricelist, setpricelist] = useState([330, 240, 180, 150]);
  const [displaySeatWarning, setdisplaySeatWarning] = useState(false);
  const [toggleUpdateSeatMatrix, settoggleUpdateSeatMatrix] = useState(false);
  const [priceListIndex, setpriceListIndex] = useState(0);
  const [price, setprice] = useState(0);
  const [isSeatSelected, setIsSeatSelected] = useState({
    counter: 0,
    seatids: [],
  });
  const [seatmatrix, setseatmatrix] = useState([]);
  const [movieDetail, setmovieDetail] = useState(null);
  const [theaterDetail, settheaterDetail] = useState(null);
  const [params, setparams] = useState([]);
  const [seat, setseat] = useState(null);
  const [timingobj, setTimingobj] = useState({
    weekday: "",
    month: "",
    day: "",
  });
  const navigate = useNavigate();
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
    async function getSeatmatrixById() {
      try {
        if (params.length > 0) {
          const res = await axios.get(
            `http://localhost:5000/getseatmatrixbyid/${params[1]}`
          );
          setseatmatrix(res.data.seatmatrix);
        }
      } catch (error) {
        console.log("Error while fetching movie detail", error);
      }
    }
    getSeatmatrixById();
  }, [params, toggleUpdateSeatMatrix]);

  useEffect(() => {
    setseat(seatmatrixarr[0]);
  }, [seatmatrixarr]);

  function formatDate(dateStr) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = dateStr.slice(6, 8);
    const month = monthNames[parseInt(dateStr.slice(4, 6), 10) - 1];
    const year = dateStr.slice(0, 4);
    return `${day} ${month} ${year}`;
  }

  function formatDateWord(dateInput) {
    const date = new Date(dateInput);
    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const weekday = weekdays[date.getUTCDay()];
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();

    setTimingobj({
      weekday: weekday,
      month: month,
      day: day,
    });
  }

  useEffect(() => {
    if (params.length > 0) {
      // console.log(params[3]);
      formatDateWord(formatDate(params[3]));
    }
  }, [params]);

  function getPriceBySeatId(seatid) {
    if (seatid >= 0 && seatid <= 17) {
      setpriceListIndex(0);
      return 330;
    } else if (seatid >= 18 && seatid <= 89) {
      setpriceListIndex(1);
      return 240;
    } else if (seatid >= 90 && seatid <= 301) {
      setpriceListIndex(2);
      return 180;
    } else {
      setpriceListIndex(3);
      return 150;
    }
  }

  useEffect(() => {
    function handlePriceCalculation() {
      let tempprice = 0;
      isSeatSelected.seatids.map((item, index) => {
        tempprice += getPriceBySeatId(item);
        setprice(tempprice);
      });
    }
    handlePriceCalculation();
  }, [isSeatSelected]);

  async function handleBookTicket() {
    if (!user) {
      settoggleLogin(true);
      return;
    }
    try {
      if (isSeatSelected.seatids.length > 0 && params) {
        const ticketDetail = {
          moviename: movieDetail.title,
          language: "Hindi",
          date: formatDate(params[3]),
          time: params[4],
          theater: theaterDetail.name,
          seatCount: isSeatSelected.counter,
          seatCategory: "SilverScreen",
          price: price,
          screen: "Screen 1",
        };
        const response = await axios.post(
          "http://localhost:5000/bookticket",
          {
            showid: params[1],
            seats: isSeatSelected.seatids,
            userId: user.userId,
            ticketDetail,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        settoggleUpdateSeatMatrix((prev) => !prev);
        setIsSeatSelected({
          counter: 0,
          seatids: [],
        });
        setprice(0);
        if (response.status === 200) {
          toast.success("Booking Successfull");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  if (!seat) {
    return;
  }
  return (
    seatmatrix.length > 0 &&
    params.length > 0 &&
    movieDetail &&
    theaterDetail && (
      <div className="w-full flex items-center flex-col gap-[3rem] select-none">
        <div className=" bg-black w-full py-[1rem] relative">
          <div className="text-white  text-[40px] absolute  cursor-pointer left-[20%] top-[25%]">
            <MdOutlineKeyboardArrowLeft
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
          <div className="">
            <p className="font-bold text-[22px] text-white text-center">
              {movieDetail.title}
            </p>
            <p className="text-center text-white text-[15px] ">
              <span>{formatDate(params[3])}</span>, <span>{params[4]}</span> at{" "}
              <span>{theaterDetail.name}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between w-[60%] items-center ">
          <div className="flex gap-[2rem] items-center">
            <div className="font-bold">
              <div className="text-[20px]">
                <p className="text-[#878787] text-[15px]">
                  {timingobj.weekday}
                </p>
                <p className="text-[18px] mt-[-5px]">
                  {timingobj.day} {timingobj.month}
                </p>
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
              StarSuite &#x20B9;{pricelist[0]}
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
                      {row.seats.map((seat, index) =>
                        seat.seat === 2 ? (
                          <span key={index * 2}>
                            <Seat
                              key={seat.seat}
                              seatNumber={seat.seat}
                              available={seatmatrix[seat.id]}
                              seatid={seat.id}
                              setIsSeatSelected={setIsSeatSelected}
                              alreadySelected={isSeatSelected.counter}
                              setdisplaySeatWarning={setdisplaySeatWarning}
                            />
                            <div className="w-[70px]"></div>
                          </span>
                        ) : (
                          <Seat
                            key={seat.seat}
                            seatNumber={seat.seat}
                            available={seatmatrix[seat.id]}
                            seatid={seat.id}
                            setIsSeatSelected={setIsSeatSelected}
                            alreadySelected={isSeatSelected.counter}
                            setdisplaySeatWarning={setdisplaySeatWarning}
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
              PlatinumView &#x20B9;{pricelist[1]}
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
                      {row.seats.map((seat, index) =>
                        seat.seat === 2 ||
                        seat.seat === 7 ||
                        seat.seat === 20 ? (
                          <span key={`orrin-${index}`}>
                            <Seat
                              key={seat.seat}
                              seatNumber={seat.seat}
                              available={seatmatrix[seat.id]}
                              seatid={seat.id}
                              setIsSeatSelected={setIsSeatSelected}
                              alreadySelected={isSeatSelected.counter}
                              setdisplaySeatWarning={setdisplaySeatWarning}
                            />
                            <div className="w-[70px] "></div>
                          </span>
                        ) : (
                          <Seat
                            key={seat.seat}
                            seatNumber={seat.seat}
                            available={seatmatrix[seat.id]}
                            seatid={seat.id}
                            setIsSeatSelected={setIsSeatSelected}
                            alreadySelected={isSeatSelected.counter}
                            setdisplaySeatWarning={setdisplaySeatWarning}
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
              SilverScreen &#x20B9;{pricelist[2]}
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
                      {row.seats.map((seat, index) =>
                        seat.seat === 2 ||
                        seat.seat === 7 ||
                        seat.seat === 20 ? (
                          <span key={`orrin1-${index}`}>
                            <Seat
                              key={seat.seat}
                              seatNumber={seat.seat}
                              available={seatmatrix[seat.id]}
                              seatid={seat.id}
                              setIsSeatSelected={setIsSeatSelected}
                              alreadySelected={isSeatSelected.counter}
                              setdisplaySeatWarning={setdisplaySeatWarning}
                            />
                            <div className="w-[70px]"></div>
                          </span>
                        ) : (
                          <Seat
                            key={seat.seat}
                            seatNumber={seat.seat}
                            available={seatmatrix[seat.id]}
                            seatid={seat.id}
                            setIsSeatSelected={setIsSeatSelected}
                            alreadySelected={isSeatSelected.counter}
                            setdisplaySeatWarning={setdisplaySeatWarning}
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
              CineBasics &#x20B9;{pricelist[3]}
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
                      {row.seats.map((seat, index) =>
                        seat.seat === 2 || seat.seat === 7 ? (
                          <div key={`orrin2-${index}`}>
                            <Seat
                              key={seat.seat}
                              seatNumber={seat.seat}
                              available={seatmatrix[seat.id]}
                              seatid={seat.id}
                              setIsSeatSelected={setIsSeatSelected}
                              alreadySelected={isSeatSelected.counter}
                              setdisplaySeatWarning={setdisplaySeatWarning}
                            />
                            <div className="w-[70px]"></div>
                          </div>
                        ) : (
                          <Seat
                            key={seat.seat}
                            seatNumber={seat.seat}
                            available={seatmatrix[seat.id]}
                            seatid={seat.id}
                            setIsSeatSelected={setIsSeatSelected}
                            alreadySelected={isSeatSelected.counter}
                            setdisplaySeatWarning={setdisplaySeatWarning}
                          />
                        )
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <img src="https://assetscdn1.paytm.com/movies_new/_next/static/media/screen-icon.8dd7f126.svg" />
        </div>
        {isSeatSelected.counter > 0 && (
          <div className="h-[60px] bg-transparent w-full "></div>
        )}
        {isSeatSelected.counter > 0 && (
          <div className="border-t border-[#00000026] items-center h-[110px] bg-white w-full fixed bottom-0 px-[25%] flex justify-between ">
            <div className="">
              <div className="font-bold text-[22px]">
                &#8377;<span>{price}</span>
              </div>
              <div className="text-[#00000078]">
                <p>Total Tickets {isSeatSelected.counter}</p>
              </div>
            </div>
            <p
              style={{ opacity: displaySeatWarning ? "1" : "0" }}
              className="text-[#00000078] transition-opacity duration-200 ease-linear"
            >
              *A maximum of 10 seats can be selected
            </p>
            <button
              className="bg-black text-white font-bold px-[60px] h-[60px] rounded-[10px]"
              onClick={handleBookTicket}
            >
              Book Ticket
            </button>
          </div>
        )}
      </div>
    )
  );
}

export default SeatSelection;
