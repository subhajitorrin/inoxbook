import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import axios from "axios";

function App() {
  const [toggleLogin, settoggleLogin] = useState(false);
  const [user, setuser] = useState(null);
  const location = useLocation();
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
  useEffect(() => {
    async function getUserAtRender() {
      const userid = localStorage.getItem("userId");
      if (!userid) return;
      try {
        const serverRes = await axios.post(
          `http://localhost:5000/getuser`,
          {
            userid,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (serverRes.status === 200) {
          setuser(serverRes.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getUserAtRender();
  }, []);
  const shouldHideNavbar = location.pathname.startsWith("/seatmatrix");
  return (
    <div className="">
      <Login settoggleLogin={settoggleLogin} setuser={setuser} />
      {!shouldHideNavbar && (
        <Navbar settoggleLogin={settoggleLogin} user={user} setuser={setuser} />
      )}
      <Routes>
        <Route path="/" element={<Home settoggleLogin={settoggleLogin} />} />
        <Route path="/moviedetail/:id" element={<MovieDetail />} />
        <Route path="/timings/:id" element={<MovieTiming />} />
        <Route
          path="/seatmatrix/:id"
          element={
            <SeatSelection user={user} settoggleLogin={settoggleLogin} />
          }
        />
      </Routes>
      <ToastifyContainer />
    </div>
  );
}

export default App;
