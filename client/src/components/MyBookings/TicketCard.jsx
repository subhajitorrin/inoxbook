import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import domtoimage from "dom-to-image";

function TicketCard({ ticketId }) {
  const [ticket, setTicket] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [poster, setPoster] = useState(null);
  const ticketRef = useRef(null);
  useEffect(() => {
    async function fetchTicketDetail(ticketId) {
      try {
        const res = await axios.get(
          `http://localhost:5000/getticketbyid/${ticketId}`
        );
        if (res.status === 200) {
          setTicket(res.data.ticket);
          setMovieId(res.data.ticket.movieId);
        }
      } catch (error) {
        console.log("Error while fetchig ticket", error);
      }
    }
    if (ticketId) fetchTicketDetail(ticketId);
  }, [ticketId]);

  useEffect(() => {
    async function fetchPoster(movieId) {
      try {
        const res = await axios.get(
          `http://localhost:5000/getposter/${movieId}`
        );
        if (res.status === 200) {
          setPoster(res.data.poster);
        }
      } catch (err) {
        console.log("Error while fetching poster", err);
      }
    }
    if (movieId) fetchPoster(movieId);
  }, [movieId]);

  async function handleDownloadTicket() {
    if (ticketRef.current) {
      try {
        const data = await domtoimage.toJpeg(ticketRef.current);
        let link = document.createElement("a");
        link.download = `Ticket-${ticket.bookingId}`;
        link.href = data;
        link.click();
      } catch (err) {
        console.log("Error while download ticket", err);
      }
    }
  }

  return (
    ticket &&
    movieId &&
    poster && (
      <div
        ref={ticketRef}
        className="bg-white shadow-lg cursor-pointer select-none gap-[1rem] rounded-[10px] p-[1.5rem] h-[550px] w-[380px] border border-[#00000030] flex flex-col justify-between"
        onClick={handleDownloadTicket}
      >
        <div className="h-[45%] w-full flex gap-[1rem] ">
          <div className="rounded-[10px] w-[150px] h-[100%] overflow-hidden">
            <img src={poster} alt="" className="h-full object-cover" />
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="text-[20px] font-[500]">{ticket.moviename}</p>
            <p>
              {ticket.language} {"2D"}
            </p>
            <p>
              {ticket.date} | {ticket.time}
            </p>
            <p>{ticket.theater}</p>
          </div>
        </div>
        <div className="">
          <p className="w-full bg-[#e4e4e4] rounded-[10px] py-[5px] text-center my-[10px]">
            Have a great time watching the movie!
          </p>
        </div>
        <div className="flex min-h-[30%] w-full ">
          <div className="w-[130px] flex justify-center mt-[1rem]">
            <div className="">
              <QRCode
                size={100}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={ticket.bookingId}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[10px] text-center flex-1 ">
            {ticket.seatCount > 1 ? (
              <p>{ticket.seatCount}Ticket(s)</p>
            ) : (
              <p>{ticket.seatCount}Ticket</p>
            )}
            <p className="font-[500] text-[1.1rem]">{ticket.screen}</p>
            <p className="uppercase flex-wrap">
              {ticket.seatCategory} -{" "}
              {ticket.seats.map((item, index) => {
                return <span key={index}>{item}, </span>;
              })}
            </p>
            <p className="font-[500] uppercase">
              booking id: {ticket.bookingId}
            </p>
          </div>
        </div>
        <div className="flex justify-between text-[.9rem] font-[500]">
          <p className="">Total Amount</p>
          <p>Rs.{ticket.price * ticket.seatCount}.00</p>
        </div>
      </div>
    )
  );
}

export default TicketCard;
