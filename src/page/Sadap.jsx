import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import IOL from "../assets/logo.webp"
import { Document, ImageRun, Packer, Paragraph, TextRun } from "docx";


const SAD = () => {
  const { draftId } = useParams();
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const url = `/api/forms/Administrative%20Page/${draftId}`;
        console.log("Fetching URL:", url); // Add this line for debugging
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setDraft(data);
        } else {
          console.log("Failed to fetch Draft Details");
        }
      } catch (error) {
        console.log("Error in fetching draft details", error);
      }
    };

    fetchDraft();
  }, [draftId]);

  if (!draft)
    return (
      <>
        <p>Loading ... </p>
      </>
    );

    const generatePDF = async () => {
      const saveButton = document.getElementById("saveasPdfBtn");
      const dropbtn = document.getElementById("dropBtn");
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
    
        // Calculate the height and position of the image
        let position = 0;
    
        if (imgHeight > pageHeight) {
          // Scale the image to fit within one page
          const scale = pageHeight / imgHeight;
          pdf.addImage(imgData, "PNG", 0, position, imgWidth * scale, pageHeight);
        } else {
          // Add the image without scaling
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        }
    
        pdf.save("administrative_approval.pdf");
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
              text: `Budget & Financial Implication: ${draft.budgetAndFinancialImplication}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `DOA Applicable: ${draft.doaApplicable}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `Effective Authority: ${draft.effectiveAuthority}`,
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
      saveAs(blob, "administrative_approval.docx");
    });
  };
    

  return (
    <div className="w-full min-h-[88.9vh] gap-5 p-5 flex flex-col font-teko justify-center items-center">
      <h1 className="text-4xl font-semibold ">Administrative Page</h1>
      <div className="flex w-full h-full items-center justify-center">
        <div
          id="formContainer"
          className="flex flex-col items-center w-[794px] h-[1123px] justify-center gap-5 p-2 bg-white border"
        >
          <img src={IOL} className="w-32" alt="" />
          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="referenceNumber">Ref&nbsp;No</label>
            <input
              type="text"
              className="rounded-md p-2 w-full"
              value={draft.referenceNumber}
              readOnly
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="section">Section</label>
            <input
              type="text"
              className="rounded-md p-2 w-full"
              value={draft.section}
              readOnly
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              className="rounded-md p-2 w-full"
              value={draft.department}
              readOnly
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="rounded-md p-2 w-full"
              value={draft.location}
              readOnly
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="date">Date</label>
            <input
              type="text"
              className="rounded-md p-2 w-full"
              value={draft.date ? draft.date.split("T")[0] : ""}
              readOnly
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              className="rounded-md p-2 w-full"
              value={draft.subject}
              readOnly
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="background">Background</label>
            <input
              type="text"
              className="rounded-md p-2 w-full"
              value={draft.background}
              readOnly
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="proposal">Proposal</label>
            <input
              type="text"
              className="rounded-md p-2 w-full"
              value={draft.proposal}
              readOnly
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="budgetAndFinancialImplication">
              Budget & Financial Implications
            </label>
            <input
              type="text"
              className="rounded-md p-2 w-full"
              value={draft.budgetAndFinancialImplication}
              readOnly
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="doaApplicable">DOA Applicable</label>
            <input
              type="text"
              className="rounded-md p-2 w-full"
              value={draft.doaApplicable}
              readOnly
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="effectiveAuthority">Effective Authority</label>
            <input
              type="text"
              className="rounded-md p-2 w-full"
              value={draft.effectiveAuthority}
              readOnly
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="conclusion">Conclusion</label>
            <input
              type="text"
              className="rounded-md p-2 w-full"
              value={draft.conclusion}
              readOnly
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="confidential">Confidential</label>
            <input
              type="text"
              className="rounded-md p-2 w-full "
              value={draft.confidential}
              readOnly
            />
          </div>

          <div className="flex w-2/3 mt-10 items-center justify-center gap-20 text-xl">
            <button id="saveasPdfBtn" onClick={generatePDF} className="bg-blue-500 px-6 py-1 rounded-md text-white text-lg">
              Save&nbsp;as&nbsp;PDF
            </button>
            <button id="dropBtn" className="bg-yellow-500 px-6 py-1 rounded-md text-white text-lg">
              Edit
            </button>
            <button onClick={generateDOCX} id="saveBtn" className="bg-orange-500 px-6 py-1 rounded-md text-white text-lg">
              Save as Doc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAD;
