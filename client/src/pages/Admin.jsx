import React, { useEffect, useState } from "react";
import AdminLogin from "../components/Admin/AdminLogin";
import AdminDashboard from "../components/Admin/AdminDashboard";

function Admin() {
  const [isLoggedInAdmin, setisLoggedInAdmin] = useState(null);
  useEffect(() => {
    function isAdminLoggedIn() {
      const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
      if (isAdminLoggedIn) {
        setisLoggedInAdmin(true);
      } else {
        setisLoggedInAdmin(false);
      }
    }
    isAdminLoggedIn();
  }, []);

  if (isLoggedInAdmin === null) {
    return <div className="h-screen bg-[#111111]"></div>;
  }

  return (
    <div className="">
      {isLoggedInAdmin ? (
        <AdminDashboard setisLoggedInAdmin={setisLoggedInAdmin} />
      ) : (
        <AdminLogin setisLoggedInAdmin={setisLoggedInAdmin} />
      )}
    </div>
  );
}

export default Admin;
