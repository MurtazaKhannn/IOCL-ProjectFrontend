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
        const res = await fetch(`/api/forms/Inprinciple%20Approval/${draftId}`, {
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
      const url = `/api/forms/editipa/${draftId}`;
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

      pdf.save("inprinciple_approval.pdf");
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
              text: `Perspective: ${draft.perspective}`,
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
      saveAs(blob, "inprinciple_approval.docx");
    });
  };

  if (!draft) return <><p>Loading ... </p></> ;

  return (
    <div id='formContainer' className='w-full min-h-[88.9vh] gap-5 p-5 flex flex-col font-teko justify-center items-center'>
      <h1 className='text-4xl font-semibold '>Inprinciple Approval</h1>
      <img src={IOL} className='w-32' alt="" />
      <div className='flex w-full h-full items-center justify-center'>
        <div className='flex flex-col items-center w-full justify-center gap-5 p-2'>
          <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
            <label htmlFor="referenceNumber">Ref&nbsp;No</label>
            <input type="text" name='referenceNumber' className='rounded-md p-2 w-full' onChange={handleChange} value={formData.referenceNumber || ''} disabled={!isEditing} />
          </div>

          <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
            <label htmlFor="section">Section</label>
            <input type="text" name='section' className='rounded-md p-2 w-full' onChange={handleChange} value={formData.section || ''} disabled={!isEditing} />
          </div>

          <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
            <label htmlFor="department">Department</label>
            <input type="text" name='department' className='rounded-md p-2 w-full' onChange={handleChange} value={formData.department || ''} disabled={!isEditing} />
          </div>

          <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
            <label htmlFor="location">Location</label>
            <input type="text" name='location' className='rounded-md p-2 w-full' onChange={handleChange} value={formData.location || ''} disabled={!isEditing} />
          </div>

          <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
            <label htmlFor="date">Date</label>
            <input type="text" name='date' className='rounded-md p-2 w-full' onChange={handleChange} value={formData.date?.split('T')[0] || ''} disabled={!isEditing} />
          </div>

          <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
            <label htmlFor="subject">Subject</label>
            <input type="text" name='subject' className='rounded-md p-2 w-full' onChange={handleChange} value={formData.subject || ''} disabled={!isEditing} />
          </div>

          <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
            <label htmlFor="perspective">Perspective</label>
            <input type="text" name='perspective' className='rounded-md p-2 w-full' onChange={handleChange} value={formData.perspective || ''} disabled={!isEditing} />
          </div>

          <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
            <label htmlFor="proposal">Proposal</label>
            <input type="text" name='proposal' className='rounded-md p-2 w-full' onChange={handleChange} value={formData.proposal || ''} disabled={!isEditing} />
          </div>

          <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
            <label htmlFor="conclusion">Conclusion</label>
            <input type="text" name='conclusion' className='rounded-md p-2 w-full' onChange={handleChange} value={formData.conclusion || ''} disabled={!isEditing} />
          </div>

          <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
            <label htmlFor="confidential">Confidential</label>
            <input type="text" name='confidential' className='rounded-md p-2 w-full' onChange={handleChange} value={formData.confidential || ''} disabled={!isEditing} />
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
      </div>
    </div>
  );
};

export default SAD;
