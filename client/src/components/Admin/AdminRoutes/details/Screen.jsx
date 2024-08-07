import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdArrowDropDown } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function Screen({ screenData, theaterId, settoggleFetchScreens }) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [seatGapToggles, setSeatGapToggles] = useState({});

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const handleCategoryChange = (id, field, value) => {
    if (field == "seats" || field == "price" || field == "rowBreak") {
      const numArr = value.split("");
      for (let i = 0; i < numArr.length; i++) {
        if (!(numArr[i] >= 0 && numArr[i] <= 9)) {
          return;
        }
      }
    }

    if (field === "gaps") {
      setCategories(
        categories.map((category) =>
          category.id === id
            ? { ...category, [field]: [...category[field], value] }
            : category
        )
      );
    } else {
      setCategories(
        categories.map((category) =>
          category.id === id ? { ...category, [field]: value } : category
        )
      );
    }
  };

  const handleAddCategory = () => {
    if (categories.length === 3) {
      toast.warn("Maximum 3 categories every screen");
      return;
    }
    setCategories([
      ...categories,
      {
        id: Date.now(),
        name: "",
        seats: "",
        price: "",
        rowBreak: "",
        gaps: [],
      },
    ]);
  };

  const handleDeleteCategory = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/deletecategory/${screenData._id}/${id}`
      );
      if (res.status === 200) {
        toast.success("Category deleted");
        settoggleFetchScreens((prev) => !prev);
      }
    } catch (error) {
      toast.error("Failed to delete category");
      console.error("Error deleting category:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/deletescreen/${screenData._id}`
      );
      if (res.status === 200) {
        settoggleFetchScreens((prev) => !prev);
        toast.success("Screen deleted");
      }
    } catch (error) {
      console.log("Error while deleting screen", error);
    }
  };

  async function handleSave() {
    if (theaterId && name != "" && categories.length >= 1) {
      const obj = {
        name,
        theaterId,
      };

      categories.forEach((category, index) => {
        if (
          category.price === "" ||
          category.seats === "" ||
          category.name === ""
        ) {
          toast.warn(`Fill the category ${index + 1}`);
          return;
        }
        obj[`category${index + 1}`] = {
          seats: category.seats || 0,
          price: category.price || 0,
          name: category.name || "",
          id: category.id || "",
          rowBreak: category.rowBreak || 10,
          gaps: category.gaps.join("-"),
        };
      });

      const res = await axios.put(
        `http://localhost:5000/updatescreen/${screenData._id}`,
        obj
      );
      if (res.status === 200) {
        console.log(res.data.finalScreen);
        settoggleFetchScreens((prev) => !prev);
        toast.success("Screen updated");
      }
    } else {
      if (name.trim() == "") {
        toast.warn("Enter name");
      }
      if (categories.length === 0) {
        toast.warn("At least one category");
      }
    }
  }

  useEffect(() => {
    setName(screenData.name || "");
    const updatedCategories = [
      screenData.category1,
      screenData.category2,
      screenData.category3,
    ].filter(Boolean);
    if (updatedCategories[0]) {
      updatedCategories[0].gaps = updatedCategories[0].gaps.split("-");
    }
    if (updatedCategories[1]) {
      updatedCategories[1].gaps = updatedCategories[1].gaps.split("-");
    }
    if (updatedCategories[2]) {
      updatedCategories[2].gaps = updatedCategories[2].gaps.split("-");
    }
    setCategories(updatedCategories);
  }, [screenData]);

  const handleClearGaps = (categoryId) => {
    const temp = categories.map((cat) =>
      cat.id === categoryId ? { ...cat, gaps: [] } : cat
    );
    setCategories(temp);
  };

  return (
    <div className="flex gap-[20px] flex-col border-b border-[#ffffff61] pb-[2rem]">
      <p className="text-center text-[18px] font-[500]">
        {name === "" ? <span>Screen name</span> : <span>{name}</span>}
      </p>
      <div className="flex items-center gap-[1rem] justify-between">
        <p className="text-[15px] w-[150px]">Screen Name</p>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          value={name}
          className="h-[40px] rounded-[5px] px-[20px] w-[100%] outline-none ml-[4px]"
          placeholder="Enter screen name"
        />
      </div>
      {categories.map((category, index) => {
        return (
          <div
            key={category._id || index}
            className="flex gap-[1rem] justify-between "
          >
            <p className="text-[15px] w-[150px]">Category {index + 1}</p>
            <div className="flex flex-col gap-[20px] w-[100%]">
              <input
                onChange={(e) => {
                  handleCategoryChange(category.id, "name", e.target.value);
                }}
                type="text"
                value={category.name}
                className="h-[40px] rounded-[5px] px-[20px] w-[100%] outline-none"
                placeholder="Enter category name"
              />
              <div className="flex gap-[20px] justify-between">
                <div className="flex flex-col gap-[5px] mt-[-10px]">
                  <p className="text-center">Seats</p>
                  <input
                    onChange={(e) => {
                      handleCategoryChange(
                        category.id,
                        "seats",
                        e.target.value
                      );
                    }}
                    maxLength={3}
                    type="text"
                    value={category.seats}
                    className="h-[40px] rounded-[5px] px-[20px] w-[80px] outline-none"
                    placeholder="Seats"
                  />
                </div>
                <div className="flex flex-col gap-[5px] mt-[-10px]">
                  <p className="text-center">Price</p>
                  <input
                    onChange={(e) => {
                      handleCategoryChange(
                        category.id,
                        "price",
                        e.target.value
                      );
                    }}
                    maxLength={4}
                    type="text"
                    value={category.price}
                    className="h-[40px] rounded-[5px] px-[20px] w-[80px] outline-none"
                    placeholder="Price"
                  />
                </div>
                <div className="flex flex-col gap-[5px] mt-[-10px]">
                  <p className="text-center">Row Break</p>
                  <input
                    onChange={(e) => {
                      handleCategoryChange(
                        category.id,
                        "rowBreak",
                        e.target.value
                      );
                    }}
                    maxLength={2}
                    type="text"
                    value={category.rowBreak}
                    className="h-[40px] rounded-[5px] px-[20px] w-[80px] outline-none"
                    placeholder="Break"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[5px] mt-[-10px]">
                <p className="">Gap at seat</p>
                <div className="flex relative">
                  {seatGapToggles[category.id] && (
                    <div className="overflow-y-auto py-[10px] flex flex-col gap-[10px] max-h-[230px] w-full bg-white absolute top-[110%] rounded-[5px] text-black">
                      {category.rowBreak == "" ? (
                        <p className="hover:bg-[#e6e6e6] bg-white cursor-pointer text-center py-[5px]">
                          Enter max seats per row
                        </p>
                      ) : (
                        Array.from(
                          { length: category.rowBreak },
                          (_, index) => (
                            <p
                              key={index}
                              onClick={() => {
                                handleCategoryChange(
                                  category.id,
                                  "gaps",
                                  index + 1
                                );
                              }}
                              className="hover:bg-[#e6e6e6] bg-white cursor-pointer text-center py-[5px]"
                            >
                              Gap at seat {index + 1}
                            </p>
                          )
                        )
                      )}
                    </div>
                  )}
                  <div className="relative w-[85%]">
                    <textarea
                      type="text"
                      className="overflow-y-visible py-[5px] border border-white bg-transparent w-[100%] min-h-[40px] rounded-l-[7px] outline-none px-[20px] cursor-default"
                      readOnly={true}
                      placeholder="Gap at seat"
                      value={category.gaps.join(", ")}
                    />
                    <span
                      onClick={() => {
                        handleClearGaps(category.id);
                      }}
                    >
                      <RxCross2 className="absolute right-[10px] top-[30%] cursor-pointer" />
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      setSeatGapToggles((prev) => ({
                        ...prev,
                        [category.id]: !prev[category.id],
                      }));
                    }}
                    className="h-[91%] flex items-center justify-center w-[15%] border-r border-t border-b rounded-r-[7px] border-white cursor-pointer"
                  >
                    <MdArrowDropDown className="text-[25px]" />
                  </div>
                </div>
              </div>
              <button
                className="bg-red-500 text-white py-[5px] px-[10px] rounded-[5px] mb-[10px]"
                onClick={() => handleDeleteCategory(category.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      <div className="flex gap-[20px]">
        <button
          className="w-full bg-blue-500 text-white py-[5px] rounded-[5px]"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
        <button
          className="w-full bg-green-500 text-white py-[5px] rounded-[5px]"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="w-full bg-[red] text-white py-[5px] rounded-[5px]"
          onClick={handleDelete}
        >
          Delete Screen
        </button>
      </div>
    </div>
  );
}

export default Screen;
