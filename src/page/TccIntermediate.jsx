import React, { useEffect, useState } from "react";
import IOL from "../assets/logo.webp";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const TCCIntermediate = () => {
  // const apiUrl = process.env.REACT_APP_API_URL;

  const predefinedValues = {
    section: "Information System",
    department: "Information Technology",
    location: "Uttar Pradesh",
    date: "",
    subject: "",
    confidential: "Yes",
    financialYears: [],
    videref1: "",
    videref2: "",
    videref3: "",
    videref4: "",
    videref5: "",
    videref6: "",
    videref7: "",
    amount: "",
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
    date13: "",
    date14: "",
    date15: "",
    date16: "", 
    grantedBy1: "",
    grantedBy2: "",
    grantedBy3: "",
    grantedBy4: "",
    grantedBy5: "",
    grantedBy6: "",
    grantedBy7: "",
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
    annexure14: "",
    annexure15: "",
    annexure16: "",
    annexure17: "",
    itemDetails1: "",
    itemDetails2: "",
    itemDetails3: "",
    refNo1: "",
    refNo2: "",
    address: "",
    twoB: "",
    three: "",
    threeA: "",
    threeB: "",
    four: "",
    corrigendum: "",
    tccmembers: "",
    modeoftendering: "",
    typeoftendering: "",
    tenderissued: "",
    timeallowed: "",
    prebidmeetings: "",
    noofoffersreceived: "",
    nooflatetenders: "",
    prequalificationcriteria: "",
    emd: "",
    clarificationtovendors: "",
    noofoffersrejectedtechnically: "",
    rejectedvendorsnames: "",
    noofoffersrejectedonthegrounds: "",
    noofoffersrejectedonthegroundsreason: "",
    referenceoftechnicalbidtcc: "",
    anyprepricebidmeetingheld: "",
    detailsofdeviationacceptedbytcc: "",
    partieswhodonotagreeonabovedeviations: "",
    anyrevisedpricebid: "",
    noofpartieswhoqualifyforopeningofpricebids: "",
    partieswhoqualifyforopeningofpricebids: "",
    validityofoffers: "",
    weathercvcguidelineshavebeencompiledwith: "",
    anyotherrelevantinfo: "",
    doaapprovingauthorityone: "",
    doaapprovingauthoritytwo: "",
    doaapprovingauthoritythree: "",
  };

  const [inputs, setinputs] = useState(predefinedValues);
  const [loading, setLoading] = useState(false);

  const getPastThreeFinancialYears = () => {
    const currentYear = new Date().getFullYear();
    const financialYears = [];
    for (let i = 0; i < 3; i++) {
      financialYears.push(`${currentYear - i - 1}/${currentYear - i}`);
    }
    return financialYears;
  };

  useEffect(() => {
    const storedInputs = JSON.parse(localStorage.getItem("tcci-form"));
    if (storedInputs) {
      setinputs({
        ...storedInputs,
        financialYears: getPastThreeFinancialYears(),
      });
    } else {
      setinputs((prevInputs) => ({
        ...prevInputs,
        financialYears: getPastThreeFinancialYears(),
      }));
    }
  }, []);

  
  const PercentageDisplay = ({ number, percentage }) => {
    const calculatePercentage = () => {
      return (number * percentage) / 100;
    };

    return <p>{calculatePercentage()}</p>;
  };

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
    localStorage.setItem("tcci-form", JSON.stringify(newInputs));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/forms/tccintermediate`, {
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

              <div className="overflow-x-auto">
                <table className="w-[760px] divide-y divide-gray-200 text-xl">
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
                        Brief background of the main project
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        Vide note ref:{" "}
                        <textarea
                          name="videref1"
                          value={inputs.videref1}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none"
                          type="text"
                        />{" "}
                        dated{" "}
                        <input
                          className="font-bold p-1"
                          name="date1"
                          value={inputs.date1}
                          onChange={handleChange}
                          type="date"
                        />
                        , approval is granted by{" "}
                        <input
                          name="grantedBy1"
                          value={inputs.grantedBy1}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none"
                          type="text"
                          placeholder=""
                        />{" "}
                        <p className="font-bold">
                          <input
                            name="annexure1"
                            value={inputs.annexure1}
                            onChange={handleChange}
                            className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                            placeholder="Annexure"
                            type="text"
                          />
                        </p>
                        <br className="" />
                        Approval for technical specifications vide ref:{" "}
                        <textarea
                          name="videref2"
                          value={inputs.videref2}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none"
                          type="text"
                        />{" "}
                        dated{" "}
                        <input
                          className=" p-1 mt-1"
                          type="date"
                          name="date2"
                          value={inputs.date2}
                          onChange={handleChange}
                        />{" "}
                        &nbsp; is approved by{" "}
                        <input
                          name="grantedBy2"
                          value={inputs.grantedBy2}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />{" "}
                        <p className="font-bold">
                          <input
                            name="annexure2"
                            value={inputs.annexure2}
                            onChange={handleChange}
                            className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                            placeholder="Annexure"
                            type="text"
                          />
                        </p>
                        <br className="mt-2" />
                        Vide note ref:{" "}
                        <textarea
                          name="videref3"
                          value={inputs.videref3}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none"
                          type="text"
                        />{" "}
                        dated{" "}
                        <input
                          type="date"
                          name="date3"
                          value={inputs.date3}
                          onChange={handleChange}
                          id=""
                        />
                        , estimate for Rs.{" "}
                        <input
                          name="amount"
                          value={inputs.amount}
                          onChange={handleChange}
                          type="number"
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                          placeholder="Amount"
                        />{" "}
                        including GST is approved by{" "}
                        <input
                          name="grantedBy3"
                          value={inputs.grantedBy3}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />{" "}
                        <p className="font-bold">
                          <input
                            name="annexure3"
                            value={inputs.annexure3}
                            onChange={handleChange}
                            className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                            placeholder="Annexure"
                            type="text"
                          />
                        </p>
                        <br className="mt-2" />
                        Admin approval for procurement of{" "}
                        <textarea
                          name="itemDetails1"
                          value={inputs.itemDetails1}
                          onChange={handleChange}
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                          type="text"
                        />{" "}
                        at{" "}
                        <input
                          name="amount"
                          value={inputs.amount}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />{" "}
                        is granted by{" "}
                        <input
                          name="grantedBy4"
                          value={inputs.grantedBy4}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />{" "}
                        vide note ref:{" "}
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none"
                          name="videref4"
                          value={inputs.videref4}
                          onChange={handleChange}
                          id=""
                        ></textarea>{" "}
                        dated{" "}
                        <input
                          className="rounded-md p-1"
                          name="date4"
                          value={inputs.date4}
                          onChange={handleChange}
                          type="date"
                        />{" "}
                        <p className="font-bold">
                          <input
                            name="annexure4"
                            value={inputs.annexure4}
                            onChange={handleChange}
                            className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                            placeholder="Annexure"
                            type="text"
                          />
                        </p>
                        <br className="mt-2" />
                        Approval for PQ, Evaluation criteria, Special Terms and
                        Conditions, Tender Document, Draft Bid Document is
                        provided vide note ref:{" "}
                        <textarea
                          name="videref5"
                          value={inputs.videref5}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none"
                          id=""
                        ></textarea>{" "}
                        dated{" "}
                        <input
                          name="date5"
                          value={inputs.date5}
                          onChange={handleChange}
                          type="date"
                        />{" "}
                        duly approved by{" "}
                        <input
                          name="grantedBy5"
                          value={inputs.grantedBy5}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />{" "}
                        <p className="font-bold">
                          <input
                            name="annexure5"
                            value={inputs.annexure5}
                            onChange={handleChange}
                            className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                            placeholder="Annexure"
                            type="text"
                          />
                        </p>
                        <br className="mt-2" />
                        E-Tender -{" "}
                        <input
                          name="refNo1"
                          value={inputs.refNo1}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />{" "}
                        dated{" "}
                        <input
                          name="date6"
                          value={inputs.date6}
                          onChange={handleChange}
                          type="date"
                        />{" "}
                        was published on GeM portal on{" "}
                        <input
                          type="date"
                          name="date7"
                          value={inputs.date7}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        <p className="font-bold">
                          <input
                            name="annexure6"
                            value={inputs.annexure6}
                            onChange={handleChange}
                            className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                            placeholder="Annexure"
                            type="text"
                          />
                        </p>
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
                          name="itemDetails2"
                          value={inputs.itemDetails2}
                          onChange={handleChange}
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                          type="text"
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
                          name="refNo2"
                          value={inputs.refNo2}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                        />{" "}
                        dated{" "}
                        <input
                          name="date8"
                          value={inputs.date8}
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
                        <input
                          name="grantedBy6"
                          value={inputs.grantedBy6}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
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
                        <input
                          name="four"
                          value={inputs.four}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        5
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Approval Reference for inviting Tender
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        Admin approval for procurement of{" "}
                        <textarea
                          name="itemDetails3"
                          value={inputs.itemDetails3}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />{" "}
                        at{" "}
                        <input
                          name="address"
                          value={inputs.address}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                        />{" "}
                        is granted by{" "}
                        <input
                          name="grantedBy7"
                          value={inputs.grantedBy7}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                        />{" "}
                        vide note ref:{" "}
                        <textarea
                          name="videref6"
                          value={inputs.videref6}
                          onChange={handleChange}
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                          id=""
                        ></textarea>{" "}
                        dated{" "}
                        <input
                          type="date"
                          name="date9"
                          value={inputs.date9}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        <p className="font-bold">
                          <input
                            type="text"
                            className="border-2 rounded-md p-1 focus:border-blue-500 font-bold mt-2"
                            placeholder="ANNEXURE"
                            name="annexure7"
                            value={inputs.annexure7}
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
                        Corrigendum issued if any
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          name="corrigendum"
                          value={inputs.corrigendum}
                          onChange={handleChange}
                          className="border-b-2 outline-none focus:border-blue-500"
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        7
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        TCC members
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        Following are the TCC members vide office order:{" "}
                        <textarea
                          name="videref7"
                          value={inputs.videref7}
                          onChange={handleChange}
                          id=""
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                        ></textarea>{" "}
                        dated{" "}
                        <input
                          className=""
                          name="date10"
                          value={inputs.date10}
                          onChange={handleChange}
                          type="date"
                        />{" "}
                        <br />{" "}
                        <p className="font-bold">
                          <input
                            name="annexure8"
                            value={inputs.annexure8}
                            onChange={handleChange}
                            type="text"
                            className="border-2 rounded-md p-1 mt-2"
                            placeholder="ANNEXURE"
                          />
                        </p>{" "}
                        <br />
                        <br />
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none"
                          placeholder="Name of TCC Members"
                          name="tccmembers"
                          value={inputs.tccmembers}
                          onChange={handleChange}
                          id=""
                        ></textarea>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        8
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
                        9
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
                            name="annexure9"
                            value={inputs.annexure9}
                            onChange={handleChange}
                            type="text"
                            className="border-2 focus:border-blue-500 rounded-md p-1 font-bold mt-2"
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
                        11
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
                            name="annexure10"
                            value={inputs.annexure10}
                            onChange={handleChange}
                            type="text"
                            className="border-2 p-1 rounded-md focus:border-blue-500 outline-none mt-2 font-bold"
                            placeholder="ANNEXURE"
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
                        13
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Due Date & Receipt of E-tenders
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          type="datetime-local"
                          name="date11"
                          value={inputs.date11}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        <p>
                          <input
                            name="annexure11"
                            value={inputs.annexure11}
                            onChange={handleChange}
                            type="text"
                            placeholder="ANNEXURE"
                            className="font-bold p-1 rounded-md border-2 focus:border-blue-500"
                          />
                        </p>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        14
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Actual Date & Time of Opening of E-tenders
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <input
                          type="datetime-local"
                          name="date12"
                          value={inputs.date12}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        <p>
                          <input
                            name="annexure12"
                            value={inputs.annexure12}
                            onChange={handleChange}
                            type="text"
                            placeholder="ANNEXURE"
                            className="font-bold p-1 rounded-md border-2 focus:border-blue-500"
                          />
                        </p>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        15
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
                          name="date13"
                          value={inputs.date13}
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
                        ></textarea>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        16
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
                        17
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Pre-Qualification Criteria
                      </td>
                      <td className="px-6 py-4 font-bold border-r rounded-md border-gray-300">
                        <input
                          name="annexure13"
                          value={inputs.annexure13}
                          onChange={handleChange}
                          type="text"
                          className="border-2 rounded-md p-1 "
                          placeholder="ANNEXURE"
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        17
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">A</td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Annual Turnover{" "}
                        {inputs.financialYears &&
                          inputs.financialYears.map((year, index) => (
                            <div key={index} className="mb-2">
                              <div>{year}</div>
                            </div>
                          ))}
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <div>NON-MSE BIDDER:</div>
                        <div>
                          <span>1. Bidder Turnover - Rs </span>
                          <PercentageDisplay
                            number={inputs.amount}
                            percentage={60}
                          />
                          <span> (60%)</span>
                        </div>
                        <div style={{ marginTop: "1rem" }}>MSE BIDDER:</div>
                        <div>
                          <span>1. Bidder Turnover – Rs </span>
                          <PercentageDisplay
                            number={inputs.amount}
                            percentage={51}
                          />
                          <span> (51%)</span>
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        17
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">B</td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Similar Work
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        NON MSE BIDDER:
                        <br />
                        1. Three works – Rs{" "}
                        <PercentageDisplay
                          number={inputs.amount}
                          percentage={30}
                        />{" "}
                        each
                        <br />
                        2. Two works – Rs{" "}
                        <PercentageDisplay
                          number={inputs.amount}
                          percentage={40}
                        />{" "}
                        each
                        <br />
                        3. One work – Rs{" "}
                        <PercentageDisplay
                          number={inputs.amount}
                          percentage={25.5}
                        />{" "}
                        each
                        <br />
                        <br />
                        MSE BIDDER:
                        <br />
                        1. Three works – Rs{" "}
                        <PercentageDisplay
                          number={inputs.amount}
                          percentage={25.5}
                        />{" "}
                        each
                        <br />
                        2. Two works – Rs{" "}
                        <PercentageDisplay
                          number={inputs.amount}
                          percentage={34}
                        />{" "}
                        each
                        <br />
                        3. One work – Rs{" "}
                        <PercentageDisplay
                          number={inputs.amount}
                          percentage={42.5}
                        />{" "}
                        each
                        <br />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        17
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">C</td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        EMD
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        {/* NIL – EMD is waivered off. All the bidders have to submit the bid
              security declaration */}
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none"
                          name="emd"
                          value={inputs.emd}
                          onChange={handleChange}
                          id=""
                        ></textarea>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        18
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Technical Evaluation of Bidders as per PQ Criteria and
                        Other mandatory document criteria
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        Technical clarifications were raised on GeM Portal dated
                        <input
                          type="date"
                          name="date14"
                          value={inputs.date14}
                          onChange={handleChange}
                          id=""
                        />
                        ,{" "}
                        <input
                          type="date"
                          name="date15"
                          value={inputs.date15}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        and{" "}
                        <input
                          type="date"
                          name="date16"
                          value={inputs.date16}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        <br /> (&nbsp;{" "}
                        <input
                          name="annexure14"
                          value={inputs.annexure14}
                          onChange={handleChange}
                          type="text"
                          placeholder="ANNEXURE"
                          className="font-bold p-1 rounded-md border-2 mt-2"
                        />{" "}
                        ,{" "}
                        <input
                          name="annexure15"
                          value={inputs.annexure15}
                          onChange={handleChange}
                          placeholder="ANNEXURE"
                          className="font-bold p-1 rounded-md border-2 mt-2"
                          type="text"
                        />{" "}
                        and{" "}
                        <input
                          name="annexure16"
                          value={inputs.annexure16}
                          onChange={handleChange}
                          placeholder="ANNEXURE"
                          type="text"
                          className="font-bold p-1 w-52 mt-2 rounded-md border-2"
                          id=""
                        />
                        &nbsp;&nbsp;)
                        <br />
                        All clarifications are raised to all the{" "}
                        <input
                          name="clarificationtovendors"
                          value={inputs.clarificationtovendors}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 w-28 outline-none"
                          type="text"
                        />{" "}
                        vendors.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        19
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        No of Offers rejected technically
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
                          value={inputs.rejectedvendorsnames}
                          onChange={handleChange}
                          id=""
                        ></textarea>
                        <br />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        20
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
                        <br />
                        <br />
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="noofoffersrejectedonthegroundsreason"
                          value={inputs.noofoffersrejectedonthegroundsreason}
                          onChange={handleChange}
                          id=""
                        ></textarea>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        21
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Reference of Technical bid TCC minutes
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="referenceoftechnicalbidtcc"
                          value={inputs.referenceoftechnicalbidtcc}
                          onChange={handleChange}
                          id=""
                        ></textarea>
                        <input
                          name="annexure17"
                          value={inputs.annexure17}
                          onChange={handleChange}
                          className="border-2 p-1 rounded-md outline-none mb-2 font-bold"
                          placeholder="ANNEXURE"
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        22
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
                        ></textarea>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        23
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
                        ></textarea>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        24
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
                        ></textarea>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        25
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
                        ></textarea>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        26
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Parties who qualify for opening of Price Bids with
                        reference to TCC recommendations
                      </td>
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        TCC recommends opening of Price bids of following{" "}
                        <input
                          className="border-b-2 w-36 mr-2 focus:border-blue-500 outline-none mb-2"
                          type="text"
                          name="noofpartieswhoqualifyforopeningofpricebids"
                          value={
                            inputs.noofpartieswhoqualifyforopeningofpricebids
                          }
                          onChange={handleChange}
                        />
                        bidders who have been qualified as per PQ criteria and
                        submission of relevant other mandatory document
                        criteria.
                        <br />
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="partieswhoqualifyforopeningofpricebids"
                          value={
                            inputs.partieswhoqualifyforopeningofpricebids
                          }
                          onChange={handleChange}
                          id=""
                        ></textarea>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        27
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Validity of Offer
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="validityofoffers"
                          value={inputs.validityofoffers}
                          onChange={handleChange}
                          id=""
                        ></textarea>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        28
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Weather CVC guidelines have been complied with.
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <textarea
                          name="weathercvcguidelineshavebeencompiledwith"
                          value={
                            inputs.weathercvcguidelineshavebeencompiledwith
                          }
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-l border-gray-300">
                        29
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-gray-300">
                        Any other relevant information.
                      </td>
                      <td className="px-6 py-4 border-r border-gray-300">
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="anyotherrelevantinfo"
                          value={inputs.anyotherrelevantinfo}
                          onChange={handleChange}
                          id=""
                        ></textarea>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                        30
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300"></td>
                      <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                        DOA/Approving Authority.
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-300">
                        <input
                          name="doaapprovingauthorityone"
                          value={inputs.doaapprovingauthorityone}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          type="text"
                        />{" "}
                        is requested to accord approval for opening of Price Bid
                        of the{" "}
                        <input
                          name="doaapprovingauthoritytwo"
                          value={inputs.doaapprovingauthoritytwo}
                          onChange={handleChange}
                          className="border-b-2 w-40 focus:border-blue-500 outline-none mb-2"
                          type="text"
                        />{" "}
                        technically qualified bidder as recommended above.
                        <br />
                        Approval sought under{" "}
                        <input
                          name="doaapprovingauthoritythree"
                          value={inputs.doaapprovingauthoritythree}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
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
