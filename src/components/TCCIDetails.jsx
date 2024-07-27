import React, { useState } from "react";

const TCCIDetails = ({ financialYears }) => {
  const [number, setNumber] = useState(0);

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
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
                className="border-b-2 focus:border-blue-500 outline-none"
                type="text"
              />{" "}
              dated <input className="font-bold p-1" type="date" />, approval is
              granted by{" "}
              <input
                className="border-b-2 focus:border-blue-500 outline-none"
                type="text"
                placeholder=""
              />{" "}
              <p className="font-bold">
                <input
                  className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                  placeholder="Annexure"
                  type="text"
                />
              </p>
              <br className="" />
              Approval for technical specifications vide ref:{" "}
              <input
                className="border-b-2 focus:border-blue-500 outline-none"
                type="text"
              />{" "}
              dated <input className=" p-1 mt-1" type="date" /> &nbsp; is
              approved by{" "}
              <input
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              <p className="font-bold">
                <input
                  className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                  placeholder="Annexure"
                  type="text"
                />
              </p>
              <br className="mt-2" />
              Vide note ref:{" "}
              <textarea
                className="border-b-2 focus:border-blue-500 outline-none"
                type="text"
              />{" "}
              dated <input type="date" name="" id="" />, estimate for Rs.{" "}
              <input
                type="number"
                value={number}
                onChange={handleNumberChange}
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                placeholder="Amount"
              />{" "}
              including GST is approved by{" "}
              <input
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              <p className="font-bold">
                <input
                  className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                  placeholder="Annexure"
                  type="text"
                />
              </p>
              <br className="mt-2" />
              Admin approval for procurement of{" "}
              <textarea
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                type="text"
              />{" "}
              at{" "}
              <input
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              is granted by{" "}
              <input
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              vide note ref:{" "}
              <textarea
                className="border-b-2 focus:border-blue-500 outline-none"
                name=""
                id=""
              ></textarea>{" "}
              dated <input className="rounded-md p-1" type="date" />{" "}
              <p className="font-bold">
                <input
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
                className="border-b-2 focus:border-blue-500 outline-none"
                name=""
                id=""
              ></textarea>{" "}
              dated <input type="date" /> duly approved by{" "}
              <input
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              <p className="font-bold">
                <input
                  className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                  placeholder="Annexure"
                  type="text"
                />
              </p>
              <br className="mt-2" />
              E-Tender -{" "}
              <input
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              dated <input type="date" /> was published on GeM portal on{" "}
              <input type="date" name="" id="" />{" "}
              <p className="font-bold">
                <input
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
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                type="text"
              />{" "}
              at{" "}
              <input
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
                type="text"
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />{" "}
              dated{" "}
              <input
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
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              at{" "}
              <input
                type="text"
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />{" "}
              is granted by{" "}
              <input
                type="text"
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />{" "}
              vide note ref:{" "}
              <textarea
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                name=""
                id=""
              ></textarea>{" "}
              dated <input type="date" name="" id="" />{" "}
              <p className="font-bold">
                <input
                  type="text"
                  className="border-2 rounded-md p-1 focus:border-blue-500 font-bold mt-2"
                  placeholder="ANNEXURE"
                  name=""
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
                name=""
                id=""
                className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              ></textarea>{" "}
              dated <input className="" type="date" /> <br />{" "}
              <p className="font-bold">
                <input
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
                name=""
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
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              <p>
                <input
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
                type="text"
                className="border-b-2 focus:border-blue-500 outline-none mt-2"
                placeholder=""
              />{" "}
              <p>
                <input
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
              <input type="date" name="" className="w-[12vw] mb-2" id="" /> @{" "}
              <input
                type="text"
                placeholder="time"
                className="w-[5vw] border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              <p>
                <input
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
              <input type="date" name="" className="w-[12vw] mb-2" id="" /> @{" "}
              <input
                type="text"
                placeholder="time"
                className="w-[5vw] border-b-2 focus:border-blue-500 outline-none"
              />{" "}
              <p>
                <input
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
              <input type="date" name="" id="" />. On due date and time, the
              offers of the following parties were received:
              <textarea
                className="border-b-2 focus:border-blue-500 outline-none"
                name=""
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
                <PercentageDisplay number={number} percentage={60} />
                <span> (60%)</span>
              </div>
              <div style={{ marginTop: "1rem" }}>MSE BIDDER:</div>
              <div>
                <span>1. Bidder Turnover – Rs </span>
                <PercentageDisplay number={number} percentage={51} />
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
              <PercentageDisplay number={number} percentage={30} /> each
              <br />
              2. Two works – Rs{" "}
              <PercentageDisplay number={number} percentage={40} /> each
              <br />
              3. One work – Rs{" "}
              <PercentageDisplay number={number} percentage={25.5} /> each
              <br />
              <br />
              MSE BIDDER:
              <br />
              1. Three works – Rs{" "}
              <PercentageDisplay number={number} percentage={25.5} /> each
              <br />
              2. Two works – Rs{" "}
              <PercentageDisplay number={number} percentage={34} /> each
              <br />
              3. One work – Rs{" "}
              <PercentageDisplay number={number} percentage={42.5} /> each
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
              <textarea className="border-b-2 focus:border-blue-500 outline-none" name="" id=""></textarea>
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
              <input type="date" name="" id="" />, <input type="date" name="" id="" /> and <input type="date" name="" id="" /> <br /> (&nbsp; <input type="text" placeholder="ANNEXURE" className="font-bold p-1 rounded-md border-2 mt-2" /> , <input placeholder="ANNEXURE" className="font-bold p-1 rounded-md border-2 mt-2" type="text" /> and <input placeholder="ANNEXURE" type="text" className="font-bold p-1 w-52 mt-2 rounded-md border-2" name="" id="" />
              &nbsp;&nbsp;)
              <br />
              All clarifications are raised to all the <input className="border-b-2 focus:border-blue-500 w-28 outline-none" type="text" /> vendors.
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">19</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              No of Offers rejected technically
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <input placeholder="number" className="border-b-2 focus:border-blue-500 outline-none mb-5" type="text" />
              <br />
              <textarea placeholder="vendorname with reason " className="border-b-2 w-72 focus:border-blue-500 outline-none mb-2" name="" id=""></textarea>
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
              <input className="border-b-2 focus:border-blue-500 outline-none mb-2" type="text" />
              <br />
              <br />
              <textarea className="border-b-2 focus:border-blue-500 outline-none mb-2" name="" id=""></textarea>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">21</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Reference of Technical bid TCC minutes
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <textarea className="border-b-2 focus:border-blue-500 outline-none mb-2" name="" id=""></textarea>
              <input className="border-2 p-1 rounded-md outline-none mb-2 font-bold" placeholder="ANNEXURE" type="text" />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">22</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Whether any pre-Price bid meeting held? If yes on which date &
              reference of Pre-bid minutes
            </td>
            <td className="px-6 py-4 border-r border-gray-300"><textarea className="border-b-2 focus:border-blue-500 outline-none mb-2" name="" id=""></textarea></td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">23</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Details of deviation accepted by TCC, if any
            </td>
            <td className="px-6 py-4 border-r border-gray-300"><textarea className="border-b-2 focus:border-blue-500 outline-none mb-2" name="" id=""></textarea></td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">24</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Name of parties if any who do not agree to above deviations
            </td>
            <td className="px-6 py-4 border-r border-gray-300"><textarea className="border-b-2 focus:border-blue-500 outline-none mb-2" name="" id=""></textarea></td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">25</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Any revised price bid obtained with reasons
            </td>
            <td className="px-6 py-4 border-r border-gray-300"><textarea className="border-b-2 focus:border-blue-500 outline-none mb-2" name="" id=""></textarea></td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">26</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Parties who qualify for opening of Price Bids with reference to
              TCC recommendations
            </td>
            <td className="px-6 py-4 border-r border-l border-gray-300">
              TCC recommends opening of Price bids of following <input className="border-b-2 w-36 mr-2 focus:border-blue-500 outline-none mb-2" type="text" />
              bidders who have been qualified as per PQ criteria and submission
              of relevant other mandatory document criteria.
              <br />
              <textarea className="border-b-2 focus:border-blue-500 outline-none mb-2" name="" id=""></textarea>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">27</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Validity of Offer
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              <textarea className="border-b-2 focus:border-blue-500 outline-none mb-2" name="" id=""></textarea>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">28</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Weather CVC guidelines have been complied with.
            </td>
            <td className="px-6 py-4 border-r border-gray-300"><input className="border-b-2 focus:border-blue-500 outline-none mb-2" type="text" /></td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-l border-gray-300">29</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Any other relevant information.
            </td>
            <td className="px-6 py-4 border-r border-gray-300"><textarea className="border-b-2 focus:border-blue-500 outline-none mb-2" name="" id=""></textarea></td>
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
              <input className="border-b-2 focus:border-blue-500 outline-none mb-2" type="text" /> is requested to accord approval for opening of
              Price Bid of the <input className="border-b-2 w-40 focus:border-blue-500 outline-none mb-2" type="text" /> technically qualified bidder as
              recommended above.
              <br />
              Approval sought under <input className="border-b-2 focus:border-blue-500 outline-none mb-2" type="text" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TCCIDetails;
