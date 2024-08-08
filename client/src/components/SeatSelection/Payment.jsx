import React, { useEffect, useState } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoTicketOutline } from "react-icons/io5";
import { PiDeviceMobile } from "react-icons/pi";
import LoaderPayment from "./LoaderPayment";

function Payment({ handleBookTicket, paymentData, isLoading }) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log(paymentData);
  }, [paymentData]);

  useEffect(() => {
    const calculatedPrice =
      Math.floor(paymentData.price * paymentData.seatCount * 0.18) +
      paymentData.price * paymentData.seatCount;
    setTotalPrice(calculatedPrice);
  }, [paymentData]);

  return (
    paymentData && (
      <div className="w-full bg-white flex justify-evenly px-[2rem] relative">
        {isLoading && <LoaderPayment />}
        <div className="w-[40%]"></div>
        <div className="relative rounded-[10px] w-[20%] h-[80vh] border border-[#0000002f]  flex flex-col gap-[1rem] shadow-xl">
          <div className="flex flex-col gap-[1rem] p-[1.5rem]">
            <p className="tracking-widest text-[#f84464] font-[500]  mb-[1rem]">
              BOOKING SYMMARY
            </p>
            <p className="text-[20px] font-[500]">{paymentData.moviename}</p>
            <p className="">
              {paymentData.date} | {paymentData.time}
            </p>
            <p className="uppercase ">
              <span className="font-[500]">{paymentData.seatCategory}</span> -{" "}
              {paymentData.seats.map((item, index) => {
                return <span key={index}>{item}, </span>;
              })}
            </p>
            <p className="font-[500]">
              {paymentData.seatCount > 1 ? (
                <span>{paymentData.seatCount} Tickets</span>
              ) : (
                <span>{paymentData.seatCount} Ticket</span>
              )}{" "}
              | {paymentData.screen}
            </p>
            <div className="flex justify-between">
              <p>Ticket Price</p>
              <p className="">
                Rs. {paymentData.price * paymentData.seatCount}
              </p>
            </div>
            <div className="flex justify-between items-center border-b border-[#0000004c] pb-[1rem]">
              <p className="text-[.8rem]">GST charges @18%</p>{" "}
              <p className="text-[.8rem]">
                Rs.{" "}
                {Math.floor(paymentData.price * paymentData.seatCount * 0.18)}
              </p>
            </div>
            <div className="flex justify-between items-center font-[500]">
              <p>Total</p>
              <p>Rs. {totalPrice}</p>
            </div>
            <div className="flex justify-between my-[1rem] mb-[-10px]">
              <input
                type="text"
                className="outline-none w-[75%] border border-[#0000006e] px-[20px] py-[5px] rounded-l-[7px]"
                placeholder="*Use cupon"
              />
              <button className="w-[25%] bg-[#f84464] py-[5px] text-white rounded-r-[7px] font-[500]">
                Apply
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <IoFastFoodOutline className="text-[18px]" />{" "}
            <p className="font-[500] text-[15px]">
              *You can add Food & Beverage
            </p>
          </div>
          <div className="mt-[2rem] px-[1.5rem] flex items-center justify-between bg-[#dadada] py-[10px] font-[500] text-[17px]">
            <p className="">Payable Amount</p>
            <p>Rs. {totalPrice}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="flex gap-[5px] items-center mt-[1rem] font-[500] text-[15px]">
              * Get your E-Ticket <PiDeviceMobile className="text-[20px]" />
            </p>
          </div>
          <button
            onClick={() => {
              handleBookTicket(totalPrice);
            }}
            className="absolute bottom-0 flex justify-between px-[1rem] w-full bg-[#f84464] py-[10px] rounded-b-[10px] text-white font-[500]"
          >
            <p className="flex gap-[10px] items-center text-[1.1rem]">
              <IoTicketOutline className="text-[25px] " />
              Proceed Payment
            </p>{" "}
            <p>Rs. {totalPrice}</p>
          </button>
        </div>
      </div>
    )
  );
}

export default Payment;
