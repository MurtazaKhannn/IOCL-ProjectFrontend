import React, { useEffect, useState } from "react";
import IOL from "../assets/logo.webp";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import TCCIDetails from "../components/TCCIDetails";

const TCCIntermediate = () => {
  const predefinedValues = {
    section: "Information System",
    department: "Information Technology",
    location: "Uttar Pradesh",
    date: "",
    subject: "",
    confidential: "Yes",
    financialYears: [],
  };

  const [inputs, setInputs] = useState(predefinedValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedInputs = JSON.parse(localStorage.getItem("tcci-form"));
    if (storedInputs) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        financialYears: getPastThreeFinancialYears(),
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        financialYears: getPastThreeFinancialYears(),
      }));
    }
  }, []);

  const getPastThreeFinancialYears = () => {
    const currentYear = new Date().getFullYear();
    const financialYears = [];
    for (let i = 0; i < 3; i++) {
      financialYears.push(`${currentYear - i - 1}/${currentYear - i}`);
    }
    return financialYears;
  };

  const handleChange = (e) => {
    if (e.target.name === "date") {
      // Extract only the date part (yyyy-mm-dd) from the input value
      const dateValue = e.target.value.split("T")[0]; // split to remove timestamp
      setInputs({ ...inputs, [e.target.name]: dateValue });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const newInputs = { ...inputs, [e.target.name]: e.target.value };
    setInputs(newInputs);
    localStorage.setItem("tcci-form", JSON.stringify(newInputs));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/forms/tccintermediate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      console.log("Response data:", data); // Debugging line

      if (data.error) {
        alert("Error: " + data.error);
        return;
      }

      alert("Form saved successfully!");

      setInputs(predefinedValues);
      localStorage.removeItem("tcci-form");
    } catch (error) {
      alert("Error: " + error);
      console.log("Error:", error);
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  const navigate = useNavigate();

  const calculateTurnover = (value, isMSE) => {
    const percentage = isMSE ? 0.51 : 0.60;
    return value * percentage;
  };

  return (
    <div className="w-full flex items-center justify-center gap-10 pt-5 min-h-[88.9vh] bg-zinc-100 font-sans">
      <div
        className="w-full max-w-8xl min-h-[80vh] bg-white flex p-5 flex-col items-center rounded-md justify-center"
        id="formContainer"
      >
        <div className="w-full min-h-full flex flex-col gap-5 items-center justify-center">
          <img src={IOL} alt="Logo" className="w-3/4 sm:w-1/2 lg:w-1/4" />
          <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl">
            TCC INTERMEDIATE
          </h1>
          <div className="w-full flex items-center justify-center gap-10">
            <form
              className="flex flex-col text-lg sm:text-xl lg:text-2xl gap-10 w-full max-w-3xl"
              action=""
              onSubmit={handleSubmit}
            >
              {/* <div className="flex flex-col gap-4">
                <label htmlFor="dialogue1">Ref No:</label>
                <input
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  type="text"
                  id="dialogue1"
                  name="dialogue1"
                  readOnly
                />
              </div> */}

              <div className="flex flex-col gap-4">
                <label htmlFor="section">Section:</label>
                <input
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  id="section"
                  name="section"
                  value={inputs.section}
                  onChange={handleChange}
                  readOnly
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="department">Department:</label>
                <input
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  id="department"
                  name="department"
                  value={inputs.department}
                  onChange={handleChange}
                  readOnly
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="location">Location:</label>
                <input
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  id="location"
                  name="location"
                  value={inputs.location}
                  onChange={handleChange}
                  readOnly
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="date">Date:</label>
                <input
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  type="date"
                  id="date"
                  name="date"
                  value={inputs.date}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="subject">Subject:</label>
                <input
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  id="subject"
                  name="subject"
                  value={inputs.subject}
                  onChange={handleChange}
                />

                {/* <textarea
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  name=""
                  id=""
                ><TCCIDetails /></textarea> */}
              </div>

              <div className="">
                <TCCIDetails
                  financialYears={inputs.financialYears}
                  calculateTurnover={calculateTurnover}
                />
              </div>

              <div className="flex gap-5">
                <label>Confidential:</label>
                <div className="flex gap-5">
                  <label>
                    <input
                      type="radio"
                      name="confidential"
                      value="Yes"
                      checked={inputs.confidential === "Yes"}
                      onChange={handleChange}
                    />
                    {""}
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="confidential"
                      value="No"
                      checked={inputs.confidential === "No"}
                      onChange={handleChange}
                    />{" "}
                    No
                  </label>
                </div>
              </div>

              <div className="flex gap-20 items-center justify-center">
                <button
                  type="submit"
                  className="bg-zinc-100 rounded-md w-full max-w-xs py-3"
                >
                  {loading ? <ClipLoader size={16} /> : "Save"}
                </button>

                <button
                  id="dropbtn"
                  onClick={() => {
                    navigate("/createnew");
                  }}
                  className="bg-blue-500 rounded-md w-full py-3 max-w-xs text-white"
                >
                  Back to DROP-DOWN
                </button>
              </div>
              <p id="saveMessage" className="flex justify-center hidden">
                Information saved
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TCCIntermediate;
