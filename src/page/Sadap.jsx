import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import IOL from "../assets/logo.webp";
import { Document, ImageRun, Packer, Paragraph } from "docx";

const SAD = () => {
  // const apiUrl = process.env.REACT_APP_API_URL;

  const { draftId } = useParams();
  const [draft, setDraft] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const url = `/api/forms/Administrative%20Page/${draftId}`;
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
      const url = `/api/forms/editap/${draftId}`;
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
            new Paragraph({ text: `Section: ${draft.section}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Department: ${draft.department}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Location: ${draft.location}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Date: ${draft.date}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Subject: ${draft.subject}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Background: ${draft.background}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Proposal: ${draft.proposal}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Budget & Financial Implication: ${draft.budgetAndFinancialImplication}`, spacing: { after: 200 } }),
            new Paragraph({ text: `DOA Applicable: ${draft.doaApplicable}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Effective Authority: ${draft.effectiveAuthority}`, spacing: { after: 200 } }),
            new Paragraph({ text: `Conclusion: ${draft.conclusion}`, spacing: { after: 200 } }),
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
          className="flex flex-col items-center w-[794px] max-w-[1194px] min-h-[1123px] justify-center gap-5 p-2 bg-white border"
        >
          <h1 className="text-4xl font-semibold">Administrative Page</h1>

          <img src={IOL} className="w-32" alt="" />

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


          {/* <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">S. No</th>
                    <th className="border border-gray-300 px-4 py-2">Component</th>
                    <th className="border border-gray-300 px-4 py-2">Technical Specification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                    <td className="border border-gray-300 px-4 py-2">Processor</td>
                    <td className="border border-gray-300 px-4 py-2">Latest 12th Gen Intel i7 Processor / AMD RYZEN 7 or higher configuration processor (Minimum Base frequency 2.1 GHz or Higher, 25 MB Cache or Higher, 8 Cores or Higher, 16 Threads or higher, 65W TDP or lower, 64 Bit X86 Processor or higher). Processor should have been launched in Q1 2022 or after.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">2</td>
                    <td className="border border-gray-300 px-4 py-2">Chipset</td>
                    <td className="border border-gray-300 px-4 py-2">Intel Q670 or higher / AMD PRO 500 series or higher.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">3</td>
                    <td className="border border-gray-300 px-4 py-2">Motherboard</td>
                    <td className="border border-gray-300 px-4 py-2">Original OEM motherboard as manufactured /Certified by processor manufacturer/ OEM logo of the PC manufacturer should be embossed in the motherboard (Sticker not allowed).</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">4</td>
                    <td className="border border-gray-300 px-4 py-2">Memory</td>
                    <td className="border border-gray-300 px-4 py-2">Minimum 1X32 GB DDR4 with support for expansion up to 64 GB or higher. Minimum 1 slot must be free for future expansion.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">5</td>
                    <td className="border border-gray-300 px-4 py-2">RAM Type</td>
                    <td className="border border-gray-300 px-4 py-2">DDR4 with 2933 MHz or higher.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">6</td>
                    <td className="border border-gray-300 px-4 py-2">Expansion Slots</td>
                    <td className="border border-gray-300 px-4 py-2">2 slots or higher</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">7</td>
                    <td className="border border-gray-300 px-4 py-2">SSD Capacity</td>
                    <td className="border border-gray-300 px-4 py-2">M.2 1TB PCIe NVMe SSD</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">8</td>
                    <td className="border border-gray-300 px-4 py-2">Storage</td>
                    <td className="border border-gray-300 px-4 py-2">M.2 PCIe 1TB NVMe SSD or higher</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">9</td>
                    <td className="border border-gray-300 px-4 py-2">Power Supply</td>
                    <td className="border border-gray-300 px-4 py-2">Should be capable to support fully configured system and should be fully energy-efficient Power Supply (BEE Certified) 80 Plus Power Supply 92% efficient or better. Should be of same make as that of PC</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">10</td>
                    <td className="border border-gray-300 px-4 py-2">Ethernet</td>
                    <td className="border border-gray-300 px-4 py-2">1 Gbps</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">11</td>
                    <td className="border border-gray-300 px-4 py-2">USB Ports</td>
                    <td className="border border-gray-300 px-4 py-2">4xUSB 3.0, 2xUSB 2.0</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">12</td>
                    <td className="border border-gray-300 px-4 py-2">Keyboard</td>
                    <td className="border border-gray-300 px-4 py-2">OEM standard Keyboard with full size</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">13</td>
                    <td className="border border-gray-300 px-4 py-2">Mouse</td>
                    <td className="border border-gray-300 px-4 py-2">OEM standard Mouse</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">14</td>
                    <td className="border border-gray-300 px-4 py-2">Monitor</td>
                    <td className="border border-gray-300 px-4 py-2">24” LED Backlit LCD Monitor with height adjustment, LED Backlit display with minimum resolution of 1920x1080 or higher</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">15</td>
                    <td className="border border-gray-300 px-4 py-2">Operating System</td>
                    <td className="border border-gray-300 px-4 py-2">Windows 11 Professional 64-bit</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">16</td>
                    <td className="border border-gray-300 px-4 py-2">Power Management</td>
                    <td className="border border-gray-300 px-4 py-2">SMPS surge protection, Voltage regulation</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">17</td>
                    <td className="border border-gray-300 px-4 py-2">Energy Certification</td>
                    <td className="border border-gray-300 px-4 py-2">Energy Star certified</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">18</td>
                    <td className="border border-gray-300 px-4 py-2">Product Certification</td>
                    <td className="border border-gray-300 px-4 py-2">RoHS, EPEAT Gold</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">19</td>
                    <td className="border border-gray-300 px-4 py-2">Security</td>
                    <td className="border border-gray-300 px-4 py-2">TPM 2.0 Security Chip</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">20</td>
                    <td className="border border-gray-300 px-4 py-2">Warranty</td>
                    <td className="border border-gray-300 px-4 py-2">5-year onsite comprehensive warranty</td>
                  </tr>
                </tbody>
              </table>
            </div> */}



          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="proposal">Proposal</label>
            <input
              name="proposal"
              value={formData.proposal}
              onChange={handleChange}
              disabled={!isEditing}
              className="rounded-md p-2 w-full"
            />
          </div>

          <div className="flex w-2/3 items-center justify-center gap-3 text-xl">
            <label htmlFor="budgetAndFinancialImplication">Budget & Financial Implication</label>
            <input
              name="budgetAndFinancialImplication"
              value={formData.budgetAndFinancialImplication}
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
            <label htmlFor="effectiveAuthority">Effective Authority</label>
            <input
              name="effectiveAuthority"
              value={formData.effectiveAuthority}
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
