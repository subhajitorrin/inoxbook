import React, { useEffect, useState } from "react";
import TicketCard from "../components/MyBookings/TicketCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BeatLoader, FadeLoader } from "react-spinners";
import Footer from "../components/Footer";

function MyBookings() {
  const [ticketList, setticketList] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getAllTicketByUserId(id) {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/gettickets/${id}`);
        if (res.status === 200) {
          setticketList(res.data.tickets);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) getAllTicketByUserId(id);
  }, [id]);

  return (
    <>
      {" "}
      <div
        style={{ background: "linear-gradient(to bottom, white 10%, #dfdfdf)" }}
        className="min-h-[91.3vh] select-none"
      >
        <p className="text-center my-[10px] font-[500] pt-[1rem]">
          * Click to download your tickets
        </p>
        <div className="mb-[1rem] flex flex-wrap gap-[3rem] justify-center py-[1rem]">
          {isLoading ? (
            <div className="h-[50vh] w-full flex items-center justify-center ">
              <FadeLoader color="#0000009b" />
            </div>
          ) : ticketList.length > 0 ? (
            ticketList.map((item, index) => {
              return <TicketCard key={index} ticketId={item} />;
            })
          ) : (
            <>No tickets found</>
          )}
        </div>
        <p className="h-[10px]"></p>
      </div>
      <Footer />
    </>
  );
}

export default MyBookings;
