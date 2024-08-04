import React, { useEffect, useState } from "react";
import IOL from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const InterOfficeMemo = () => {
  const predefinedValues = {
    section: "Information System",
    department: "Information Technology",
    location: "Uttar Pradesh",
    date: "",
    subject: "",
    background: "",
    tccRecommendations: "",
    confidential: "Yes",
    // referenceNumber: "",
  };

  const [inputs, setInputs] = useState(predefinedValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedInputs = JSON.parse(localStorage.getItem("ap-form"));
    if (storedInputs) {
      setInputs(storedInputs);
    }
  }, [setInputs]);

  const handleChange = (e) => {
    if (e.target.name === "date") {
      const dateValue = e.target.value.split("T")[0]; // Extract only the date part (yyyy-mm-dd)
      setInputs({ ...inputs, [e.target.name]: dateValue });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const newInputs = { ...inputs, [e.target.name]: e.target.value };
    setInputs(newInputs);
    localStorage.setItem("ap-form", JSON.stringify(newInputs));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/forms/interofficememo", {
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

      setInputs((prevInputs) => ({
        ...prevInputs,
        referenceNumber: data.referenceNumber, // Update state with reference number
      }));

      setInputs(predefinedValues);
      localStorage.removeItem("ap-form");
    } catch (error) {
      alert("Error: " + error);
      setLoading(false);
      console.log("Error:", error);
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 font-sans">
      <div className="w-full max-w-7xl min-h-[80vh] bg-white flex flex-col items-center justify-center p-5">
        <div className="w-full flex flex-col gap-5 items-center justify-center">
          <img src={IOL} alt="Logo" className="w-3/4 sm:w-1/2 lg:w-1/4" />
          <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl">
            INTER OFFICE MEMO
          </h1>
          <form
            id="formContainer"
            className="flex flex-col gap-5 w-full max-w-3xl"
            onSubmit={handleSubmit}
          >
            {/* <div className="flex flex-col gap-4">
              <label htmlFor="section">Ref No :</label> */}
              {/* <input
                className="bg-zinc-100 rounded-md p-2 w-full"
                id="section"
                name="section"
                value={inputs.referenceNumber}
                onChange={handleChange}
                readOnly
              /> */}
            {/* </div> */}
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
              <textarea
                className="bg-zinc-100 rounded-md p-2 w-full"
                id="subject"
                name="subject"
                value={inputs.subject}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="background">Background:</label>
              <textarea
                id="background"
                className="bg-zinc-100 rounded-md p-2 w-full"
                name="background"
                value={inputs.background}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="tccRecommendations">TCC Recommendations:</label>
              <textarea
                id="tccRecommendations"
                className="bg-zinc-100 rounded-md p-2 w-full"
                name="tccRecommendations"
                value={inputs.tccRecommendations}
                onChange={handleChange}
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
                  />{" "}
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

            <div className="flex gap-5 items-center justify-center">
              <button
                type="submit"
                className="bg-zinc-100 py-2 text-black rounded-md w-full max-w-xs"
              >
                {loading ? <ClipLoader size={16} color="000" /> : "Save"}
              </button>

              <button
                id="dropbtn"
                onClick={() => navigate("/createnew")}
                className="bg-blue-500 py-2 rounded-md w-full max-w-xs text-white"
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
  );
};

export default InterOfficeMemo;