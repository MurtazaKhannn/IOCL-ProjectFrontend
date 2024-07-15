import React from "react";
import IOL from "../assets/logo.webp";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const BudgetaryEstimate = () => {
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
        pdf.save("inprincipleapproval.pdf");
    
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
            BUDGETARY ESTIMATE
          </h1>
          <div className="w-full flex items-center justify-center gap-10">
            <form
              className="flex flex-col text-lg sm:text-xl lg:text-2xl gap-10 w-full max-w-3xl"
              action=""
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
                <label htmlFor="dialogue2">Section:</label>
                <textarea
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  id="dialogue2"
                  name="dialogue2"
                  readOnly
                >
                  Information Systems
                </textarea>
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="dialogue3">Department:</label>
                <textarea
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  id="dialogue3"
                  name="dialogue3"
                  readOnly
                >
                  Information Technology
                </textarea>
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="dialogue4">Location:</label>
                <textarea
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  id="dialogue4"
                  name="dialogue4"
                  readOnly
                >
                  Uttar Pradesh
                </textarea>
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="date">Date:</label>
                <input
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  type="date"
                  id="date"
                  name="date"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="dialogue5">Subject:</label>
                <textarea
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  id="dialogue5"
                  name="dialogue5"
                >
                  Default message 5
                </textarea>
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="dialogue6">Perspective:</label>
                <textarea
                  id="dialogue6"
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  name="dialogue6"
                >
                  Default message 6
                </textarea>
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="dialogue7">Proposal:</label>
                <textarea
                  id="dialogue7"
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  name="dialogue7"
                >
                  Default message 7
                </textarea>
              </div>


              <div className="flex flex-col gap-4">
                <label htmlFor="dialogue10">Conclusion:</label>
                <textarea
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  id="dialogue10"
                  name="dialogue10"
                >
                  Default message 10
                </textarea>
              </div>

              <div className="flex gap-5">
                <label>Confidential:</label>
                <div className="flex gap-5">
                  <label>
                    <input
                      type="radio"
                      name="confidential"
                      value="Yes"
                      checked
                    />{" "}
                    Yes
                  </label>
                  <label>
                    <input type="radio" name="confidential" value="No" /> No
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
