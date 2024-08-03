import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import IOL from "../assets/logo.webp";
import { Document, ImageRun, Packer, Paragraph } from "docx";

const SAD = () => {
  const { draftId } = useParams();
  const [draft, setDraft] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  // const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {

    const fetchDraft = async () => {
      try {
        const url = `/api/forms/TCC%20FinalNote/${draftId}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setDraft(data);
          setFormData(data);
        } else {
          console.log("Failed to fetch Draft Details");
        }
      } catch (error) {
        console.log("Error in fetching draft details", error);
      }
    };

    fetchDraft();
  }, [draftId]);

  if (!draft) return <p>Loading ... </p>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(draft); // Reset form data
  };

  const handleSave = async () => {
    try {
      const url = `/api/forms/edittccfn/${draftId}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updatedDraft = await res.json();
        setDraft(updatedDraft);
        setIsEditing(false);
        alert("updated");
      } else {
        console.log("Failed to update draft");
      }
    } catch (error) {
      console.log("Error in updating draft", error);
    }
  };

  const generatePDF = async () => {
    const saveButton = document.getElementById("saveasPdfBtn");
    const dropbtn = document.getElementById("editBtn");
    const savebtn = document.getElementById("saveBtn");

    if (saveButton) saveButton.style.display = "none";
    if (dropbtn) dropbtn.style.display = "none";
    if (savebtn) savebtn.style.display = "none";

    const input = document.getElementById("formContainer");

    if (!input) {
      console.error("Element with ID 'formContainer' not found");
      if (saveButton) saveButton.style.display = "block";
      if (dropbtn) dropbtn.style.display = "block";
      if (savebtn) savebtn.style.display = "block";
      return;
    }

    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;

      if (imgHeight > pageHeight) {
        const scale = pageHeight / imgHeight;
        pdf.addImage(imgData, "PNG", 0, position, imgWidth * scale, pageHeight);
      } else {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      }

      pdf.save("tcc_finalnote.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      if (saveButton) saveButton.style.display = "block";
      if (dropbtn) dropbtn.style.display = "block";
      if (savebtn) savebtn.style.display = "block";
    }
  };

  const generateDOCX = async () => {
    const imageBuffer = await fetch(IOL).then((res) => res.arrayBuffer());
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new ImageRun({
                  data: imageBuffer,
                  transformation: {
                    width: 100,
                    height: 100,
                  },
                }),
              ],
              spacing: { after: 200 },
            }),
            new Paragraph({ text: `Section: ${draft.section}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Department: ${draft.department}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Location: ${draft.location}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Date: ${draft.date}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Subject: ${draft.subject}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Background: ${draft.background}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Recommendation: ${draft.recommendation}`, spacing: { after: 200 } }),
            new Paragraph({ text: `DOA Applicable: ${draft.doaApplicable}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Confidential: ${draft.confidential}`, spacing: { after: 200 } }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "administrative_approval.docx");
    });
  };

  return (
    <div className="w-full min-h-[88.9vh] gap-5 p-5 flex flex-col font-sans justify-center items-center">
      <div className="flex w-full h-full items-center justify-center">
        <div
          id="formContainer"
          className="flex flex-col items-center w-[80vw] min-h-[1000px] justify-center gap-5 p-2 bg-white border"
        >
          <h1 className="text-4xl font-semibold">TCC FinalNote</h1>

          <img src={IOL} className="w-64" alt="" />

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="referenceNumber">Ref&nbsp;&nbsp;No</label>
            <input
              type="text"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className="rounded-md p-2 w-full"
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="section">Section</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              disabled={!isEditing}
              className="rounded-md p-2 w-full"
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={!isEditing}
              className="rounded-md p-2 w-full"
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={!isEditing}
              className="rounded-md p-2 w-full"
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date.split('T')[0]}
              onChange={handleChange}
              disabled={!isEditing}
              className="rounded-md p-2 w-full"
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={!isEditing}
              className="rounded-md p-2 w-full"
            />
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
                          value={formData.noofitemsGEM}
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
                          value={formData.refno1}
                          onChange={handleChange}
                          type="text"
                        />{" "}
                        dated was published on GeM portal on{" "}
                        <input
                          type="date"
                          name="date1"
                          value={formData.date1}
                          onChange={handleChange}
                          id=""
                        />
                        <input
                          type="text"
                          name="annexure1"
                          className="p-2 font-bold rounded-md"
                          value={formData.annexure1}
                          placeholder="ANNEXURE"
                          onChange={handleChange}
                        />{" "}
                        <br /> <br /> Nominated TCC Members:
                        <input
                          type="text"
                          name="annexure2"
                          value={formData.annexure2}
                          onChange={handleChange}
                          placeholder="ANNEXURE"
                          className="font-bold rounded-md p-2"
                        />{" "}
                        <br /> <br />
                        <textarea
                          name="tccmembers1"
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                          value={formData.tccmembers}
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
                          value={formData.videref1}
                          onChange={handleChange}
                          id=""
                          cols={"64"}
                          rows={"1"}
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                        />{" "}
                        and
                        <textarea
                          name="videref2"
                          value={formData.videref2}
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
                          value={formData.annexure3}
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
                          value={formData.noofitems}
                          onChange={handleChange}
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                          type="text"
                          rows={"1"}
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
                          value={formData.refno2}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                        />{" "}
                        dated{" "}
                        <input
                          name="date2"
                          value={formData.date2}
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
                          value={formData.amount}
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
                          value={formData.amount}
                          onChange={handleChange}
                          placeholder="amount"
                          type="text"
                          className="border-b-2 mt-2 focus:border-blue-500 outline-none"
                        />{" "}
                        by
                        <input
                          name="grantedBy1"
                          value={formData.grantedBy1}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 mt-2 border-gray-300 focus:border-blue-500 outline-none"
                        />
                        vide note ref no :
                        <textarea
                          name="videref2"
                          value={formData.videref2}
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
                          value={formData.date3}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        <input
                          type="text"
                          name="annexure4"
                          className="border-2 mt-2 font-bold rounded-md p-2 border-gray-300 focus:border-blue-500 outline-none"
                          value={formData.annexure4}
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
                          value={formData.three}
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
                          value={formData.threeA}
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
                          value={formData.threeB}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />
                        Admin Approval for Rs
                        <input
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          placeholder="amount"
                          type="text"
                          className="border-b-2 mt-2 focus:border-blue-500 outline-none"
                        />{" "}
                        by
                        <input
                          name="grantedBy2"
                          value={formData.grantedBy2}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 mt-2 border-gray-300 focus:border-blue-500 outline-none"
                        />
                        vide note ref no :
                        <textarea
                          name="videref3"
                          value={formData.videref3}
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
                          value={formData.date4}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        <input
                          type="text"
                          name="annexure5"
                          className="border-2 mt-2 font-bold rounded-md p-2 border-gray-300 focus:border-blue-500 outline-none"
                          value={formData.annexure5}
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
                          value={formData.four}
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
                          value={formData.noofitems}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 mb-2 focus:border-blue-500 outline-none"
                        />{" "}
                        at{" "}
                        <input
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 mb-2 border-gray-300 focus:border-blue-500 outline-none"
                        />{" "}
                        is granted by{" "}
                        <input
                          name="grantedBy3"
                          value={formData.grantedBy3}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 mb-2 border-gray-300 focus:border-blue-500 outline-none"
                        />{" "}
                        vide note ref:{" "}
                        <input
                          name="videref4"
                          value={formData.videref4}
                          onChange={handleChange}
                          className="border-b-2 mb-2 border-gray-300 focus:border-blue-500 outline-none"
                          id=""
                        />
                        dated{" "}
                        <input
                          type="date"
                          name="date5"
                          value={formData.date5}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        <p className="font-bold">
                          <input
                            type="text"
                            className="border-2 rounded-md p-2 focus:border-blue-500 font-bold mt-2"
                            placeholder="ANNEXURE"
                            name="annexure6"
                            value={formData.annexure6}
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
                          value={formData.modeoftendering}
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
                          value={formData.typeoftendering}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none"
                        />{" "}
                        <p>
                          <input
                            name="annexure7"
                            value={formData.annexure7}
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
                          value={formData.tenderissued}
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
                          value={formData.timeallowed}
                          onChange={handleChange}
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none mt-2"
                          placeholder=""
                        />{" "}
                        <p>
                          <input
                            name="annexure8"
                            value={formData.annexure8}
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
                          value={formData.prebidmeetings}
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
                          value={formData.date6}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        <p>
                          <input
                            name="annexure9"
                            value={formData.annexure9}
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
                          value={formData.date7}
                          onChange={handleChange}
                          id=""
                        />{" "}
                        <p>
                          <input
                            name="annexure10"
                            value={formData.annexure10}
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
                          value={formData.date8}
                          onChange={handleChange}
                          id=""
                        />
                        . On due date and time, the offers of the following
                        parties were received:
                        <textarea
                          className="border-b-2 focus:border-blue-500 outline-none"
                          name="noofoffersreceived"
                          value={formData.noofoffersreceived}
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
                          value={formData.nooflatetenders}
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
                          value={formData.annexure11}
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
                          value={formData.emd}
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
                          name="rejectedvendorsnames"
                          cols={64}
                          value={formData.rejectedvendorsnames}
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
                          value={formData.noofoffersrejectedonthegrounds}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          type="text"
                        />
                        Holiday listing status has been checked from Vendor
                        Holiday List on intranet,
                        <input
                          name="noofoffersrejectedonthegroundstwo"
                          value={formData.noofoffersrejectedonthegroundstwo}
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
                          value={formData.referenceoftechnicalbidtcc}
                          onChange={handleChange}
                          id=""
                          cols={64}
                        />
                        dated
                        <input
                          type="date"
                          name="date11"
                          value={formData.date11}
                          onChange={handleChange}
                          className="mb-2 mt-1"
                          id=""
                        />
                        <input
                          name="annexure12"
                          value={formData.annexure12}
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
                          value={formData.anyprepricebidmeetingheld}
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
                          value={formData.detailsofdeviationacceptedbytcc}
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
                          value={formData.partieswhodonotagreeonabovedeviations}
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
                          value={formData.anyrevisedpricebid}
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
                            formData.noofpartieswhoqualifyforopeningofpricebids
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
                          value={formData.partieswhoqualifyforopeningofpricebids}
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
                          value={formData.date12}
                          onChange={handleChange}
                          id=""
                        />
                        &nbsp;
                        dated
                        &nbsp;
                        <input
                          name="annexure13"
                          value={formData.annexure13}
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
                          value={formData.publicsector}
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
                          value={formData.pricepreference}
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
                          value={formData.pricenegotiation}
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
                          value={formData.letterofparties}
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
                          value={formData.amount}
                          onChange={handleChange}
                        />{" "}
                        against public bid on GeM Portal. Therefore, TCC
                        recommends that work may be awarded to{" "}
                        <textarea
                          type="text"
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          name="recommendationbytcc"
                          value={formData.recommendationbytcc}
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
                          value={formData.recommendedparties}
                          onChange={handleChange}
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          type="text"
                        />{" "}
                        is recommended with L1 rate of Rs.
                        <input
                          name="amount"
                          value={formData.amount}
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
                          value={formData.amount}
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
                          value={formData.reasonofrecommendation}
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
                          value={formData.awardofjob}
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
                          value={formData.validityofoffer}
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
                          value={formData.alldeclaration}
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
                          value={formData.cvcguidelines}
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
                          value={formData.anyotherrelevantinformation}
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
                          value={formData.grantedBy4}
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
                          value={formData.recommendationdoa}
                          onChange={handleChange}
                          rows={1}
                        />
                        for Rs
                        <input
                          type="text"
                          name="amount"
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          value={formData.amount}
                          onChange={handleChange}
                        />
                        <textarea
                          name="rsinwords"
                          className="border-b-2 focus:border-blue-500 outline-none mb-2"
                          value={formData.rsinwords}
                          onChange={handleChange}
                          id=""
                          rows={1}
                        />
                        including GST @18% Approval sought under{" "}
                        <input
                          type="text"
                          name="doalaw"
                          value={formData.doalaw}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>


          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="recommendation">Recommendation</label>
            <input
              name="recommendation"
              value={formData.recommendation}
              onChange={handleChange}
              disabled={!isEditing}
              className="rounded-md p-2 w-full"
            />
          </div>



          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="doaApplicable">DOA Applicable</label>
            <input
              name="doaApplicable"
              value={formData.doaApplicable}
              onChange={handleChange}
              disabled={!isEditing}
              className="rounded-md p-2 w-full"
            />
          </div>


          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="confidential">Confidential</label>
            <input
              name="confidential"
              value={formData.confidential}
              onChange={handleChange}
              disabled={!isEditing}
              className="rounded-md p-2 w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        {isEditing ? (
          <>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <button
            id="editBtn"
              onClick={handleEdit}
              className="bg-yellow-400 text-white w-[7vw] p-2 rounded-lg hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={generatePDF}
              id="saveasPdfBtn"
              className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-700"
            >
              Save as PDF
            </button>
            <button
              onClick={generateDOCX}
              id="saveBtn"
              className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-700"
            >
              Save as DOCX
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SAD;
