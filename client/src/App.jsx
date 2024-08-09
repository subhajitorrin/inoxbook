import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import MovieTiming from "./pages/MovieTiming";
import SeatSelection from "./pages/SeatSelection";
import Navbar from "./components/TopNavbar_Search/Navbar";
import Login from "./components/Login/Login";
import "./App.css";
import gsap from "gsap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastifyContainer from "./components/ToastifyContainer";
import axios from "axios";
import Admin from "./pages/Admin";
import Sidenavbar from "./components/SideNavbar/Sidenavbar";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";
import PageNotFound404 from "./pages/PageNotFound404";

function App() {
  const [toggleLogin, settoggleLogin] = useState(false);
  const [toggleSideNavbar, settoggleSideNavbar] = useState(false);
  const [wrappersArr, setWrappersArr] = useState([true, false, false, false]);
  const [user, setuser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (toggleSideNavbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [toggleSideNavbar]);

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
      const userid = localStorage.getItem("userid");
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
  }, [toggleLogin]);

  const shouldShowNavbar =
    location.pathname === "/" ||
    location.pathname.startsWith("/moviedetail") ||
    location.pathname.startsWith("/mybookings") ||
    location.pathname.startsWith("/timings");

  return (
    <div className="">
      <Login
        settoggleLogin={settoggleLogin}
        setuser={setuser}
        wrappersArr={wrappersArr}
        setWrappersArr={setWrappersArr}
      />
      <Sidenavbar
        toggleSideNavbar={toggleSideNavbar}
        settoggleSideNavbar={settoggleSideNavbar}
        user={user}
        settoggleLogin={settoggleLogin}
        setuser={setuser}
        setWrappersArr={setWrappersArr}
      />
      {shouldShowNavbar && (
        <Navbar
          settoggleLogin={settoggleLogin}
          user={user}
          settoggleSideNavbar={settoggleSideNavbar}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviedetail/:id" element={<MovieDetail />} />
        <Route path="/timings/:id" element={<MovieTiming />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/mybookings/:id" element={<MyBookings />} />
        <Route
          path="/seatmatrix/:id"
          element={
            <SeatSelection user={user} settoggleLogin={settoggleLogin} />
          }
        />
        <Route path="*" element={<PageNotFound404 />} />
      </Routes>
      <ToastifyContainer />
    </div>
  );
}

export default App;
