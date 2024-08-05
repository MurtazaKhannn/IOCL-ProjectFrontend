import React, { useEffect, useState } from "react";
import IOL from "../assets/logo.webp";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

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
  const [tableRows, setTableRows] = useState([
    {
      id: 1,
      productCategory: "",
      unitPrice: "",
      gst: "",
      total: "",
      totalAmount: "",
      remarks: "",
      avgTotalAmount: "",
    },
  ]);

  useEffect(() => {
    const storedInputs = JSON.parse(localStorage.getItem("be-form"));
    if (storedInputs) {
      setInputs(storedInputs);
    }
  }, [setInputs]);

  const calculateAverages = () => {
    const sum = tableRows.reduce(
      (acc, row) => {
        acc.totalAmount += parseFloat(row.totalAmount || 0);
        return acc;
      },
      { totalAmount: 0 }
    );

    const count = tableRows.length;
    return {
      avgTotalAmount: count > 0 ? (sum.totalAmount / count).toFixed(2) : "0.00",
    };
  };

  const averages = calculateAverages();

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

  const handleTableChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...tableRows];
    updatedRows[index][name] = value;
    setTableRows(updatedRows);
  };

  const addTableRow = () => {
    const newRow = {
      id: tableRows.length + 1,
      productCategory: "",
      unitPrice: "",
      gst: "",
      total: "",
      totalAmount: "",
      remarks: "",
      averageTotalAmount: "",
    };
    setTableRows([...tableRows, newRow]);
  };

  const deleteTableRow = (index) => {
    if (tableRows.length === 1) {
      return;
    } else {
      const updatedRows = [...tableRows];
      updatedRows.splice(index, 1);
      setTableRows(updatedRows);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/forms/budgetaryestimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, tableRows }),
      });

      const data = await res.json();
      console.log("Response data:", data);

      if (data.error) {
        alert("Error: " + data.error);
        return;
      }

      alert("Form saved successfully!");

      setInputs(predefinedValues);
      setTableRows([
        {
          id: 1,
          productCategory: "",
          unitPrice: "",
          gst: "",
          total: "",
          totalAmount: "",
          remarks: "",
        },
      ]);
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
        className="w-full max-w-7xl min-h-[80vh] bg-white flex p-5 flex-col items-center rounded-md justify-center"
        id="formContainer"
      >
        <div className="w-full min-h-full flex flex-col gap-5 items-center justify-center">
          <img src={IOL} alt="Logo" className="w-1/4" />
          <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl">
            BUDGETARY ESTIMATE
          </h1>
          <div className="w-full flex items-center justify-center gap-10">
            <form
              className="flex flex-col text-lg sm:text-xl gap-6 w-full max-w-6xl"
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
                <div className="rounded-md p-2 w-full overflow-auto">
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
                          GST (%) (Rs)
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Total (Rs)
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Total Amount (Rs)
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((row, index) => (
                        <tr key={row.id}>
                          <td className="border border-gray-300 px-2 py-1">
                            {row.id}
                          </td>
                          <td className="border border-gray-300 px-2 py-1">
                            <textarea
                              className="w-full"
                              type="text"
                              name="productCategory"
                              value={row.productCategory}
                              onChange={(e) => handleTableChange(index, e)}
                            />
                          </td>
                          <td className="border items-center justify-center w-52 p-2 gap-4 border-gray-300 px-2 py-1">
                            Rs
                            <input
                              className="w-32 p-2"
                              type="number"
                              name="unitPrice"
                              value={row.unitPrice}
                              onChange={(e) => handleTableChange(index, e)}
                            />
                          </td>
                          <td className="border border-gray-300 w-52 px-2 py-1">
                            Rs
                            <input
                              className="w-32 p-2"
                              type="number"
                              name="gst"
                              value={row.gst}
                              onChange={(e) => handleTableChange(index, e)}
                            />
                          </td>
                          <td className="border w-52 border-gray-300 px-2 py-1">
                            Rs
                            <input
                              className="w-32 p-1"
                              type="number"
                              name="total"
                              value={row.total}
                              onChange={(e) => handleTableChange(index, e)}
                            />
                          </td>
                          <td className="border w-52 border-gray-300 px-2 py-1">
                            Rs
                            <input
                              className="w-36 p-2"
                              type="number"
                              name="totalAmount"
                              value={row.totalAmount}
                              onChange={(e) => handleTableChange(index, e)}
                            />
                          </td>
                          <td className="border border-gray-300 w-48 px-2 py-1">
                            <textarea
                              className="w-36 p-2"
                              type="text"
                              name="remarks"
                              value={row.remarks}
                              onChange={(e) => handleTableChange(index, e)}
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-1">
                            <button
                              type="button"
                              className="bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => deleteTableRow(index)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td
                          colSpan="2"
                          className="border border-gray-300 px-2 py-1"
                        >
                          <button
                            type="button"
                            onClick={addTableRow}
                            className="bg-blue-500 text-white p-2 rounded"
                          >
                            Add Row
                          </button>
                        </td>
                        {/* <td colSpan="4" className="border border-gray-300 px-2 py-1">
                          <strong>Total Amount:</strong>
                        </td>
                        
                        <td className="border border-gray-300 px-2 py-1"> */}
                        <td
                          colSpan="3"
                          className="border border-gray-300 px-2 py-1"
                        >
                          <strong>Average:</strong>
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          {averages.avgTotalAmount}
                        </td>
                        {/* Calculation for total amount */}
                        {/* {tableRows.reduce((acc, row) => acc + parseFloat(row.totalAmount || 0), 0).toFixed(2)}
                        </td>
                        <td></td> */}
                      </tr>
                      {/* Row for averages */}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="proposal">Proposal:</label>
                <textarea
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  id="proposal"
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

              <div className="flex flex-col gap-4">
                <label htmlFor="confidential">Confidential:</label>
                <input
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  id="confidential"
                  name="confidential"
                  value={inputs.confidential}
                  onChange={handleChange}
                  readOnly
                />
              </div>

              <div className="flex items-center justify-center gap-5">
                <button
                  type="button"
                  className="bg-blue-500 text-white p-2 rounded"
                  // onClick={generatePDF}
                  onClick={() => {
                    navigate("/createnew");
                  }}
                  id="saveBtn"
                >
                  Back to Dropdown
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded"
                >
                {loading ? <ClipLoader size={20} color="000" /> : "Save"}                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetaryEstimate;
