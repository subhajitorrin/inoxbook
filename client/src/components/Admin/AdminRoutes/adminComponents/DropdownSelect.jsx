import React from "react";

const DropdownSelect = ({
  options,
  selectedOption,
  onSelect,
  label,
  placeholder,
  onAdd,
}) => {
  return (
    <div className="flex gap-[20px] items-center">
      <p className="text-[18px] font-[500] w-[200px]">{label}</p>
      <button
        onClick={onAdd}
        className="bg-white px-[40px] py-[4px] text-black font-[500] rounded-[5px]"
      >
        Add
      </button>
      <select
        onChange={(e) => onSelect(e.target.value)}
        value={selectedOption}
        name="options"
        className="text-black px-[20px] py-[5px] rounded-[5px]"
      >
        <option value="">{placeholder}</option>
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelect;
