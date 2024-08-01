import React, { useEffect, useState } from "react";
import AdminLogin from "../components/Admin/AdminLogin";
import AdminDashboard from "../components/Admin/AdminDashboard";

function Admin() {
  const [isLoggedInAdmin, setisLoggedInAdmin] = useState(false);
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (isAdminLoggedIn) {
      setisLoggedInAdmin(true);
    }
  }, []);
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
