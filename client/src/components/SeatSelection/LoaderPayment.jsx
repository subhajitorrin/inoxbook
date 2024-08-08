import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import { IoTicketOutline } from "react-icons/io5";

function LoaderPayment() {
  return (
    <div className="h-screen w-full bg-[#00000086] fixed top-0 z-[50] flex items-center justify-center">
      <div className="rounded-[7px] shadow-md p-[10px] pt-[35px] bg-[#ffffff] flex items-center justify-center flex-col gap-[1rem]">
        <IoTicketOutline className="text-[100px]" />
        <p className="mb-[-20px] font-[500] text-[17px]">
          Generating Ticket...
        </p>
        <InfinitySpin
          visible={true}
          width="200"
          color="#000000"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    </div>
  );
}

export default LoaderPayment;
