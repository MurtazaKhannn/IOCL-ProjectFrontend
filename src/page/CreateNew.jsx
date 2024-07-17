import React, { useState } from "react";
import options from "../assets/options";
import { useNavigate } from "react-router-dom";

const CreateNew = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Find the corresponding option object from the options array
    const selectedOptionObj = options.find(option => option.label === selectedValue);
    if (selectedOptionObj) {
      navigate(`${selectedOptionObj.value}`);
    }
  };

  return (
    <div className="w-full mt-20 bg-zinc-100 font-teko ">
      <div className="w-full h-full flex flex-col pt-20 gap-10 items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-semibold">CREATE NEW</h1>
        <div className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 h-auto p-6 flex flex-col gap-3 items-center justify-center bg-white rounded-md shadow-md">
          <label className="text-lg sm:text-xl md:text-2xl" htmlFor="dynamicDropdown">
            Choose an option:
          </label>
          <select
            id="dynamicDropdown"
            value={selectedOption}
            onChange={handleChange}
            className="w-full cursor-pointer sm:w-[75%] md:w-[60%] lg:w-[50%] text-base sm:text-lg md:text-xl flex items-center justify-center border-2 rounded-md border-black p-2"
          >
            <option value="" className="text-base crusor-pointer sm:text-lg md:text-xl">Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.label} className="text-base cursor-pointer sm:text-lg md:text-xl">
                {option.label}
              </option>
            ))}
          </select>
          {/* <p className="text-lg sm:text-xl md:text-2xl">Selected option: {selectedOption}</p> */}
          <button className="bg-orange-500 text-white rounded-md px-4 py-2 text-base sm:text-lg md:text-xl">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNew;
