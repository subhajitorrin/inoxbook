import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import Dashboard from "./AdminRoutes/Dashboard";
import AddMovies from "./AdminRoutes/AddMovies";
import UpdateMovies from "./AdminRoutes/UpdateMovies";
import DeleteMovies from "./AdminRoutes/DeleteMovies";
import Schedule from "./AdminRoutes/Schedule";
import AdminDetails from "./AdminRoutes/AdminDetails";

function AdminDashboard({ setisLoggedInAdmin }) {
  const navList = [
    "Dashboard",
    "Add Movies",
    "Update Movies",
    "Delete Movies",
    "Schedule",
    "Admin Details",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  function renderContent() {
    switch (activeIndex) {
      case 0:
        return <Dashboard />;
      case 1:
        return <AddMovies />;
      case 2:
        return <UpdateMovies />;
      case 3:
        return <DeleteMovies />;
      case 4:
        return <Schedule />;
      case 5:
        return <AdminDetails />;
    }
  }

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
            onClick={() => setisLoggedInAdmin(false)}
          >
            Logout
          </div>
        </div>
        <div className="mainContent">
          <div className="header">
            <p className="headerText">ADMIN PANEL</p>
          </div>
          <div className="adminRightBody text-white">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
