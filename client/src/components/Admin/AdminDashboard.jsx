import React, { useEffect, useMemo, useState } from "react";
import "./AdminDashboard.css";
import Dashboard from "./AdminRoutes/Dashboard";
import AddMovies from "./AdminRoutes/AddMovies";
import UpdateMovies from "./AdminRoutes/UpdateMovies";
import Schedule from "./AdminRoutes/schedule/Schedule";
import AdminDetails from "./AdminRoutes/details/AdminDetails";
import { IoIosArrowBack } from "react-icons/io";
import { Routes, Route, Link, useLocation } from "react-router-dom";

function AdminDashboard({ setisLoggedInAdmin }) {
  const navList = useMemo(
    () => [
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Add Movies", path: "/admin/addmovies" },
      { name: "Edit Movies", path: "/admin/editmovies" },
      { name: "Schedule", path: "/admin/schedule" },
      { name: "Admin Details", path: "/admin/info" },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(null);
  const [isBackActive, setisBackActive] = useState(false);
  const [toggle, settoggle] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const index = navList.findIndex((item) => item.path === currentPath);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [location, navList]);

  return (
    <div className="adminDashboardContainer">
      <div className="adminWrapper">
        <div className="sidebar">
          <div className="navList">
            <p className="welcomeText">Welcome ADMIN</p>
            {navList.map((item, index) => {
              return (
                <Link to={item.path} key={index}>
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
                  >
                    <p>{item.name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link to="/admin">
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
          </Link>
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
          <div className="adminRightBody text-white">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addmovies" element={<AddMovies />} />
              <Route
                path="/editmovies"
                element={
                  <UpdateMovies
                    setisBackActive={setisBackActive}
                    toggle={toggle}
                    settoggle={settoggle}
                  />
                }
              />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/info" element={<AdminDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
