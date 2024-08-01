import React, { useEffect, useState } from "react";
import UpdateCards from "./adminComponents/UpdateCards";
import axios from "axios";
import UpdateWrapper from "./adminComponents/UpdateWrapper";
import { FadeLoader } from "react-spinners";

function UpdateMovies({ setisBackActive, toggle, settoggle }) {
  const [allMovies, setallMovies] = useState([]);
  const [toggleDelete, settoggleDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchAllMovies() {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/getallmovies");
        setallMovies(res.data.allMovies);
      } catch (error) {
        console.log("Error while fetching currentmoves", error);
      } finally {
        setIsLoading(false);
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
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <FadeLoader color="#ffffff" />
            </div>
          ) : (
            allMovies.map((item, index) => {
              return (
                <UpdateCards
                  key={index}
                  item={item}
                  settoggle={settoggle}
                  settoggleDelete={settoggleDelete}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default UpdateMovies;
