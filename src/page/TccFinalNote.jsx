import React, { useState } from "react";
import IOL from "../assets/logo.webp";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const BudgetaryEstimate = () => {

  const [inputs, setInputs] = useState({
    section: "Information System",
    department: "Information Technology",
    location: "Uttar Pradesh",
    date: "",
    subject: "",
    recommendation: "",   
    doaApplicable: "No", 
    confidential: "Yes"
  });

  const handleChange = (e) => {
    if (e.target.name === "date") {
      // Extract only the date part (yyyy-mm-dd) from the input value
      const dateValue = e.target.value.split("T")[0]; // split to remove timestamp
      setInputs({ ...inputs, [e.target.name]: dateValue });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/forms/tccfinalnote", {
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
    } catch (error) {
      alert("Error: " + error);
      console.log("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };


    const navigate = useNavigate();
    const generatePDF = async () => {
        // Hide the Save button
        const saveButton = document.getElementById("saveBtn");
        const dropbtn = document.getElementById("dropbtn");
        dropbtn.style.display = "none";
        saveButton.style.display = "none";
    
        const input = document.getElementById("formContainer");
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
    
        // Get the dimensions of the canvas
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
        // Scale the image to fit within the page
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const scaleFactor = imgHeight > pdfHeight ? pdfHeight / imgHeight : 1;
        const scaledWidth = imgWidth * scaleFactor;
        const scaledHeight = imgHeight * scaleFactor;
    
        // Calculate the x and y coordinates to center the image
        const xOffset = (pdfWidth - scaledWidth) / 2;
        const yOffset = (pdfHeight - scaledHeight) / 2;
    
        pdf.addImage(imgData, "PNG", xOffset, yOffset, scaledWidth, scaledHeight);
        pdf.save("tccfinalnote.pdf");
    
        // Show the Save button again
        saveButton.style.display = "block";
        dropbtn.style.display = "block";
      };


  return (
    <div className="w-full flex items-center justify-center gap-10 pt-5 min-h-[88.9vh] bg-zinc-100 font-teko">
      <div
        className="w-full max-w-7xl min-h-[80vh] bg-white flex p-5 flex-col items-center rounded-md justify-center"
        id="formContainer"
      >
        <div className="w-full min-h-full flex flex-col gap-5 items-center justify-center">
          <img src={IOL} alt="Logo" className="w-3/4 sm:w-1/2 lg:w-1/4" />
          <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl">
            TCC FINAL NOTE
          </h1>
          <div className="w-full flex items-center justify-center gap-10">
            <form
              className="flex flex-col text-lg sm:text-xl lg:text-2xl gap-10 w-full max-w-3xl"
              action=""
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-4">
                <label htmlFor="dialogue1">Ref No:</label>
                <input
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  type="text"
                  id="dialogue1"
                  name="dialogue1"
                  readOnly
                />
              </div>

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
                >
                  Default message 5
                </textarea>
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="recommendation">Recommendation:</label>
                <textarea
                  id="recommendation"
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  name="recommendation"
                  value={inputs.recommendation}
                  onChange={handleChange}
                >
                  Default message 6
                </textarea>
              </div>

              <div className="flex gap-5">
                <label>DOA Applicable:</label>
                <div className="flex gap-5">
                  <label>
                    <input
                      type="radio"
                      name="doaApplicable"
                      value="Yes"
                      checked={inputs.doaApplicable === "Yes"}  
                      onChange={handleChange}
                    />{" "}
                    Yes
                  </label>
                  <label>
                    <input type="radio" name="doaApplicable" value="No" checked={inputs.doaApplicable === "No"} onChange={handleChange} /> No
                  </label>
                </div>
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
                    <input type="radio" name="confidential" value="No" checked={inputs.confidential === "No"} onChange={handleChange} /> No
                  </label>
                </div>
              </div>

              <div className="flex gap-20 items-center justify-center">
                <button
                  className="bg-orange-500 rounded-md w-1/3 sm:w-1/4 lg:w-1/6 text-white"
                  type="button"
                  id="saveBtn"
                  onClick={generatePDF}
                >
                  Save as PDF
                </button>

                <button
                  type="submit"
                  className="bg-zinc-100 rounded-md w-full max-w-xs py-3"
                >
                  Save
                </button>
                
                <button id="dropbtn" onClick={() => {navigate("/createnew")}} className="bg-blue-500 rounded-md w-full max-w-xs text-white">Back to DROP-DOWN</button>
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

export default BudgetaryEstimate;
