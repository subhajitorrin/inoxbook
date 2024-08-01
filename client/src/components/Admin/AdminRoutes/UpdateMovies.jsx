import React, { useEffect, useState } from "react";
import UpdateCards from "./adminComponents/UpdateCards";
import axios from "axios";
import UpdateWrapper from "./adminComponents/UpdateWrapper";

function UpdateMovies({ setisBackActive, toggle, settoggle }) {
  const [allMovies, setallMovies] = useState([]);
  const [toggleDelete, settoggleDelete] = useState(false);

  useEffect(() => {
    async function fetchAllMovies() {
      try {
        const res = await axios.get("http://localhost:5000/getallmovies");
        setallMovies(res.data.allMovies);
      } catch (error) {
        console.log("Error while fetching currentmoves", error);
      }
    }
    fetchAllMovies();
  }, [toggle, toggleDelete]);

  return (
    <div className="h-full w-full flex flex-wrap overflow-auto justify-center gap-[2rem]">
      {toggle ? (
        <UpdateWrapper setisBackActive={setisBackActive} />
      ) : (
        <div className="flex flex-wrap gap-[2rem] w-full justify-center py-[3%]">
          {allMovies.map((item, index) => {
            return (
              <UpdateCards
                key={index}
                item={item}
                settoggle={settoggle}
                settoggleDelete={settoggleDelete}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UpdateMovies;
