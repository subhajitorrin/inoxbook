import React from "react";
import { ToastContainer } from "react-toastify";

function ToastifyContainer() {
  return (
    <ToastContainer
      position="top-right" // Centers the toast horizontally
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}

export default ToastifyContainer;
