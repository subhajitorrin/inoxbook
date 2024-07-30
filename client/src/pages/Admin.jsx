import React, { useState } from "react";
import AdminLogin from "../components/Admin/AdminLogin";
import AdminDashboard from "../components/Admin/AdminDashboard";
import { Routes, Route } from "react-router-dom";

function Admin() {
  const [isLoggedInAdmin, setisLoggedInAdmin] = useState(false);
  return (
    <div className="">
      {isLoggedInAdmin ? <AdminDashboard setisLoggedInAdmin={setisLoggedInAdmin}/> : <AdminLogin setisLoggedInAdmin={setisLoggedInAdmin}/>}
    </div>
  );
}

export default Admin;
