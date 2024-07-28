import React, { useEffect, useState } from "react";

const TCCIDetails = ({ financialYears }) => {
  const predefinedValues = {
    videref1: "heyhey",
    videref2: "heyhey",
    videref3: "heyhey",
    videref4: "heyhey",
    videref5: "heyhey",
    videref6: "heyhey",
    videref7: "heyhey",
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
    grantedBy1: "heyhey",
    grantedBy2: "heyhey",
    grantedBy3: "heyhey",
    grantedBy4: "heyhey",
    grantedBy5: "heyhey",
    grantedBy6: "heyhey",
    grantedBy7: "heyhey",
    annexure1: "ANNEXURE1",
    annexure2: "ANNEXURE1",
    annexure3: "ANNEXURE1",
    annexure4: "ANNEXURE1",
    annexure5: "ANNEXURE1",
    annexure6: "ANNEXURE1",
    annexure7: "ANNEXURE1",
    annexure8: "ANNEXURE1",
    annexure9: "ANNEXURE1",
    annexure10: "ANNEXURE1",
    annexure11: "ANNEXURE1",
    annexure12: "ANNEXURE1",
    annexure13: "ANNEXURE1",
    annexure14: "ANNEXURE1",
    annexure15: "ANNEXURE1",
    annexure16: "ANNEXURE1",
    itemDetails1: "hey",
    itemDetails2: "hey",
    itemDetails3: "hey",
    refNo1: "1324657398",
    refNo2: "1324657398",
    address: "UPSO2",
    twoB: "twoB",
    three: "three",
    threeA: "threeA",
    threeB: "threeB",
    four: "four",
    corrigendum: "NA",
    tccmembers: "heyheyhey",
    modeoftendering: "NONE",
    typeoftendering: "None",
    tenderissued: "NONE",
    timeallowed: "NONE",
    prebidmeetings: "NONE",
    noofoffersreceived: "NONE",
    nooflatetenders: "NONE",
    prequalificationcriteria: "NONE",
    emd: "NONE",
    clarificationtovendors: "NONE",
    noofoffersrejectedtechnically: "NONE",
    rejectedvendorsnames: "NONE",
    noofoffersrejectedonthegrounds: "NONE",
    noofoffersrejectedonthegroundsreason: "NONE",
    referenceoftechnicalbidtcc: "NONE",
    anyprepricebidmeetingheld: "NONE",
    detailsofdeviationacceptedbytcc: "NONE",
    partieswhodonotagreeonabovedeviations: "NONE",
    anyrevisedpricebid: "NONE",
    noofpartieswhoqualifyforopeningofpricebids: "NONE",
    partieswhoqualifyforopeningofpricebids: "NONE",
    validityofoffers: "NONE",
    weathercvcguidelineshavebeencompiledwith: "NONE",
    anyotherrelevantinfo: "NONE",
    doaapprovingauthorityone: "NONE",
    doaapprovingauthoritytwo: "NONE",
    doaapprovingauthoritythree: "NONE",

  };

  const [formData, setFormData] = useState(predefinedValues);

  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    if (e.target.name === "date") {
      // Extract only the date part (yyyy-mm-dd) from the input value
      const dateValue = e.target.value.split("T")[0]; // split to remove timestamp
      setFormData({ ...formData, [e.target.name]: dateValue });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const PercentageDisplay = ({ number, percentage }) => {
    const calculatePercentage = () => {
      return (number * percentage) / 100;
    };

    return <p>{calculatePercentage()}</p>;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-[760px] divide-y divide-gray-200 text-xl">
        <thead>
          <tr>
            <th className="px-6 py-3 font-bold border-b border-gray-300">No</th>
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
            <td className="px-6 py-4 border-r border-l border-gray-300">1</td>
            <td className="px-6 py-4 border-r border-gray-300">A</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Brief background of the main project
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              Vide note ref:{" "}
              <textarea
                name="videref1"
                value={formData.videref1}
                onChange={handleChange}
                className="border-b-2 focus:border-blue-500 outline-none"
                type="text"
              />{" "}
              dated{" "}
              <input
                className="font-bold p-1"
                name="date1"
                value={formData.date1}
                onChange={handleChange}
                type="date"
              />
              , approval is granted by{" "}
              <input
                name="grantedBy1"
                value={formData.grantedBy1}
                onChange={handleChange}
                className="border-b-2 focus:border-blue-500 outline-none"
                type="text"
                placeholder=""
              />{" "}
              <p className="font-bold">
                <input
                  name="annexure1"
                  value={formData.annexure1}
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
                value={formData.videref2}
                onChange={handleChange}
                className="border-b-2 focus:border-blue-500 outline-none"
                type="text"
              />{" "}
              dated{" "}
              <input
                className=" p-1 mt-1"
                type="date"
                name="date2"
                value={formData.date2}
                onChange={handleChange}
              />{" "}
              &nbsp; is approved by{" "}
              <input
                name="grantedBy2"
                value={formData.grantedBy2}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              <p className="font-bold">
                <input
                  name="annexure2"
                  value={formData.annexure2}
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
                value={formData.videref3}
                onChange={handleChange}
                className="border-b-2 focus:border-blue-500 outline-none"
                type="text"
              />{" "}
              dated{" "}
              <input
                type="date"
                name="date3"
                value={formData.date3}
                onChange={handleChange}
                id=""
              />
              , estimate for Rs.{" "}
              <input
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                type="number"
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                placeholder="Amount"
              />{" "}
              including GST is approved by{" "}
              <input
                name="grantedBy3"
                value={formData.grantedBy3}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              <p className="font-bold">
                <input
                  name="annexure3"
                  value={formData.annexure3}
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
                value={formData.itemDetails1}
                onChange={handleChange}
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                type="text"
              />{" "}
              at{" "}
              <input
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              is granted by{" "}
              <input
                name="grantedBy4"
                value={formData.grantedBy4}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              vide note ref:{" "}
              <textarea
                className="border-b-2 focus:border-blue-500 outline-none"
                name="videref4"
                value={formData.videref4}
                onChange={handleChange}
                id=""
              ></textarea>{" "}
              dated{" "}
              <input
                className="rounded-md p-1"
                name="date4"
                value={formData.date4}
                onChange={handleChange}
                type="date"
              />{" "}
              <p className="font-bold">
                <input
                  name="annexure4"
                  value={formData.annexure4}
                  onChange={handleChange}
                  className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                  placeholder="Annexure"
                  type="text"
                />
              </p>
              <br className="mt-2" />
              Approval for PQ, Evaluation criteria, Special Terms and
              Conditions, Tender Document, Draft Bid Document is provided vide
              note ref:{" "}
              <textarea
                name="videref5"
                value={formData.videref5}
                onChange={handleChange}
                className="border-b-2 focus:border-blue-500 outline-none"
                id=""
              ></textarea>{" "}
              dated{" "}
              <input
                name="date5"
                value={formData.date5}
                onChange={handleChange}
                type="date"
              />{" "}
              duly approved by{" "}
              <input
                name="grantedBy5"
                value={formData.grantedBy5}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              <p className="font-bold">
                <input
                  name="annexure5"
                  value={formData.annexure5}
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
                value={formData.refNo1}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              dated{" "}
              <input
                name="date6"
                value={formData.date6}
                onChange={handleChange}
                type="date"
              />{" "}
              was published on GeM portal on{" "}
              <input
                type="date"
                name="date7"
                value={formData.date7}
                onChange={handleChange}
                id=""
              />{" "}
              <p className="font-bold">
                <input
                  name="annexure6"
                  value={formData.annexure6}
                  onChange={handleChange}
                  className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                  placeholder="Annexure"
                  type="text"
                />
              </p>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">1</td>
            <td className="px-6 py-4 border-r border-gray-300">B</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Description of tendered work
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              Procurement of{" "}
              <textarea
                name="itemDetails2"
                value={formData.itemDetails2}
                onChange={handleChange}
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                type="text"
              />{" "}
              at{" "}
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border-b-2 focus:border-blue-500 outline-none"
                type="text"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">1</td>
            <td className="px-6 py-4 border-r border-gray-300">C</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Tender No
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                name="refNo2"
                value={formData.refNo2}
                onChange={handleChange}
                type="text"
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />{" "}
              dated{" "}
              <input
                name="date8"
                value={formData.date8}
                onChange={handleChange}
                className="p-1 border-b-2 focus:border-blue-500 outline-none"
                type="date"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">2</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Estimated value of work
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              Rs.{" "}
              <input
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              including GST
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">2</td>
            <td className="px-6 py-4 border-r border-gray-300">A</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Approved by
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                name="grantedBy6"
                value={formData.grantedBy6}
                onChange={handleChange}
                type="text"
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />
            </td>
          </tr>

          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">2</td>
            <td className="px-6 py-4 border-r border-gray-300">B</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              In case the estimate is more than Rs. 25 Lacs whether vetted by
              Finance
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                name="twoB"
                value={formData.twoB}
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
            <td className="px-6 py-4 border-r border-l border-gray-300">3</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Whether Capital / Revenue Item
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                name="three"
                value={formData.three}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />
            </td>
            <br />
          </tr>

          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">3</td>
            <td className="px-6 py-4 border-r border-gray-300">A</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              In case of Revenue expenditure give ref No:
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                name="threeA"
                value={formData.threeA}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />
            </td>
          </tr>

          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">3</td>
            <td className="px-6 py-4 border-r border-gray-300">B</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              In case of Capital Item give IR No and Amount with Administrative
              Approval reference
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                name="threeB"
                value={formData.threeB}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />
            </td>
          </tr>

          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">4</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Cumulative commitments made prior to the current proposal against
              the approval given in item No: 3 above
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                name="four"
                value={formData.four}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">5</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Approval Reference for inviting Tender
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              Admin approval for procurement of{" "}
              <textarea
                name="itemDetails3"
                value={formData.itemDetails3}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              at{" "}
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                type="text"
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />{" "}
              is granted by{" "}
              <input
                name="grantedBy7"
                value={formData.grantedBy7}
                onChange={handleChange}
                type="text"
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />{" "}
              vide note ref:{" "}
              <textarea
                name="videref6"
                value={formData.videref6}
                onChange={handleChange}
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                id=""
              ></textarea>{" "}
              dated{" "}
              <input
                type="date"
                name="date9"
                value={formData.date9}
                onChange={handleChange}
                id=""
              />{" "}
              <p className="font-bold">
                <input
                  type="text"
                  className="border-2 rounded-md p-1 focus:border-blue-500 font-bold mt-2"
                  placeholder="ANNEXURE"
                  name="annexure7"
                  value={formData.annexure7}
                  onChange={handleChange}
                  id=""
                />
              </p>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">6</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Corrigendum issued if any
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                name="corrigendum"
                value={formData.corrigendum}
                onChange={handleChange}
                className="border-b-2 outline-none focus:border-blue-500"
                type="text"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">7</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              TCC members
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              Following are the TCC members vide office order:{" "}
              <textarea
                name="videref7"
                value={formData.videref7}
                onChange={handleChange}
                id=""
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              ></textarea>{" "}
              dated{" "}
              <input
                className=""
                name="date9"
                value={formData.date9}
                onChange={handleChange}
                type="date"
              />{" "}
              <br />{" "}
              <p className="font-bold">
                <input
                  name="annexure8"
                  value={formData.annexure8}
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
                value={formData.tccmembers}
                onChange={handleChange}
                id=""
              ></textarea>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">8</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Mode of Tendering (ST/LT/PT)
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                name="modeoftempering"
                value={formData.modeoftendering}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">9</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Type of Tendering system (Single bid / Two Bid System)
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                name="typeoftendering"
                value={formData.typeoftendering}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              <p>
                <input
                  name="annexure9"
                  value={formData.annexure9}
                  onChange={handleChange}
                  type="text"
                  className="border-2 focus:border-blue-500 rounded-md p-1 font-bold mt-2"
                  placeholder="ANNEXURE"
                />
              </p>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">10</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Tenders Issued / No of parties to whom enquiry was sent
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                name="tenderissued"
                value={formData.tenderissued}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">11</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Time allowed for submission of tenders from the date of opening of
              sale of tender documents.
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                name="timeallowed"
                value={formData.timeallowed}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none mt-2"
                placeholder=""
              />{" "}
              <p>
                <input
                  name="annexure10"
                  value={formData.annexure10}
                  onChange={handleChange}
                  type="text"
                  className="border-2 p-1 rounded-md focus:border-blue-500 outline-none mt-2 font-bold"
                  placeholder="ANNEXURE"
                />
              </p>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">12</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Whether any Pre-bid meeting held
            </td>
            <td className="px-6 py-4 border-r border-gray-300 ">
              <input
                name="prebidmeetings"
                value={formData.prebidmeetings}
                onChange={handleChange}
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">13</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Due Date & Receipt of E-tenders
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                type="datetime-local"
                name="date10"
                value={formData.date10}
                onChange={handleChange}
                id=""
              />{" "}
              <p>
                <input
                  name="annexure11"
                  value={formData.annexure11}
                  onChange={handleChange}
                  type="text"
                  placeholder="ANNEXURE"
                  className="font-bold p-1 rounded-md border-2 focus:border-blue-500"
                />
              </p>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">14</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Actual Date & Time of Opening of E-tenders
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                type="datetime-local"
                name="date11"
                value={formData.date11}
                onChange={handleChange}
                id=""
              />{" "}
              <p>
                <input
                  name="annexure12"
                  value={formData.annexure12}
                  onChange={handleChange}
                  type="text"
                  placeholder="ANNEXURE"
                  className="font-bold p-1 rounded-md border-2 focus:border-blue-500"
                />
              </p>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">15</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              No of Offers received up to the due date and time of receipt
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              The technical bid of the subject tender was opened on{" "}
              <input
                type="date"
                name="date12"
                value={formData.date12}
                onChange={handleChange}
                id=""
              />
              . On due date and time, the offers of the following parties were
              received:
              <textarea
                className="border-b-2 focus:border-blue-500 outline-none"
                name="noofoffersreceived"
                value={formData.noofoffersreceived}
                onChange={handleChange}
                id=""
              ></textarea>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">16</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              No of Late Tenders
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                name="nooflatetenders"
                value={formData.nooflatetenders}
                onChange={handleChange}
                className="border-b-2 focus:border-blue-500 outline-none"
                type="text"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">17</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Pre-Qualification Criteria
            </td>
            <td className="px-6 py-4 font-bold border-r rounded-md border-gray-300">
              <input
                name="annexure12"
                value={formData.annexure12}
                onChange={handleChange}
                type="text"
                className="border-2 rounded-md p-1 "
                placeholder="ANNEXURE"
              />
            </td>
          </tr>

          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">17</td>
            <td className="px-6 py-4 border-r border-gray-300">A</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Annual Turnover{" "}
              {financialYears &&
                financialYears.map((year, index) => (
                  <div key={index} className="mb-2">
                    <div>{year}</div>
                  </div>
                ))}
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <div>NON-MSE BIDDER:</div>
              <div>
                <span>1. Bidder Turnover - Rs </span>
                <PercentageDisplay number={formData.amount} percentage={60} />
                <span> (60%)</span>
              </div>
              <div style={{ marginTop: "1rem" }}>MSE BIDDER:</div>
              <div>
                <span>1. Bidder Turnover – Rs </span>
                <PercentageDisplay number={formData.amount} percentage={51} />
                <span> (51%)</span>
              </div>
            </td>
          </tr>

          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">17</td>
            <td className="px-6 py-4 border-r border-gray-300">B</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Similar Work
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              NON MSE BIDDER:
              <br />
              1. Three works – Rs{" "}
              <PercentageDisplay
                number={formData.amount}
                percentage={30}
              />{" "}
              each
              <br />
              2. Two works – Rs{" "}
              <PercentageDisplay
                number={formData.amount}
                percentage={40}
              />{" "}
              each
              <br />
              3. One work – Rs{" "}
              <PercentageDisplay
                number={formData.amount}
                percentage={25.5}
              />{" "}
              each
              <br />
              <br />
              MSE BIDDER:
              <br />
              1. Three works – Rs{" "}
              <PercentageDisplay number={formData.amount} percentage={25.5} /> each
              <br />
              2. Two works – Rs{" "}
              <PercentageDisplay number={formData.amount} percentage={34} /> each
              <br />
              3. One work – Rs{" "}
              <PercentageDisplay number={formData.amount} percentage={42.5} /> each
              <br />
            </td>
          </tr>

          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">17</td>
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
                value={formData.emd}
                onChange={handleChange}
                id=""
              ></textarea>
            </td>
          </tr>

          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">18</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Technical Evaluation of Bidders as per PQ Criteria and Other
              mandatory document criteria
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              Technical clarifications were raised on GeM Portal dated
              <input
                type="date"
                name="date13"
                value={formData.date13}
                onChange={handleChange}
                id=""
              />
              ,{" "}
              <input
                type="date"
                name="date14"
                value={formData.date14}
                onChange={handleChange}
                id=""
              />{" "}
              and{" "}
              <input
                type="date"
                name="date15"
                value={formData.date15}
                onChange={handleChange}
                id=""
              />{" "}
              <br /> (&nbsp;{" "}
              <input
                name="annexure13"
                value={formData.annexure13}
                onChange={handleChange}
                type="text"
                placeholder="ANNEXURE"
                className="font-bold p-1 rounded-md border-2 mt-2"
              />{" "}
              ,{" "}
              <input
                name="annexure14"
                value={formData.annexure14}
                onChange={handleChange}
                placeholder="ANNEXURE"
                className="font-bold p-1 rounded-md border-2 mt-2"
                type="text"
              />{" "}
              and{" "}
              <input
                name="annexure15"
                value={formData.annexure15}
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
                value={formData.clarificationtovendors}
                onChange={handleChange}
                className="border-b-2 focus:border-blue-500 w-28 outline-none"
                type="text"
              />{" "}
              vendors.
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">19</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              No of Offers rejected technically
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input
                name="noofoffersrejectedtechnically"
                value={formData.noofoffersrejectedtechnically}
                onChange={handleChange}
                placeholder="number"
                className="border-b-2 focus:border-blue-500 outline-none mb-5"
                type="text"
              />
              <br />
              <textarea
                placeholder="vendorname with reason "
                className="border-b-2 w-72 focus:border-blue-500 outline-none mb-2"
                name="rejectedvendorsname"
                value={formData.rejectedvendorsnames}
                onChange={handleChange}
                id=""
              ></textarea>
              <br />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">20</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              No of offer rejected on the grounds of Holiday listing and reasons
              thereof (in case of two bid)
            </td>
            <td className="px-6 py-4 border-r  border-gray-300">
              <input
                name="noofoffersrejectedonthegrounds"
                value={formData.noofoffersrejectedonthegrounds}
                onChange={handleChange}
                className="border-b-2 focus:border-blue-500 outline-none mb-2"
                type="text"
              />
              <br />
              <br />
              <textarea
                className="border-b-2 focus:border-blue-500 outline-none mb-2"
                name="noofoffersrejectedonthegroundsreason"
                value={formData.noofoffersrejectedonthegroundsreason}
                onChange={handleChange}
                id=""
              ></textarea>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">21</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Reference of Technical bid TCC minutes
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <textarea
                className="border-b-2 focus:border-blue-500 outline-none mb-2"
                name="referenceoftechnicalbidtcc"
                value={formData.referenceoftechnicalbidtcc}
                onChange={handleChange}
                id=""
              ></textarea>
              <input
                name="annexure16"
                value={formData.annexure16}
                onChange={handleChange}
                className="border-2 p-1 rounded-md outline-none mb-2 font-bold"
                placeholder="ANNEXURE"
                type="text"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">22</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Whether any pre-Price bid meeting held? If yes on which date &
              reference of Pre-bid minutes
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <textarea
                className="border-b-2 focus:border-blue-500 outline-none mb-2"
                name="anyprepricebidmeetingheld"
                value={formData.anyprepricebidmeetingheld}
                onChange={handleChange}
                id=""
              ></textarea>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">23</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Details of deviation accepted by TCC, if any
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <textarea
                className="border-b-2 focus:border-blue-500 outline-none mb-2"
                name="detailsofdeviationacceptedbytcc"
                value={formData.detailsofdeviationacceptedbytcc}
                onChange={handleChange}
                id=""
              ></textarea>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">24</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Name of parties if any who do not agree to above deviations
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <textarea
              
                className="border-b-2 focus:border-blue-500 outline-none mb-2"
                name="partieswhodonotagreeonabovedeviations"
                value={formData.partieswhodonotagreeonabovedeviations}
                onChange={handleChange}
                id=""
              ></textarea>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">25</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Any revised price bid obtained with reasons
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <textarea
                className="border-b-2 focus:border-blue-500 outline-none mb-2"
                name="anyrevisedpricebid"
                value={formData.anyrevisedpricebid}
                onChange={handleChange}
                id=""
              ></textarea>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">26</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Parties who qualify for opening of Price Bids with reference to
              TCC recommendations
            </td>
            <td className="px-6 py-4 border-r border-l border-gray-300">
              TCC recommends opening of Price bids of following{" "}
              <input
                className="border-b-2 w-36 mr-2 focus:border-blue-500 outline-none mb-2"
                type="text"
                name="noofpartieswhoqualifyforopeningofpricebids"
                value={formData.noofpartieswhoqualifyforopeningofpricebids}
                onChange={handleChange}
              />
              bidders who have been qualified as per PQ criteria and submission
              of relevant other mandatory document criteria.
              <br />
              <textarea
                className="border-b-2 focus:border-blue-500 outline-none mb-2"
                name="partieswhoqualifyforopeningofpricebids"
                value={formData.partieswhoqualifyforopeningofpricebids}
                onChange={handleChange}
                id=""
              ></textarea>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">27</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Validity of Offer
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <textarea
                className="border-b-2 focus:border-blue-500 outline-none mb-2"
                name="validityofoffers"
                value={formData.validityofoffers}
                onChange={handleChange}
                id=""
              ></textarea>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">28</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Weather CVC guidelines have been complied with.
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <textarea
              name="weathercvcguidelineshavebeencompiledwith"
              value={formData.weathercvcguidelineshavebeencompiledwith}
              onChange={handleChange}
                className="border-b-2 focus:border-blue-500 outline-none mb-2"
                type="text"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">29</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Any other relevant information.
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <textarea
                className="border-b-2 focus:border-blue-500 outline-none mb-2"
                name="anyotherrelevantinfo"
                value={formData.anyotherrelevantinfo}
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
              value={formData.doaapprovingauthorityone}
              onChange={handleChange}
                className="border-b-2 focus:border-blue-500 outline-none mb-2"
                type="text"
              />{" "}
              is requested to accord approval for opening of Price Bid of the{" "}
              <input
              name="doaapprovingauthoritytwo"
              value={formData.doaapprovingauthoritytwo}
              onChange={handleChange}
                className="border-b-2 w-40 focus:border-blue-500 outline-none mb-2"
                type="text"
              />{" "}
              technically qualified bidder as recommended above.
              <br />
              Approval sought under{" "}
              <input
              name="doaapprovingauthoritythree"
              value={formData.doaapprovingauthoritythree}
              onChange={handleChange}
                className="border-b-2 focus:border-blue-500 outline-none mb-2"
                type="text"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TCCIDetails;
