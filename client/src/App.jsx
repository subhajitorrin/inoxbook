import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import MovieTiming from "./pages/MovieTiming";
import SeatSelection from "./pages/SeatSelection";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import "./App.css";
import gsap from "gsap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastifyContainer from "./components/ToastifyContainer";

function App() {
  const [toggleLogin, settoggleLogin] = useState(false);
  const [user, setuser] = useState(null)
  useEffect(() => {
    if (toggleLogin) {
      gsap.to("#loginContainer", {
        opacity: 1,
        pointerEvents: "auto",
      });
      gsap.to("#loginWrapper", {
        top: "20%",
        opacity: 1,
        duration: 0.5,
      });
    } else {
      gsap.to("#loginContainer", {
        opacity: 0,
        pointerEvents: "none",
      });
      gsap.to("#loginWrapper", {
        top: "-20%",
        opacity: 0,
        duration: 0.5,
      });
    }
  }, [toggleLogin]);
  return (
    <div className="">
      <Login settoggleLogin={settoggleLogin} setuser={setuser}/>
      <Routes>
        <Route path="/" element={<Home settoggleLogin={settoggleLogin} />} />
        <Route path="/moviedetail/:id" element={<MovieDetail />} />
        <Route path="/timings/:id" element={<MovieTiming />} />
        <Route path="/seatmatrix/:id" element={<SeatSelection />} />
      </Routes>
      <ToastifyContainer />
    </div>
  );
}

export default App;
