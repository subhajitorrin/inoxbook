import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Screen({ screenData, theaterId, settoggleFetchScreens }) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (id, field, value) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, [field]: value } : category
      )
    );
  };

  const handleAddCategory = () => {
    if (categories.length === 3) {
      toast.warn("Maximum 3 categories every screen");
      return;
    }
    setCategories([
      ...categories,
      { id: Date.now(), name: "", seats: "", price: "" },
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
    setCategories(updatedCategories);
  }, [screenData]);

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
          className="h-[40px] rounded-[5px] px-[20px] w-[280px] outline-none"
          placeholder="Enter screen name"
        />
      </div>
      {categories.map((category, index) => (
        <div
          key={category._id || index}
          className="flex gap-[1rem] justify-between"
        >
          <p className="text-[15px] w-[150px]">Category {index+1}</p>
          <div className="flex flex-col gap-[20px]">
            <input
              onChange={(e) => {
                handleCategoryChange(category.id, "name", e.target.value);
              }}
              type="text"
              value={category.name}
              className="h-[40px] rounded-[5px] px-[20px] w-[280px] outline-none"
              placeholder="Enter category name"
            />
            <div className="flex gap-[20px]">
              <input
                onChange={(e) => {
                  handleCategoryChange(category.id, "seats", e.target.value);
                }}
                type="text"
                value={category.seats}
                className="h-[40px] rounded-[5px] px-[20px] w-[130px] outline-none"
                placeholder="Seats"
              />
              <input
                onChange={(e) => {
                  handleCategoryChange(category.id, "price", e.target.value);
                }}
                type="text"
                value={category.price}
                className="h-[40px] rounded-[5px] px-[20px] w-[130px] outline-none"
                placeholder="Price"
              />
            </div>
            <button
              className="bg-red-500 text-white py-[5px] px-[10px] rounded-[5px]"
              onClick={() => handleDeleteCategory(category.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
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
