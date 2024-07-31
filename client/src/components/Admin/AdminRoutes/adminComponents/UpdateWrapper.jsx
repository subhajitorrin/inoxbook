import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AddMovies from "../AddMovies";

function UpdateWrapper({ movieData }) {
  return <AddMovies isUpdate={true} movieData={movieData} />;
}

export default UpdateWrapper;
