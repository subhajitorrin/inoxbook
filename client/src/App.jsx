import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import MovieTiming from "./pages/MovieTiming";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/moviedetail/:id" element={<MovieDetail />} />
      <Route path="/timings/:id" element={<MovieTiming />} />
    </Routes>
  );
}

export default App;
