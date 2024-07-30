import React, { useState } from "react";
import "./AdminDashboard.css";

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
                >
                  <p key={index}>{item}</p>
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
            <p className="headerText">Admin Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
