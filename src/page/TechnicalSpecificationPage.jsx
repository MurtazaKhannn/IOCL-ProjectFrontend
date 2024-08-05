import React, { useEffect, useState } from "react";
import IOL from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const TechnicalSpecificationPage = () => {
  const predefinedValues = {
    section: "Information System",
    department: "Information Technology",
    location: "Uttar Pradesh",
    date: "",
    subject: "",
    background: "",
    technicalSpecification: "",
    proposal: "",
    budgetAndFinancialImplication: "",
    doaApplicable: "No",
    effectiveAuthority: "",
    conclusion: "",
    confidential: "Yes",
    // referenceNumber: "",
  };

  const [inputs, setInputs] = useState(predefinedValues);
  const [loading, setLoading] = useState(false);
  const [tableRows, setTableRows] = useState([
    {
      id: "1",
      component: "",
      technicalspec: "",
    },
  ]);

  useEffect(() => {
    const storedInputs = JSON.parse(localStorage.getItem("ap-form"));
    if (storedInputs) {
      setInputs(storedInputs);
    }
  }, [setInputs]);




  const handleTableChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...tableRows];
    updatedRows[index][name] = value;
    setTableRows(updatedRows);
  };

  const addTableRow = () => {
    const newRow = {
      id: tableRows.length + 1,
      component: "",
      technicalspec: "",
    };
    setTableRows([...tableRows, newRow]);
  };

  const deleteTableRow = (index) => {
    if (tableRows.length === 1) {
      return;
    } else {
      const updatedRows = [...tableRows];
      updatedRows.splice(index, 1);
      updatedRows.forEach((row, i) => (row.id = i + 1)); // Reassign serial numbers
      setTableRows(updatedRows);
    }
  };

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
      const res = await fetch("/api/forms/technicalspecificationpage", {
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
            TECHNICAL SPECIFICATION
          </h1>
          <form
            id="formContainer"
            className="flex flex-col gap-5 w-full max-w-6xl"
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
                className="bg-zinc-100 rounded-md p-2 w-full"
                id="background"
                name="background"
                value={inputs.background}
                onChange={handleChange}
              />
              <div className="rounded-md p-2 w-full overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-2 py-1">
                        S. No.
                      </th>
                      <th className="border border-gray-300 px-2 py-1">
                        Component
                      </th>
                      <th className="border border-gray-300 px-2 py-1">
                      Technical Specification: All-In-One PCs
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, index) => (
                      <tr key={row.id}>
                        <td className="border border-gray-300 px-2 py-1">
                          <input
                            type="text"
                            className="w-[2.2vw]"
                            name="id"
                            value={row.id}
                          />
                        </td>
                        <td className="border w-[30vw] border-gray-300 px-2 py-1">
                          <textarea
                            className="w-full p-2"
                            type="text"
                            name="component"
                            value={row.component}
                            onChange={(e) => handleTableChange(index, e)}
                          />
                        </td>
                        <td className="border w-[30vw] items-center justify-center w-52 p-2 gap-4 border-gray-300 px-2 py-1">
                          
                          <textarea
                            className="w-full p-2"
                            type="text"
                            name="technicalspec"
                            value={row.technicalspec}
                            onChange={(e) => handleTableChange(index, e)}
                          />
                        </td>
                        
                        
                        
                        
                        <td className=" px-2 py-1">
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
                        className="px-2 py-1"
                      >
                        <button
                          type="button"
                          onClick={addTableRow}
                          className="bg-blue-500 mt-2 text-white p-2 rounded"
                        >
                          Add Row
                        </button>
                      </td>
                      {/* <td colSpan="4" className="border border-gray-300 px-2 py-1">
                          <strong>Total Amount:</strong>
                        </td>
                        
                        <td className="border border-gray-300 px-2 py-1"> */}
                      
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
                id="proposal"
                className="bg-zinc-100 rounded-md p-2 w-full"
                name="proposal"
                value={inputs.proposal}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="budgetAndFinancialImplication">
                Budget & Financial Implication:
              </label>
              <textarea
                id="budgetAndFinancialImplication"
                className="bg-zinc-100 rounded-md p-2 w-full"
                name="budgetAndFinancialImplication"
                value={inputs.budgetAndFinancialImplication}
                onChange={handleChange}
              />
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
                  <input
                    type="radio"
                    name="doaApplicable"
                    value="No"
                    checked={inputs.doaApplicable === "No"}
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="effectiveAuthority">Effective Authority:</label>
              <textarea
                className="bg-zinc-100 rounded-md p-2 w-full"
                id="effectiveAuthority"
                name="effectiveAuthority"
                value={inputs.effectiveAuthority}
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

export default TechnicalSpecificationPage;
