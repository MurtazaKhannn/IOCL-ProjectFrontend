import React, { useEffect, useState } from "react";
import IOL from "../assets/logo.webp";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { ClimbingBoxLoader, ClipLoader } from "react-spinners";

const BudgetaryEstimate = () => {
  const predefinedValues = {
    section: "Information System",
    department: "Information Technology",
    location: "Uttar Pradesh",
    date: "",
    subject: "",
    background: "",
    proposal: "",
    conclusion: "",
    confidential: "Yes",
  };

  const [inputs, setInputs] = useState(predefinedValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedInputs = JSON.parse(localStorage.getItem("be-form"));
    if (storedInputs) {
      setInputs(storedInputs);
    }
  }, [setInputs]);

  const PercentageDisplay = ({ number, percentage }) => {
    const calculatePercentage = () => {
      return (number * percentage) / 100;
    };

    return <p>{calculatePercentage()}</p>;
  };

  const handleChange = (e) => {
    if (e.target.name === "date") {
      const dateValue = e.target.value.split("T")[0];
      setInputs({ ...inputs, [e.target.name]: dateValue });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const newInputs = { ...inputs, [e.target.name]: e.target.value };
    setInputs(newInputs);
    localStorage.setItem("be-form", JSON.stringify(newInputs));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/forms/budgetaryestimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      console.log("Response data:", data);

      if (data.error) {
        alert("Error: " + data.error);
        return;
      }

      alert("Form saved successfully!");

      setInputs(predefinedValues);
      localStorage.removeItem("be-form");
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
  const generatePDF = async () => {
    const saveButton = document.getElementById("saveBtn");
    const dropbtn = document.getElementById("dropbtn");
    dropbtn.style.display = "none";
    saveButton.style.display = "none";

    const input = document.getElementById("formContainer");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const scaleFactor = imgHeight > pdfHeight ? pdfHeight / imgHeight : 1;
    const scaledWidth = imgWidth * scaleFactor;
    const scaledHeight = imgHeight * scaleFactor;

    const xOffset = (pdfWidth - scaledWidth) / 2;
    const yOffset = (pdfHeight - scaledHeight) / 2;

    pdf.addImage(imgData, "PNG", xOffset, yOffset, scaledWidth, scaledHeight);
    pdf.save("budgetary-estimate.pdf");

    saveButton.style.display = "block";
    dropbtn.style.display = "block";
  };

  return (
    <div className="w-full flex items-center justify-center pt-5 min-h-screen bg-zinc-100 font-sans">
      <div
        className="w-full max-w-6xl min-h-[80vh] bg-white flex p-5 flex-col items-center rounded-md justify-center"
        id="formContainer"
      >
        <div className="w-full min-h-full flex flex-col gap-5 items-center justify-center">
          <img src={IOL} alt="Logo" className="w-1/4" />
          <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl">
            BUDGETARY ESTIMATE
          </h1>
          <div className="w-full flex items-center justify-center gap-10">
            <form
              className="flex flex-col text-lg sm:text-xl gap-6 w-full max-w-4xl"
              action=""
              onSubmit={handleSubmit}
            >
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
                <div className="bg-zinc-100 rounded-md p-2 w-full overflow-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-2 py-1">
                          S. No.
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Product Category
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Unit Price (Rs)
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          GST@18% (Rs)
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Total (Rs)
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Total Amount for 35 PCs (Rs)
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1">1</td>
                        <td className="border border-gray-300 px-2 py-1">
                          All-In-One PC
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          93,262.71
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          16,787.29
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          1,10,050
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          38,51,750
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          AIO PC purchased by SRO. PO copy dated 29.01.2024 is
                          attached as Annexure-3
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1">2</td>
                        <td className="border border-gray-300 px-2 py-1">
                          All-In-One PC
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          1,00,870
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          18,156.6
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          1,19,026.6
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          41,65,931
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          AIO PC purchased by UPSO-II. PO copy dated 08.02.2024
                          is attached as Annexure-4
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1">3</td>
                        <td className="border border-gray-300 px-2 py-1">
                          All-In-One PC
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          1,17,559.30
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          21,160.67
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          1,38,719.97
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          48,55,199
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          AIO PC purchased by TNSO. PO copy dated 22.05.2024 is
                          attached as Annexure-5
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="border border-gray-300 px-2 py-1"
                          colSpan="5"
                        >
                          Average
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          42,90,960
                        </td>
                        <td className="border border-gray-300 px-2 py-1"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="proposal">Proposal:</label>
                <textarea
                  id="proposal"
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  name="proposal"
                  value={inputs.proposal}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="conclusion">Conclusion:</label>
                <textarea
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  id="conclusion"
                  name="conclusion"
                  value={inputs.conclusion}
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
                    />{" "}
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="confidential"
                      value="No"
                      checked={inputs.confidential === "No"}
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
                  {loading ? <ClipLoader size={24} /> : "Save"}
                </button>

                <button
                  id="dropbtn"
                  onClick={() => {
                    navigate("/createnew");
                  }}
                  className="bg-blue-500 rounded-md w-full max-w-xs py-3 text-white"
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

export default BudgetaryEstimate;