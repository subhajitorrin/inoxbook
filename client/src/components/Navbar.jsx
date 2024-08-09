import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RiArrowDropDownFill } from "react-icons/ri";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoTicketOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOpenInNew } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar({ settoggleLogin, user, settoggleSideNavbar }) {
  const [movieName, setMovieName] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  async function handleSearchMovie() {
    const query = movieName.trim();
    if (query.length === 0) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/searchmovie?query=${query}`
      );
      setResult(res.data);
    } catch (err) {
      console.log("Error while searching movie", err);
    }
  }

  useEffect(() => {
    handleSearchMovie();
  }, [movieName]);

  function formatMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}hr ${mins}m`;
  }

  useEffect(() => {
    if (movieName.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [movieName]);

  return (
    <div className="z-[90] bg-white w-full select-none flex justify-between items-center text-[14px] font-[500] py-[1rem] px-[15%]">
      <div
        className="flex items-center text-[20px] cursor-pointer"
        onClick={() => {
          navigate(`/`);
        }}
      >
        INOX{" "}
        <div className="text-[30px]">
          <IoTicketOutline />
        </div>{" "}
        BOOK
      </div>
      <div className=" border border-[#bcbcbc] rounded-[20px] items-center flex h-[40px]">
        {movieName.length > 0 && (
          <div className=" flex justify-center transition-all ease-linear duration-200 h-screen fixed w-full top-[7%] left-0 z-[100] bg-white">
            <div className="scrollNone flex flex-col gap-[20px] py-[1rem] max-h-[90vh] overflow-y-auto top-[8%] z-[101]  w-[60%] bg-white rounded-[5px]">
              {result &&
                result.map((item, index) => {
                  return (
                    <Link to={`moviedetail/${item._id}`}>
                      <div
                        onClick={() => {
                          setMovieName("");
                        }}
                        key={index}
                        className="hover:bg-[#d3d3d3] relative transition-all ease-linear duration-200 hover:border-transparent border-b border-[#00000039] rounded-[7px] py-[10px] px-[2rem] flex gap-[20px] items-start cursor-pointer"
                      >
                        <div className="h-[200px] w-[130px] rounded-[5px] overflow-hidden">
                          <img
                            src={item.posterUrl}
                            alt=""
                            className=" h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-[3px]">
                          <p className="text-[17px]">
                            {item.title} •{" "}
                            <span className="text-[.9rem]">
                              {item.CBFCratnig}
                            </span>
                          </p>
                          <p>
                            <span className="">IMDB</span>
                            {item.rating}
                          </p>
                          <p className="text-[15px]">{item.releaseDate}</p>
                          <div className="flex gap-[10px]">
                            {item.genre.map((gen, i) => {
                              return (
                                <p
                                  key={`${index}-${i}`}
                                  className="border border-black text-center px-[10px] py-[3px] rounded-[5px]"
                                >
                                  {gen}
                                </p>
                              );
                            })}
                          </div>
                          <div className="flex gap-[10px]">
                            {item.language.map((lan, i) => {
                              return (
                                <p key={`${index}-${i}`} className="">
                                  {lan}
                                </p>
                              );
                            })}
                          </div>
                          <p>{formatMinutesToHours(item.duration)}</p>
                        </div>
                        <div className="h-full absolute right-0 flex items-center mr-[2rem]">
                          <MdOpenInNew className="text-[20px]" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
        <input
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
          value={movieName}
          className="w-[500px] h-full outline-none px-[20px] rounded-l-[20px]"
          placeholder="Search movie to watch in theater..."
        />
        <div
          className=" w-[30px] flex justify-center"
          onClick={() => {
            setMovieName("");
          }}
        >
          {movieName.length > 0 && (
            <RxCross2 className="text-[20px] cursor-pointer " />
          )}
        </div>
        <button
          onClick={handleSearchMovie}
          className="text-[#000000] text-[20px] font-bold items-center w-[40px] flex justify-center"
        >
          <IoIosSearch />
        </button>
      </div>
      <div className="text-[15px] flex items-center gap-[20px] justify-end">
        <button className="flex items-center gap-[3px]">
          Kolkata
          <div className="relative text-[20px] top-[1px]">
            <RiArrowDropDownFill />
          </div>
        </button>
        {user === null ? (
          <div className="w-[150px]"></div>
        ) : user ? (
          <p
            className="w-[150px] flex gap-[10px] items-center cursor-pointer justify-end"
            onClick={() => {
              settoggleSideNavbar(true);
            }}
          >
            <FaRegCircleUser className="text-[20px]" />
            {user.name.length > 14 ? (
              <span>{user.name.slice(0, 14)}...</span>
            ) : (
              <span>{user.name}</span>
            )}
          </p>
        ) : (
          <button
            className="bg-[#da4b63] rounded-[5px] px-[10px] py-[2px] text-white"
            onClick={() => {
              settoggleLogin(true);
            }}
          >
            Login
          </button>
        )}

        <div
          className="text-[20px] cursor-pointer"
          onClick={() => {
            settoggleSideNavbar(true);
          }}
        >
          <CgMenuRightAlt className="text-[25px]" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
