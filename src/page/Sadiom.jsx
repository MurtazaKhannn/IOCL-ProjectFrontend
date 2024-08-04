import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import IOL from "../assets/logo.webp";
import { Document, Packer, Paragraph, ImageRun } from 'docx';
import { saveAs } from 'file-saver'; // Don't forget to import this

const SAD = () => {
  // const apiUrl = process.env.REACT_APP_API_URL;

  const { draftId } = useParams();
  const [draft, setDraft] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const res = await fetch(`/api/forms/InterOffice%20Memo/${draftId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setDraft(data);
          setFormData(data);
        } else {
          console.log('Failed to fetch Draft Details');
        }
      } catch (error) {
        console.log('Error in fetching draft details', error);
      }
    };

    fetchDraft();
  }, [draftId]);

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
      const url = `/api/forms/editiom/${draftId}`;
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
      const margin = 10; // Margin around the content

      // Scale the image to fit within one page
      const scale = Math.min((pageHeight - 2 * margin) / imgHeight, 1);
      const scaledImgWidth = imgWidth * scale;
      const scaledImgHeight = imgHeight * scale;

      pdf.addImage(imgData, "PNG", margin, position + margin, scaledImgWidth, scaledImgHeight);

      // Ensure that the content fits within a single page
      if (scaledImgHeight > pageHeight - 2 * margin) {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, position + margin, scaledImgWidth, scaledImgHeight);
      }

      pdf.save("technical_specification.pdf");
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
            new Paragraph({
              text: `Section: ${draft.section}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `Department: ${draft.department}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `Location: ${draft.location}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `Date: ${draft.date}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `Subject: ${draft.subject}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `Background: ${draft.background}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `Proposal: ${draft.proposal}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `Conclusion: ${draft.conclusion}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `Confidential: ${draft.confidential}`,
              spacing: { after: 200 },
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "budgetary_estimate.docx");
    });
  };

  if (!draft) return <><p>Loading ... </p></> ;

  return (
    <div className="w-full min-h-[88.9vh] gap-5 p-5 flex flex-col font-sans justify-center items-center">
      <div className="flex w-full h-full items-center justify-center">
        <div
          id="formContainer"
          className="flex flex-col items-center w-[794px] h-[900px] rounded-md justify-center gap-5 p-2 bg-white border"
        >
          <h1 className="text-4xl font-semibold">Inter Office Memo</h1>

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

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="background">Background</label>
            <input
              name="background"
              value={formData.background}
              onChange={handleChange}
              disabled={!isEditing}
              className="rounded-md p-2 w-full"
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="tccrecommendaions">Tcc recommendaions</label>
            <input
              name="tccrecommendaions"
              value={formData.tccrecommendaions}
              onChange={handleChange}
              disabled={!isEditing}
              className="rounded-md p-2 w-full"
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="conclusion">Conclusion</label>
            <input
              name="conclusion"
              value={formData.conclusion}
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
