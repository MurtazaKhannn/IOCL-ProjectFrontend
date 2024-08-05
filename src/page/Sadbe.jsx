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
        const res = await fetch(`/api/forms/Budgetary%20Estimate/${draftId}`, {
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
      const url = `/api/forms/editbe/${draftId}`;
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


  // const calculateAverages = () => {
  //   const sum = tableRows.reduce(
  //     (acc, row) => {
  //       acc.totalAmount += parseFloat(row.totalAmount || 0);
  //       return acc;
  //     },
  //     { totalAmount: 0 }
  //   );

  //   const count = tableRows.length;
  //   return {
  //     avgTotalAmount: count > 0 ? (sum.totalAmount / count).toFixed(2) : "0.00",
  //   };
  // };

  // const averages = calculateAverages();

  const addTableRow = () => {
    const newRow = {
      id: formData.tableRows.length + 1,
      productCategory: "",
      unitPrice: "",
      gst: "",
      total: "",
      quantity: "",
      totalAmount: "",
      remarks: "",
      averageTotalAmount: "",
    };
    setFormData({
      ...formData ,
      tableRows: [...formData.tableRows, newRow],
    });
  };

  const deleteTableRow = (index) => {
    if (formData.tableRows.length === 1) {
      return;
    } else {
      const updatedRows = [...formData.tableRows];
      updatedRows.splice(index, 1);
      updatedRows.forEach((row, i) => (row.id = i + 1)); 
      setFormData({...formData , tableRows: updatedRows})
    }
  };



  const handleTableChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...formData.tableRows];
    updatedRows[index][name] = value;
  
    if (name === "unitPrice" || name === "gst" || name === "quantity") {
      const unitPriceNum = parseFloat(updatedRows[index].unitPrice) || 0;
      const quantityNum = parseFloat(updatedRows[index].quantity) || 0;
  
      // Calculate percentage18 as unitPrice * 0.18
      const percentage18 = (unitPriceNum * 0.18).toFixed(2);
      updatedRows[index].percentage18 = percentage18;
  
      // Calculate total as unitPrice + percentage18
      const total = unitPriceNum + parseFloat(percentage18);
      updatedRows[index].total = total.toFixed(2);
  
      // Calculate totalAmount as total * quantity
      const totalAmount = total * quantityNum;
      updatedRows[index].totalAmount = totalAmount.toFixed(2);
    }
  
    setFormData({
      ...formData,
      tableRows: updatedRows,
    });
  };


  const calculateAverage = () => {
    const total = formData.tableRows.reduce((acc, row) => acc + (parseFloat(row.totalAmount) || 0), 0);
    return total / formData.tableRows.length || 0;
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
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        backgroundColor: null
      });
  
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = 297; // A4 height in mm
      let position = 0;
      let remainingHeight = imgHeight;
  
      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;
  
      // Add subsequent pages if needed
      while (remainingHeight > 0) {
        pdf.addPage();
        position = remainingHeight;
        pdf.addImage(imgData, "PNG", 0, -position, imgWidth, imgHeight);
        remainingHeight -= pageHeight;
      }
  
      pdf.save("budgetary_estimate.pdf");
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
          className="flex flex-col items-center max-w-[1394px] min-h-[900px] rounded-md justify-center gap-5 p-2 bg-white border"
        >
          <h1 className="text-4xl font-semibold">Budgetary Estimate</h1>

          <img src={IOL} className="w-64" alt="" />

          <div className="flex w-5/6 items-center justify-center gap-3 text-xl">
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

          <div className="flex w-5/6 items-center justify-center gap-3 text-xl">
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

          <div className="flex w-5/6 items-center justify-center gap-3 text-xl">
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

          <div className="flex w-5/6 items-center justify-center gap-3 text-xl">
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

          <div className="flex w-5/6 items-center justify-center gap-3 text-xl">
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

          <div className="flex w-5/6 items-center justify-center gap-3 text-xl">
            <label htmlFor="subject">Subject</label>
            <textarea
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={!isEditing}
              className="rounded-md p-2 w-full"
            />
          </div>

          <div className="flex w-5/6 flex-col gap-4">
                <label className='text-xl' htmlFor="background">Background:</label>
                <textarea
                  className="rounded-md p-2 w-full"
                  id="background"
                  name="background"
                  value={formData.background}
                  onChange={handleChange}
                  disabled={!isEditing}
                ></textarea>
              </div>

              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">S.No</th>
                    <th className="border border-gray-300 p-2">Product Category</th>
                    <th className="border border-gray-300 p-2">Unit Price</th>
                    <th className="border border-gray-300 p-2">GST (%)</th>
                    <th className="border border-gray-300 p-2">Total</th>
                    <th className="border border-gray-300 p-2">Quantity</th>
                    <th className="border border-gray-300 p-2">Total Amount</th>
                    <th className="border border-gray-300 p-2">Remarks</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.tableRows.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{row.id}</td>
                      <td className="border border-gray-300 p-2">
                        <input
                          className="w-full"
                          type="text"
                          name="productCategory"
                          value={row.productCategory}
                          onChange={(e) => handleTableChange(index, e)}
                          disabled={!isEditing}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          className="w-full"
                          type="number"
                          name="unitPrice"
                          value={row.unitPrice}
                          onChange={(e) => handleTableChange(index, e)}
                          disabled={!isEditing}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <div>
                        <input
                          className="w-28"
                          type="number"
                          name="gst"
                          value={row.percentage18}
                          onChange={(e) => handleTableChange(index, e)}
                          disabled={!isEditing}
                        />
                        </div>
                      </td>
                      <td className="border border-gray-300 p-2">
                      <div>
                        <input
                          className="w-28"
                          type="number"
                          name="total"
                          value={row.total}
                          onChange={(e) => handleTableChange(index, e)}
                          disabled={!isEditing}
                        />
                        </div>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          className="w-full"
                          type="number"
                          name="quantity"
                          value={row.quantity}
                          onChange={(e) => handleTableChange(index, e)}
                          disabled={!isEditing}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        {row.totalAmount}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          className="w-full"
                          type="text"
                          name="remarks"
                          value={row.remarks}
                          onChange={(e) => handleTableChange(index, e)}
                          disabled={!isEditing}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <button
                          type="button"
                          className="bg-red-500 text-white p-1 rounded"
                          onClick={() => deleteTableRow(index)}
                          disabled={!isEditing}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="6" className="border border-gray-300 p-2 text-right font-bold">
                      Average Total Amount
                    </td>
                    <td className="border border-gray-300 p-2">
                    {calculateAverage().toFixed(2)}
                    
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                  type="button"
                  className="bg-green-500 w-32 text-white p-2 rounded"
                  onClick={addTableRow}
                  disabled={!isEditing}
                >
                  Add Row
              </button>

          <div className="flex w-5/6 items-center justify-center gap-3 text-xl">
            <label htmlFor="proposal">Proposal</label>
            <textarea
              name="proposal"
              value={formData.proposal}
              onChange={handleChange}
              disabled={!isEditing}
              className="rounded-md p-2 w-full"
            />
          </div>

          <div className="flex w-5/6 items-center justify-center gap-3 text-xl">
            <label htmlFor="conclusion">Conclusion</label>
            <textarea
              name="conclusion"
              value={formData.conclusion}
              onChange={handleChange}
              disabled={!isEditing}
              className="rounded-md p-2 w-full"
            />
          </div>

          <div className="flex w-5/6 items-center justify-center gap-3 text-xl">
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
