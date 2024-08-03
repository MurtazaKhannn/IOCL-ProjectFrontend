import React, { useEffect, useState } from "react";
import IOL from "../assets/logo.webp";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const BudgetaryEstimate = () => {
  // const apiUrl = process.env.REACT_APP_API_URL;

  const predefinedValues = {
    section: "Information System",
    department: "Information Technology",
    location: "Uttar Pradesh",
    date: "",
    subject: "",
    noofitemsGEM: "",
    noofitems: "",
    modeoftendering: "",
    typeoftendering: "",
    tenderissued: "",
    timeallowed: "",
    prebidmeetings: "",
    noofoffersreceived: "",
    nooflatetenders: "",
    noofoffersrejectedtechnically: "",
    rejectedvendorsnames: "",
    noofoffersrejectedonthegrounds: "",
    noofoffersrejectedonthegroundstwo: "",
    noofoffersrejectedonthegroundsreason: "",
    referenceoftechnicalbidtcc: "",
    anyprepricebidmeetingheld: "",
    detailsofdeviationacceptedbytcc: "",
    partieswhodonotagreeonabovedeviations: "",
    anyrevisedpricebid: "",
    noofpartieswhoqualifyforopeningofpricebids: "",
    partieswhoqualifyforopeningofpricebids: "",
    emd: "",
    publicsector: "",
    pricepreference: "",
    pricenegotiation: "",
    letterofparties: "",
    recommendationbytcc: "",
    reasonofrecommendation: "",
    awardofjob: "",
    validityofoffer: "",
    alldeclaration: "",
    cvcguidelines: "",
    anyotherrelevantinformation: "",
    recommendedparties: "",
    recommendationdoa: "",
    preamble: "",
    amountinwords: "",
    rsinwords: "",
    doalaw: "",
    doaclause: "",
    doadesc: "",
    remarks: "",
    firstapplicabledoa: "",
    doadivision: "",
    amount: "",
    twoB: "",
    three: "",
    four: "",
    threeA: "",
    threeB: "",
    refno1: "",
    refno2: "",
    videref1: "",
    videref2: "",
    videref3: "",
    videref4: "",
    grantedBy1: "",
    grantedBy2: "",
    grantedBy3: "",
    grantedBy4: "",
    date1: "",
    date2: "",
    date3: "",
    date4: "",
    date5: "",
    date6: "",
    date7: "",
    date8: "",
    date9: "",
    date10: "",
    date11: "",
    date12: "",
    annexure1: "",
    annexure2: "",
    annexure3: "",
    annexure4: "",
    annexure5: "",
    annexure6: "",
    annexure7: "",
    annexure8: "",
    annexure9: "",
    annexure10: "",
    annexure11: "",
    annexure12: "",
    annexure13: "",
    recommendation: "",
    doaApplicable: "No",
    confidential: "Yes",
  };

  const getPastThreeFinancialYears = () => {
    const currentYear = new Date().getFullYear();
    const financialYears = [];
    for (let i = 0; i < 3; i++) {
      financialYears.push(`${currentYear - i - 1}/${currentYear - i}`);
    }
    return financialYears;
  };

  const PercentageDisplay = ({ number, percentage }) => {
    const calculatePercentage = () => {
      return (number * percentage) / 100;
    };

    return <p>{calculatePercentage()}</p>;
  };

  const [inputs, setinputs] = useState(predefinedValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedInputs = JSON.parse(localStorage.getItem("tccfn-form"));
    if (storedInputs) {
      setinputs({
        ...storedInputs,
      });
    } else {
      setinputs((prevInputs) => ({
        ...prevInputs,
      }));
    }
  }, [setinputs]);

  const handleChange = (e) => {
    if (e.target.name === "date") {
      // Extract only the date part (yyyy-mm-dd) from the input value
      const dateValue = e.target.value.split("T")[0]; // split to remove timestamp
      setinputs({ ...inputs, [e.target.name]: dateValue });
    } else {
      setinputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const newInputs = { ...inputs, [e.target.name]: e.target.value };
    setinputs(newInputs);
    localStorage.setItem("tccfn-form", JSON.stringify(newInputs));
  };

  const handleSave = async () => {
    try {
      setLoading(true);


      const res = await fetch(`/api/forms/tccfinalnote`, {
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

      setinputs(predefinedValues);
      localStorage.removeItem("tccfn-form");
    } catch (error) {
      alert("Error: " + error);
      console.log("Error:", error);
      setLoading(false);
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
    <div className="flex w-[100vw] items-center justify-center gap-10 pt-5 min-h-[88.9vh] bg-zinc-100 font-sans">
      <div
        className="w-[100vw] min-h-[80vh] bg-white flex p-5 flex-col items-center rounded-md justify-center"
        id="formContainer"
      >
        <div className="w-full min-h-full flex flex-col gap-5 items-center justify-center">
          <img src={IOL} alt="Logo" className="w-3/4 sm:w-1/2 lg:w-1/4" />
          <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl">
            TCC FINAL NOTE
          </h1>
          <div className="w-full flex items-center justify-center gap-10">
            <form
              className="flex flex-col text-lg sm:text-xl lg:text-2xl gap-10 w-full max-w-5xl"
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

              <div className="overflow-x-auto">
                <table className="w-5xl divide-y divide-gray-200 text-xl">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 font-bold border-b border-gray-300">
                        No
                      </th>
                      <th className="px-6 py-3 font-bold border-b border-gray-300">
                        Point
                      </th>
                      <th className="px-6 py-3 font-bold border-b border-gray-300">
                        Details
                      </th>
                      <th className="px-6 py-3 font-bold border-b border-gray-300">
                        Content
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        1
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">A</td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Brief back ground of the main project
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <textarea
                          name="noofitemsGEM"
                          value={inputs.noofitemsGEM}
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                          onChange={handleChange}
                          id=""
                          cols={"64"}
                          rows={"1"}
                        />
                        <br /> <br />
                        E-Tender -{" "}
                        <input
                          name="refno1"
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                          value={inputs.refno1}
                          onChange={handleChange}
                          type="text"
                        />{" "}
                        dated was published on GeM portal on{" "}
                        <input
                          type="date"
                          name="date1"
                          value={inputs.date1}
                          onChange={handleChange}
                          id=""
                        />
                        <input
                          type="text"
                          name="annexure1"
                          className="p-2 font-bold rounded-md"
                          value={inputs.annexure1}
                          placeholder="ANNEXURE"
                          onChange={handleChange}
                        />{" "}
                        <br /> <br /> Nominated TCC Members:
                        <input
                          type="text"
                          name="annexure2"
                          value={inputs.annexure2}
                          onChange={handleChange}
                          placeholder="ANNEXURE"
                          className="font-bold rounded-md p-2"
                        />{" "}
                        <br /> <br />
                        <textarea
                          name="tccmembers1"
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                          value={inputs.tccmembers}
                          placeholder="about TCC members"
                          onChange={handleChange}
                          id=""
                          cols={"64"}
                          rows={"1"}
                        />
                        <br /> <br /> TCC Recommendations - Administrative
                        Approval vide ref no:
                        <textarea
                          name="videref1"
                          value={inputs.videref1}
                          onChange={handleChange}
                          id=""
                          cols={"64"}
                          rows={"1"}
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                        />{" "}
                        and
                        <textarea
                          name="videref2"
                          value={inputs.videref2}
                          onChange={handleChange}
                          id=""
                          cols={"50"}
                          rows={"1"}
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                        />
                        are attached as{" "}
                        <input
                          type="text"
                          name="annexure3"
                          value={inputs.annexure3}
                          onChange={handleChange}
                          placeholder="ANNEXURE"
                          className="font-bold p-2 rounded-md"
                        />{" "}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        1
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">B</td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Description of tendered work
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        Procurement of{" "}
                        <textarea
                          name="noofitems"
                          value={inputs.noofitems}
                          onChange={handleChange}
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                          type="text"
                          rows={"1"}
                        />{" "}
                        at{" "}
                        <input
                          name="address"
                          value={inputs.address}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none"
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        1
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">C</td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Tender No
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          name="refno2"
                          value={inputs.refno2}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                        />{" "}
                        dated{" "}
                        <input
                          name="date2"
                          value={inputs.date2}
                          onChange={handleChange}
                          className="p-1 border-b-2 focus:border-blue-500 outline-none"
                          type="date"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        2
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Estimated value of work
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        Rs.{" "}
                        <input
                          name="amount"
                          value={inputs.amount}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />{" "}
                        including GST
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        2
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">A</td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Approved by
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        Admin approval for Rs
                        <input
                          name="amount"
                          value={inputs.amount}
                          onChange={handleChange}
                          placeholder="amount"
                          type="text"
                          className="border-b-2 mt-2 focus:border-blue-500 outline-none"
                        />{" "}
                        by
                        <input
                          name="grantedBy1"
                          value={inputs.grantedBy1}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 mt-2 border-gray-300 focus:border-blue-500 outline-none"
                        />
                        vide note ref no :
                        <textarea
                          name="videref2"
                          value={inputs.videref2}
                          onChange={handleChange}
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                          id=""
                          cols={"49"}
                          rows={"1"}
                        />
                        <br />
                        dated &nbsp;&nbsp;
                        <input
                          type="date"
                          name="date3"
                          value={inputs.date3}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        <input
                          type="text"
                          name="annexure4"
                          className="border-2 mt-2 font-bold rounded-md p-2 border-gray-300 focus:border-blue-500 outline-none"
                          value={inputs.annexure4}
                          placeholder="ANNEXURE"
                          onChange={handleChange}
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        2
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">B</td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        In case the estimate is more than Rs. 25 Lacs whether
                        vetted by Finance
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          name="twoB"
                          value={inputs.twoB}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                          
                        />
                      </td>
                    </tr>

                    {/* <tr className="border-b border-gray-300">
              <td className="px-6 py-4 border-r border-gray-300">A</td>
          </tr> */}
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        3
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Whether Capital / Revenue Item
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          name="three"
                          value={inputs.three}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />
                      </td>
                      <br />
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        3
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">A</td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        In case of Revenue expenditure give ref No:
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          name="threeA"
                          value={inputs.threeA}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        3
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">B</td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        In case of Capital Item give IR No and Amount with
                        Administrative Approval reference
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          name="threeB"
                          value={inputs.threeB}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />
                        Admin Approval for Rs
                        <input
                          name="amount"
                          value={inputs.amount}
                          onChange={handleChange}
                          placeholder="amount"
                          type="text"
                          className="border-b-2 mt-2 focus:border-blue-500 outline-none"
                        />{" "}
                        by
                        <input
                          name="grantedBy2"
                          value={inputs.grantedBy2}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 mt-2 border-gray-300 focus:border-blue-500 outline-none"
                        />
                        vide note ref no :
                        <textarea
                          name="videref3"
                          value={inputs.videref3}
                          onChange={handleChange}
                          className="border-b-2 mt-2 ml-1 border-gray-300 focus:border-blue-500 outline-none"
                          id=""
                          rows="1"
                          cols={"62"}
                        />
                        <br />
                        dated &nbsp;&nbsp;
                        <input
                          type="date"
                          name="date4"
                          value={inputs.date4}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        <input
                          type="text"
                          name="annexure5"
                          className="border-2 mt-2 font-bold rounded-md p-2 border-gray-300 focus:border-blue-500 outline-none"
                          value={inputs.annexure5}
                          placeholder="ANNEXURE"
                          onChange={handleChange}
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        4
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Cumulative commitments made prior to the current
                        proposal against the approval given in item No: 3 above
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <textarea
                          name="four"
                          value={inputs.four}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                          cols="64"
                          rows="3"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        5
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 mb-2 font-bold border-r border-gray-300">
                        Approval Reference for inviting Tender
                      </td>
                      <td className="px-6 mb-2 py-4 border-r border-gray-300">
                        Admin approval for procurement of{" "}
                        <input
                          name="noofitems"
                          value={inputs.noofitems}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 mb-2 focus:border-blue-500 outline-none"
                        />{" "}
                        at{" "}
                        <input
                          name="address"
                          value={inputs.address}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 mb-2 border-gray-300 focus:border-blue-500 outline-none"
                        />{" "}
                        is granted by{" "}
                        <input
                          name="grantedBy3"
                          value={inputs.grantedBy3}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 mb-2 border-gray-300 focus:border-blue-500 outline-none"
                        />{" "}
                        vide note ref:{" "}
                        <input
                          name="videref4"
                          value={inputs.videref4}
                          onChange={handleChange}
                          className="border-b-2 mb-2 border-gray-300 focus:border-blue-500 outline-none"
                          id=""
                        />
                        dated{" "}
                        <input
                          type="date"
                          name="date5"
                          value={inputs.date5}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        <p className="font-bold">
                          <input
                            type="text"
                            className="border-2 rounded-md p-2 focus:border-blue-500 font-bold mt-2"
                            placeholder="ANNEXURE"
                            name="annexure6"
                            value={inputs.annexure6}
                            onChange={handleChange}
                            id=""
                          />
                        </p>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        6
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Mode of Tendering (ST/LT/PT)
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          name="modeoftendering"
                          value={inputs.modeoftendering}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        7
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Type of Tendering system (Single bid / Two Bid System)
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          name="typeoftendering"
                          value={inputs.typeoftendering}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />{" "}
                        <p>
                          <input
                            name="annexure7"
                            value={inputs.annexure7}
                            onChange={handleChange}
                            type="text"
                            className="border-2 focus:border-blue-500 p-2 rounded-md p-1 font-bold mt-2"
                            placeholder="ANNEXURE"
                          />
                        </p>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        8
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Tenders Issued / No of parties to whom enquiry was sent
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          name="tenderissued"
                          value={inputs.tenderissued}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        9
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Time allowed for submission of tenders from the date of
                        opening of sale of tender documents.
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          name="timeallowed"
                          value={inputs.timeallowed}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none mt-2"
                          placeholder=""
                        />{" "}
                        <p>
                          <input
                            name="annexure8"
                            value={inputs.annexure8}
                            onChange={handleChange}
                            type="text"
                            className="border-2 p-2 rounded-md focus:border-blue-500 outline-none mt-2 font-bold"
                            placeholder="ANNEXURE"
                          />
                        </p>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        10
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Whether any Pre-bid meeting held
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300 ">
                        <input
                          name="prebidmeetings"
                          value={inputs.prebidmeetings}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        11
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Due Date & Receipt of E-tenders
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          type="datetime-local"
                          name="date6"
                          value={inputs.date6}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        <p>
                          <input
                            name="annexure9"
                            value={inputs.annexure9}
                            onChange={handleChange}
                            type="text"
                            placeholder="ANNEXURE"
                            className="font-bold p-2 rounded-md border-2 focus:border-blue-500"
                          />
                        </p>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        12
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Actual Date & Time of Opening of E-tenders
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          type="datetime-local"
                          name="date7"
                          value={inputs.date7}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        <p>
                          <input
                            name="annexure10"
                            value={inputs.annexure10}
                            onChange={handleChange}
                            type="text"
                            placeholder="ANNEXURE"
                            className="font-bold p-2 rounded-md border-2 focus:border-blue-500"
                          />
                        </p>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        13
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        No of Offers received up to the due date and time of
                        receipt
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        The technical bid of the subject tender was opened on{" "}
                        <input
                          type="date"
                          name="date8"
                          value={inputs.date8}
                          onChange={handleChange}
                          id=""
                        />
                        . On due date and time, the offers of the following
                        parties were received:
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none"
                          name="noofoffersreceived"
                          value={inputs.noofoffersreceived}
                          onChange={handleChange}
                          id=""
                          cols="64"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        14
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        No of Late Tenders
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          name="nooflatetenders"
                          value={inputs.nooflatetenders}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none"
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        15
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Pre-Qualification Criteria
                      </td>
                      <td className="px-6 py-4 font-bold border-r rounded-md border-gray-300">
                        <input
                          name="annexure11"
                          value={inputs.annexure11}
                          onChange={handleChange}
                          type="text"
                          className="border-2  rounded-md p-2 "
                          placeholder="ANNEXURE"
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        16
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        EMD
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                          name="emd"
                          value={inputs.emd}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>

                  
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        17
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        No of Offers rejected based on technical evaluation
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          name="noofoffersrejectedtechnically"
                          value={inputs.noofoffersrejectedtechnically}
                          onChange={handleChange}
                          placeholder="number"
                          className="border-b-2 focus:border-blue-500 outline-none mb-5"
                          type="text"
                        />
                        <br />
                        <textarea
                          placeholder="vendorname with reason "
                          className="border-b-2 w-72 focus:border-blue-500 outline-none mb-2"
                          name="rejectedvendorsnames"
                          cols={64}
                          value={inputs.rejectedvendorsnames}
                          onChange={handleChange}
                          id=""
                        />
                        <br />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        18
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        No of offer rejected on the grounds of Holiday listing
                        and reasons thereof (in case of two bid)
                      </td>
                      <td className="px-6 py-4 border-r  border-gray-300">
                        <input
                          name="noofoffersrejectedonthegrounds"
                          value={inputs.noofoffersrejectedonthegrounds}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          type="text"
                        />
                        Holiday listing status has been checked from Vendor
                        Holiday List on intranet,
                        <input
                          name="noofoffersrejectedonthegroundstwo"
                          value={inputs.noofoffersrejectedonthegroundstwo}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          type="text"
                        />
                        <br />
                        <br />
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="noofoffersrejectedonthegroundsreason"
                          value={inputs.noofoffersrejectedonthegroundsreason}
                          onChange={handleChange}
                          id=""
                          cols="64"
                          
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        19
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Reference of Technical bid TCC minutes
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none "
                          name="referenceoftechnicalbidtcc"
                          value={inputs.referenceoftechnicalbidtcc}
                          onChange={handleChange}
                          id=""
                          cols={64}
                        />
                        dated
                        <input
                          type="date"
                          name="date11"
                          value={inputs.date11}
                          onChange={handleChange}
                          className="mb-2 mt-1"
                          id=""
                        />
                        <input
                          name="annexure12"
                          value={inputs.annexure12}
                          onChange={handleChange}
                          className="border-2 p-2 rounded-md outline-none mb-2 font-bold"
                          placeholder="ANNEXURE"
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        20
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Whether any pre-Price bid meeting held? If yes on which
                        date & reference of Pre-bid minutes
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="anyprepricebidmeetingheld"
                          value={inputs.anyprepricebidmeetingheld}
                          onChange={handleChange}
                          id=""
                          cols={64}
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        21
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Details of deviation accepted by TCC, if any
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="detailsofdeviationacceptedbytcc"
                          value={inputs.detailsofdeviationacceptedbytcc}
                          onChange={handleChange}
                          id=""
                          cols={64}
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        22
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Name of parties if any who do not agree to above
                        deviations
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="partieswhodonotagreeonabovedeviations"
                          value={inputs.partieswhodonotagreeonabovedeviations}
                          onChange={handleChange}
                          id=""
                          cols={64}
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        23
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Any revised price bid obtained with reasons
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="anyrevisedpricebid"
                          value={inputs.anyrevisedpricebid}
                          onChange={handleChange}
                          id=""
                          cols={64}
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        24
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Parties who qualify for opening of Price Bids with
                        reference to TCC recommendations
                      </td>
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        TCC recommends opening of Price bids of following{" "}
                        <input
                          className="border-b-2 w-36 focus:border-blue-500 outline-none "
                          type="text"
                          name="noofpartieswhoqualifyforopeningofpricebids"
                          value={
                            inputs.noofpartieswhoqualifyforopeningofpricebids
                          }
                          onChange={handleChange}
                          cols={64}
                          rows="1"
                        />
                        bidders who have been qualified as per PQ criteria and
                        submission of relevant other mandatory document
                        criteria.
                        <br />
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="partieswhoqualifyforopeningofpricebids"
                          value={inputs.partieswhoqualifyforopeningofpricebids}
                          onChange={handleChange}
                          id=""
                          cols="30"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        25
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Date of Opening Price Bids
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                        className="p-1 rounded-md"
                          type="date"
                          name="date12"
                          value={inputs.date12}
                          onChange={handleChange}
                          id=""
                        />
                        &nbsp;
                        dated
                        &nbsp;
                        <input
                          name="annexure13"
                          value={inputs.annexure13}
                          onChange={handleChange}
                          className="border-2 p-1 rounded-md outline-none mb-2 font-bold"
                          placeholder="ANNEXURE"
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        26
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Summarized statement of the evaluated prices of
                        technically acceptable offer
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        27
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Public sector/NSIC/IOC IV participating in the tender,
                        if any
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="publicsector"
                          value={inputs.publicsector}
                          onChange={handleChange}
                          id=""
                          cols={64}
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                        28
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                        Any price/purchase preference proposed to be given to
                        NSIC /PSU/IOC JV as per guidelines, details
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        <textarea
                          name="pricepreference"
                          value={inputs.pricepreference}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          type="text"
                          cols={64}
                        />{" "}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                        29
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        A
                      </td>
                      <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                        Any Price Negotiation held with L -1.If so, reasons for
                        negotiation
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        <textarea
                          name="pricenegotiation"
                          value={inputs.pricenegotiation}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          type="text"
                          cols={64}
                        />{" "}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                        29
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        B
                      </td>
                      <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                        Summarized statement of the evaluated prices of
                        technically acceptable offer after negotiation with L-1
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300"></td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                        29
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        C
                      </td>
                      <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                        Letters of other parties who have not quoted
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="letterofparties"
                          value={inputs.letterofparties}
                          onChange={handleChange}
                          id=""
                          cols={64}
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                        30
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        A
                      </td>
                      <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                        Recommendation of TCC for award of work
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        The final rate quoted by L-1 party after negotiation is
                        Rs.{" "}
                        <input
                          type="text"
                          name="amount"
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          value={inputs.amount}
                          onChange={handleChange}
                        />{" "}
                        against public bid on GeM Portal. Therefore, TCC
                        recommends that work may be awarded to{" "}
                        <textarea
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="recommendationbytcc"
                          value={inputs.recommendationbytcc}
                          onChange={handleChange}
                          cols={64}
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                        30
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        B
                      </td>
                      <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                        Recommended parties and finalized L-1 rates accepted by
                        party
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        <input
                          name="recommendedparties"
                          value={inputs.recommendedparties}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          type="text"
                        />{" "}
                        is recommended with L1 rate of Rs.
                        <input
                          name="amount"
                          value={inputs.amount}
                          onChange={handleChange}
                          className="border-b-2 w-40 focus:border-blue-500 outline-none mb-2"
                          type="text"
                        />{" "}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                        30
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        C
                      </td>
                      <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                        Contact Value
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        Rs
                        <input
                          name="amount"
                          value={inputs.amount}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          type="text"
                        />{" "}
                        (inclusive of 18% GST)
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                        30
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        D
                      </td>
                      <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                        Reason for recommendation
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        <textarea
                          name="reasonofrecommendation"
                          value={inputs.reasonofrecommendation}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          type="text"
                          cols={64}
                        />{" "}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                        30
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        E
                      </td>
                      <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                        In case of award of job is recommended on more than one
                        party, basis of allocation.
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        <textarea
                          name="awardofjob"
                          value={inputs.awardofjob}
                          onChange={handleChange}
                          id=""
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          cols={64}
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                        30
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        F
                      </td>
                      <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                        Validity of offer
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        <textarea
                          name="validityofoffer"
                          value={inputs.validityofoffer}
                          onChange={handleChange}
                          id=""
                          cols={64}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                        30
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        G
                      </td>
                      <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                        All declaration duly filled & signed by party
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        <textarea
                          name="alldeclaration"
                          value={inputs.alldeclaration}
                          onChange={handleChange}
                          id=""
                          cols={64}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                        30
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        H
                      </td>
                      <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                        Whether CVC guidelines have been complies with
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        <textarea
                          name="cvcguidelines"
                          value={inputs.cvcguidelines}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          id=""
                          cols={64}
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                        30
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        I
                      </td>
                      <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                        Any other relevant information
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        <textarea
                          name="anyotherrelevantinformation"
                          value={inputs.anyotherrelevantinformation}
                          onChange={handleChange}
                          id=""
                          cols={64}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"

                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                        31
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                        DOA/Approving Authority
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        <textarea
                          name="grantedBy4"
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          value={inputs.grantedBy4}
                          onChange={handleChange}
                          id=""
                          rows={1}
                        />
                        may kindly accord approval with FC or placement of order
                        on L-1 party ie.
                        <textarea
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="recommendationdoa"
                          value={inputs.recommendationdoa}
                          onChange={handleChange}
                          rows={1}
                        />
                        for Rs
                        <input
                          type="text"
                          name="amount"
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          value={inputs.amount}
                          onChange={handleChange}
                        />
                        <textarea
                          name="rsinwords"
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          value={inputs.rsinwords}
                          onChange={handleChange}
                          id=""
                          rows={1}
                        />
                        including GST @18% Approval sought under{" "}
                        <input
                          type="text"
                          name="doalaw"
                          value={inputs.doalaw}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                <label htmlFor="doaclause">
                  Number of Applicable DOA Clause
                </label>
                <input
                  id="doaclause"
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  name="doaclause"
                  value={inputs.doaclause}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="firstapplicabledoa">First Applicable DOA</label>
                <input
                  id="firstapplicabledoa"
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  name="firstapplicabledoa"
                  value={inputs.firstapplicabledoa}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="doadivision">DOA Division</label>
                <input
                  id="doadivision"
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  name="doadivision"
                  value={inputs.doadivision}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="preamble">Preamble Applicable</label>
                <input
                  id="preamble"
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  name="preamble"
                  value={inputs.preamble}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="amount">Amount</label>
                <input
                  id="amount"
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  name="amount"
                  value={inputs.amount}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="amountinwords">Amount in words</label>
                <textarea
                  id="amountinwords"
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  name="amountinwords"
                  value={inputs.amountinwords}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="doadesc">DOA Description</label>
                <textarea
                  id="doadesc"
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  name="doadesc"
                  value={inputs.doadesc}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="remarks">Remarks</label>
                <textarea
                  id="remarks"
                  className="bg-zinc-100 rounded-md p-2 w-full"
                  name="remarks"
                  value={inputs.remarks}
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

              <div className="flex gap-20 items-center justify-center">
                {/* <button
                  className="bg-orange-500 rounded-md w-full max-w-xs text-white"
                  type="button"
                  id="saveBtn"
                  onClick={generatePDF}
                >
                  Save as PDF
                </button> */}

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
