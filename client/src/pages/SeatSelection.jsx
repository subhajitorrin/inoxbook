import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import HeaderSeatSelection from "../components/SeatSelection/HeaderSeatSelection";
import SeatFlagHeader from "../components/SeatSelection/SeatFlagHeader";
import SeatCategory from "../components/SeatSelection/SeatCategory";
import Seat from "../components/SeatSelection/Seat";
import BookingTicket from "../components/SeatSelection/BookingTicket";
import { toast } from "react-toastify";

function SeatSelection({ user, settoggleLogin }) {
  const navigate = useNavigate();
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
  const [isBookingPage, setIsBookingPage] = useState(false);
  const [alreadyBookedList, setAlreadyBookedList] = useState([]);
  const [toggle, settoggle] = useState(false);

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
      setAlreadyBookedList(res.data.schedule.bookedSeats);
      const screenres = await axios.get(
        `http://localhost:5000/getscreenbyid/${res.data.schedule.screen}`
      );
      // console.log(screenres);
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
  }, [scheduleId, toggle]);

  useEffect(() => {
    if (selectedCategory.length > 0 && activeCategory && activeCategory.price) {
      const price = activeCategory.price;
      const n = selectedCategory.length;
      setTotalPrice(price * n);
    }
  }, [selectedCategory, activeCategory]);

  function formatDate(date) {
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    const monthList = [
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
    return `${day} ${monthList[parseInt(month) - 1]}`;
  }

  function getWeekday(date) {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6) - 1;
    const day = date.slice(6, 8);
    const dateObj = new Date(year, month, day);
    const weekdayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekdayList[dateObj.getDay()];
  }

  async function blockTheSeats() {
    let seatsarr = [];
    selectedCategory.forEach((item) => {
      seatsarr.push({ row: item.row, seat: item.seatNumber });
    });
    const res = await axios.post("http://localhost:5000/blockseats", {
      scheduleId,
      bookedSeats: seatsarr,
    });
    settoggle((prev) => !prev);
    if (res.status === 200) {
      return true;
    }

    if (res.status === 201) {
      toast.warn("Seat is alredy booked!");
      return false;
    }

    if (res.status === 400) {
      return false;
    }
  }

  useEffect(() => {
    // Load Razorpay SDK script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script tag
      document.body.removeChild(script);
    };
  }, []);

  async function handlePayment() {
    return new Promise((resolve, reject) => {
      const options = {
        key: "rzp_test_7cs83Ikm791P0j",
        amount: parseInt(totalPrice * 100),
        currency: "INR",
        name: "INOXBOOK",
        description: "Book your seat",
        image: "",
        handler: (response) => {
          // Handle successful payment
          // console.log(response);
          // navigate("/");
          // toast.success("Ticket booking successful");
          resolve(true);
        },
        prefill: {
          name: "Subhajit Ghosh",
          email: "clashwithsubhajit6@gmail.com",
          contact: "9800952875",
        },
        notes: {
          address: "Junbedia, Bankura",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: () => {
            // Handle payment cancellation
            resolve(false);
          },
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    });
  }

  async function handleBookTicket() {
    if (!user) {
      settoggleLogin(true);
      return;
    }

    const blockRes = await blockTheSeats();
    if (!blockRes) {
      return;
    }
    const paymentRes = await handlePayment();
    if (!paymentRes) {
      toast.warning("Payment failed!");
      return;
    }

    let starIdsArr = [];
    selectedCategory.forEach((item) => {
      starIdsArr.push(item.seatid);
    });
    const dateWeekDay = `${getWeekday(date)}, ${formatDate(date)}`;
    const obj = {
      moviename: movieDetail.title,
      language: "Hindi",
      date: dateWeekDay,
      time: time,
      theater: `${theaterDetail.name}, ${theaterDetail.location}`,
      seatCount: selectedCategory.length,
      seatCategory: activeCategory.categoryname,
      price: activeCategory.price,
      screen: screen.name,
      seats: starIdsArr,
    };

    try {
      const res = await axios.post("http://localhost:5000/bookticket", obj);
      if (res.status === 200) {
        setSelectedCategory([]);
        setactiveCategory(null);
        toast.success("Ticket booking successfull");
        navigate("/");
      } else if (202) {
        toast.warn("Try again later!");
      }
    } catch (Err) {
      console.log("Error while booking ticket", Err);
    }
  }
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
                alreadyBookedList={alreadyBookedList}
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
              <button
                className="px-[2rem] py-[1rem] bg-black rounded-[7px] text-white font-[500]"
                onClick={handleBookTicket}
              >
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
