import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Screen from "./Screen";

function AdminDetails() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [theaterId, settheaterId] = useState(null);
  const [screenList, setScreenList] = useState([]);
  const [toggleFetchScreens, settoggleFetchScreens] = useState(false);

  useEffect(() => {
    const theaterId = localStorage.getItem("theaterId");
    settheaterId(theaterId);
    async function getTheaterDetails() {
      const res = await axios.get(
        `http://localhost:5000/admin/getthertheater/${theaterId}`
      );
      if (res.status === 200) {
        setName(res.data.theater.name);
        setAddress(res.data.theater.address);
        setLocation(res.data.theater.location);
      }
    }
    if (theaterId) getTheaterDetails();
  }, []);

  async function handleUpdateTheaterDetails() {
    if (name !== "" && address !== "" && location !== "" && theaterId) {
      try {
        const response = await axios.put(
          `http://localhost:5000/admin/updatetheater/${theaterId}`,
          {
            name,
            address,
            location,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Details updated");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error updating details");
      }
    } else {
      toast.error("All fields must be filled");
    }
  }

  async function handleAddScreen() {
    const newScreen = {
      theaterId,
      tempid: new Date(),
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/addscreen",
        newScreen
      );
      if (response.status === 200) {
        settoggleFetchScreens((prev) => !prev);
        toast.success("Screen added successfully");
      }
    } catch (error) {
      console.error("Error adding screen:", error);
    }
  }

  useEffect(() => {
    async function getAllScreens() {
      try {
        const res = await axios.get(`http://localhost:5000/getallscreens`);
        setScreenList(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllScreens();
  }, [toggleFetchScreens]);

  return (
    <div className="h-full w-full p-[3%] flex justify-evenly">
      {/* theater details */}
      <div className="flex flex-col gap-[2rem] w-[440px]">
        <p className="pb-[10px] text-center font-bold text-[18px] border-b border-[#ffffff61]">
          Theater Detail
        </p>
        <div className="flex items-center gap-[1rem]">
          <p className="text-[15px]  w-[150px]">Theater Name</p>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            name=""
            id=""
            value={name}
            className="h-[40px] rounded-[5px] px-[20px] w-[280px] outline-none"
            placeholder="Enter theater name"
          />
        </div>
        <div className="flex  gap-[1rem]">
          <p className="text-[15px]  w-[150px]">Theater Address</p>
          <textarea
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            name=""
            id=""
            cols="30"
            value={address}
            rows="3"
            className="bg-transparent p-[20px] border border-white rounded-[7px] outline-none"
            placeholder="Enter theater address"
          ></textarea>
        </div>
        <div className="flex items-center gap-[1rem]">
          <p className="text-[15px]  w-[150px]">Location</p>
          <input
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            type="text"
            name=""
            id=""
            value={location}
            className="h-[40px] rounded-[5px] px-[20px] w-[280px] outline-none"
            placeholder="Enter theater city"
          />
        </div>
        <div className=" flex flex-col gap-[10px]">
          <button
            onClick={handleUpdateTheaterDetails}
            className="w-full py-[5px] rounded-[7px] bg-[green]"
          >
            Save
          </button>
        </div>
      </div>
      {/* screen details */}
      <div className="w-[440px] flex flex-col gap-[2rem] overflow-y-auto scrollNone">
        <p className="pb-[10px] text-center font-bold text-[18px] border-b border-[#ffffff61]">
          Screens Detail
        </p>
        {screenList.map((item, index) => {
          return (
            <Screen
              key={index}
              screenData={item}
              theaterId={theaterId}
              settoggleFetchScreens={settoggleFetchScreens}
            />
          );
        })}
        <button
          className="w-full py-[5px] bg-[#ff6200] rounded-[7px]"
          onClick={handleAddScreen}
        >
          Add screen
        </button>
      </div>
    </div>
  );
}

export default AdminDetails;
