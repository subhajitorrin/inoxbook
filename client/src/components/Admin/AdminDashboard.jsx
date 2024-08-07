import React, { useEffect, useMemo, useState } from "react";
import "./AdminDashboard.css";
import Dashboard from "./AdminRoutes/Dashboard";
import AddMovies from "./AdminRoutes/AddMovies";
import UpdateMovies from "./AdminRoutes/UpdateMovies";
import Schedule from "./AdminRoutes/schedule/Schedule";
import AdminDetails from "./AdminRoutes/details/AdminDetails";
import { IoIosArrowBack } from "react-icons/io";

function AdminDashboard({ setisLoggedInAdmin }) {
  const navList = [
    "Dashboard",
    "Add Movies",
    "Edit Movies",
    "Schedule",
    "Admin Details",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isBackActive, setisBackActive] = useState(false);
  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    const savedIndex = localStorage.getItem("activeIndex");
    if (savedIndex) {
      setActiveIndex(Number(savedIndex));
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("activeIndex", activeIndex);
  // }, [activeIndex]);

  function renderContent() {
    switch (activeIndex) {
      case 0:
        return <Dashboard />;
      case 1:
        return <AddMovies />;
      case 2:
        return (
          <UpdateMovies
            setisBackActive={setisBackActive}
            toggle={toggle}
            settoggle={settoggle}
          />
        );
      case 3:
        return <Schedule />;
      case 4:
        return <AdminDetails />;
    }
  }

  // useEffect(() => {
  //   window.addEventListener("beforeunload", (event) => {
  //     setisLoggedInAdmin(false);
  //     localStorage.removeItem("updateMovieId");
  //     localStorage.removeItem("isAdminLoggedIn");
  //     localStorage.removeItem("activeIndex");
  //     localStorage.removeItem("theaterId");
  //   });
  // }, []);

  return (
    <div className="adminDashboardContainer">
      <div className="adminWrapper">
        <div className="sidebar">
          <div className="navList">
            <p className="welcomeText">Welcome ADMIN</p>
            {navList.map((item, index) => {
              return (
                <div
                  className={`navItem`}
                  style={{
                    border:
                      activeIndex === index
                        ? "1px solid rgba(255, 255, 255, 0.7)"
                        : "1px solid transparent",
                  }}
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                  key={index}
                >
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
          <div
            className="logoutButton"
            onClick={() => {
              setisLoggedInAdmin(false);
              localStorage.removeItem("updateMovieId");
              localStorage.removeItem("isAdminLoggedIn");
              localStorage.removeItem("activeIndex");
              localStorage.removeItem("theaterId");
            }}
          >
            Logout
          </div>
        </div>
        <div className="mainContent">
          <div className="header relative">
            {isBackActive && activeIndex === 2 && (
              <IoIosArrowBack
                className="text-[30px] cursor-pointer absolute left-[2.5%]"
                onClick={() => {
                  settoggle(false);
                  setisBackActive(false);
                }}
              />
            )}
            <p className="headerText">ADMIN PANEL</p>
          </div>
          <div className="adminRightBody text-white">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
