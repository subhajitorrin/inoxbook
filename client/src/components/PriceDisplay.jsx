import React from "react";

function PriceDisplay({ price, counter, pricecategory }) {
  return (
    <div className="border-t border-[#00000026] items-center h-[110px] bg-white w-full fixed bottom-0 px-[25%] flex justify-between ">
      <div className="">
        <div className="font-bold text-[22px]">
          &#8377;<span>{price}</span>
        </div>
        <div className="text-[#00000078]">
          Ticket {counter} x {pricecategory}
        </div>
      </div>
      <button className="bg-black text-white font-bold px-[60px] h-[60px] rounded-[10px]">
        Book Ticket
      </button>
    </div>
  );
}

export default PriceDisplay;
