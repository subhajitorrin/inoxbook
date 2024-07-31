import axios, { all } from "axios";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [allMovies, setallMovies] = useState([]);
  const [totalMovies, settotalMovies] = useState(0);
  useEffect(() => {
    async function fetchAllMovies() {
      try {
        const res = await axios.get("http://localhost:5000/getallmovies");
        setallMovies(res.data.allMovies);
      } catch (error) {
        console.log("Error while fetching currentmoves", error);
      }
    }
    fetchAllMovies();
  }, []);

  useEffect(() => {
    settotalMovies(allMovies.length);
  }, [allMovies]);
  return (
    <div className="h-full w-full p-[3%] ">
      <div className="border border-white h-[150px] w-[150px] rounded-[10px] flex items-center flex-col justify-center">
        <p className="text-[50px] font-bold ">{totalMovies}</p>
        <p className="text-[20px] font-[500]">Total Movies</p>
      </div>
    </div>
  );
}

export default Dashboard;
