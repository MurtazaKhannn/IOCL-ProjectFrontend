import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import IOL from "../assets/logo.webp";
import { Packer, Document, Paragraph, Table, TableRow, TableCell, WidthType, TextRun, ImageRun } from "docx";

const SAD = () => {
  const apiUrl = process.env.API_URL;

  const { draftId } = useParams();
  const [draft, setDraft] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const PercentageDisplay = ({ number, percentage }) => {
    const calculatePercentage = () => {
      return (number * percentage) / 100;
    };

    return <p>{calculatePercentage()}</p>;
  };

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const url = `${apiUrl}/api/forms/TCC%20Intermediate/${draftId}`;
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
    // toggleEditing();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(draft); // Reset form data
  };

  const handleSave = async () => {
    try {
      const url = `${apiUrl}/api/forms/edittcci/${draftId}`;
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
  
    const replaceTextareasWithText = (container) => {
      const textareas = container.querySelectorAll("textarea");
      textareas.forEach((textarea) => {
        const div = document.createElement("div");
        div.style.whiteSpace = "pre-wrap";
        div.style.border = textarea.style.border;
        div.style.padding = textarea.style.padding;
        div.style.margin = textarea.style.margin;
        div.style.width = textarea.offsetWidth + "px";
        div.style.height = textarea.offsetHeight + "px";
        div.style.fontSize = textarea.style.fontSize;
        div.style.fontFamily = textarea.style.fontFamily;
        div.textContent = textarea.value;
        div.setAttribute("data-replace", "true");
        div.setAttribute("data-name", textarea.name);
        div.setAttribute("data-is-editing", JSON.stringify(isEditing));
        div.setAttribute("data-classname", textarea.className);
        div.setAttribute("data-id", textarea.id);
  
        // Debugging information
        console.log('Replacing textarea with div:', {
          name: textarea.name,
          value: textarea.value,
          isEditing: isEditing,
          className: textarea.className,
          id: textarea.id,
        });
  
        textarea.parentNode.replaceChild(div, textarea);
      });
    };
  
    const revertDivsToTextareas = (container) => {
      const divs = container.querySelectorAll('div[data-replace="true"]');
      divs.forEach((div) => {
        const textarea = document.createElement("textarea");
  
        // Copy styles from div to textarea
        textarea.style.whiteSpace = "pre-wrap";
        textarea.style.border = div.style.border;
        textarea.style.padding = div.style.padding;
        textarea.style.margin = div.style.margin;
        textarea.style.width = div.style.width;
        textarea.style.height = div.style.height;
        textarea.style.fontSize = div.style.fontSize;
        textarea.style.fontFamily = div.style.fontFamily;
  
        // Copy attributes from div to textarea
        textarea.name = div.getAttribute("data-name");
        textarea.value = div.textContent;
        textarea.disabled = !JSON.parse(div.getAttribute("data-is-editing"));
        textarea.className = div.getAttribute("data-classname");
        textarea.id = div.getAttribute("data-id");
        textarea.onchange = handleChange; // Ensure this is correctly assigned
  
        // Add debugging information
        console.log('Reverting div to textarea:', {
          name: textarea.name,
          value: textarea.value,
          disabled: textarea.disabled,
          className: textarea.className,
          id: textarea.id,
          styles: {
            width: textarea.style.width,
            height: textarea.style.height,
            fontSize: textarea.style.fontSize,
            fontFamily: textarea.style.fontFamily,
          }
        });
  
        // Replace the div with the textarea
        div.parentNode.replaceChild(textarea, div);
      });
    };
  
    replaceTextareasWithText(input);
  
    try {
      const originalWidth = input.offsetWidth;
      input.style.width = originalWidth + "px";
  
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
  
      const imgWidth = originalWidth * 0.264583;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      const pdf = new jsPDF("p", "mm", [imgWidth, imgHeight]);
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("tcc_intermediate.pdf");
      navigate(0);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      revertDivsToTextareas(input);
      if (saveButton) saveButton.style.display = "block";
      if (dropbtn) dropbtn.style.display = "block";
      if (savebtn) savebtn.style.display = "block";
    }
  };
  
  
  



  const generateDOCX = async () => {
    const imageBuffer = await fetch(IOL).then((res) => res.arrayBuffer());

    const tableRows = [
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("1")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Brief background of the main project")] }),
                new TableCell({ children: [new Paragraph(`Vide note ref: ${draft.videref1 || ""} dated ${draft.date1 || ""}, approval is granted by ${draft.dgmi || ""}`)] }),
                new TableCell({ children: [new Paragraph(`Annexure 1`)] }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("1")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Approval for technical specifications")] }),
                new TableCell({ children: [new Paragraph(`vide ref: ${draft.videref2 || ""} dated ${draft.date2 || ""} is approved by ${draft.dgmi || ""}`)] }),
                new TableCell({ children: [new Paragraph(`Annexure 2`)] }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("1")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Estimate approval")] }),
                new TableCell({ children: [new Paragraph(`Vide note ref: ${draft.videref3 || ""} dated ${draft.date3 || ""}, estimate for Rs. ${draft.estimate || ""} including GST is approved by ${draft.dgmi2 || ""}`)] }),
                new TableCell({ children: [new Paragraph(`Annexure 3`)] }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("1")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Admin approval for procurement")] }),
                new TableCell({ children: [new Paragraph(`for ${draft.procurement || ""} at Rs. ${draft.amount || ""} is granted by ${draft.grantedBy || ""} vide note ref: ${draft.noteRef || ""} dated ${draft.noteDate || ""}`)] }),
                new TableCell({ children: [new Paragraph(`Annexure 4`)] }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("1")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Approval for PQ, Evaluation criteria")] }),
                new TableCell({ children: [new Paragraph(`vide note ref: ${draft.pqRef || ""} dated ${draft.pqDate || ""} duly approved by ${draft.pqApprovedBy || ""}`)] }),
                new TableCell({ children: [new Paragraph(`Annexure 5`)] }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("1")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("E-Tender")] }),
                new TableCell({ children: [new Paragraph(`published on GeM portal on ${draft.eTenderDate || ""}`)] }),
                new TableCell({ children: [new Paragraph(`Annexure 6`)] }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("2")] }),
                new TableCell({ children: [new Paragraph("B")] }),
                new TableCell({ children: [new Paragraph("Description of tendered work")] }),
                new TableCell({ children: [new Paragraph(`Procurement of ${draft.tenderedWork || ""} at ${draft.location || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("2")] }),
                new TableCell({ children: [new Paragraph("C")] }),
                new TableCell({ children: [new Paragraph("Tender No")] }),
                new TableCell({ children: [new Paragraph(`${draft.tenderNo || ""} dated ${draft.tenderDate || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("2")] }),
                new TableCell({ children: [new Paragraph("D")] }),
                new TableCell({ children: [new Paragraph("Estimated value of work")] }),
                new TableCell({ children: [new Paragraph(`Rs. ${draft.estimatedValue || ""} including GST`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("2")] }),
                new TableCell({ children: [new Paragraph("E")] }),
                new TableCell({ children: [new Paragraph("Approved by")] }),
                new TableCell({ children: [new Paragraph(`${draft.approvedBy || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("2")] }),
                new TableCell({ children: [new Paragraph("F")] }),
                new TableCell({ children: [new Paragraph("In case the estimate is more than Rs. 25 Lacs whether vetted by Finance")] }),
                new TableCell({ children: [new Paragraph(`${draft.financeVet || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("3")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Whether Capital / Revenue Item")] }),
                new TableCell({ children: [new Paragraph(`${draft.capitalRevenue || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("3")] }),
                new TableCell({ children: [new Paragraph("B")] }),
                new TableCell({ children: [new Paragraph("In case of Revenue expenditure give ref No:")] }),
                new TableCell({ children: [new Paragraph(`${draft.revenueRefNo || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("3")] }),
                new TableCell({ children: [new Paragraph("C")] }),
                new TableCell({ children: [new Paragraph("In case of Capital Item give IR No and Amount with Administrative Approval reference")] }),
                new TableCell({ children: [new Paragraph(`${draft.capitalIRNo || ""} and Amount ${draft.capitalAmount || ""} with Admin Approval ref: ${draft.capitalAdminApproval || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("4")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Cumulative commitments made prior to the current proposal against the approval given in item No: 3 above")] }),
                new TableCell({ children: [new Paragraph(`${draft.cumulativeCommitments || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("5")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Approval Reference for inviting Tender")] }),
                new TableCell({ children: [new Paragraph(`Admin approval for procurement of ${draft.procurement || ""} at ${draft.location || ""} is granted by ${draft.adminApprovalBy || ""} vide note ref: ${draft.adminApprovalNoteRef || ""} dated ${draft.adminApprovalNoteDate || ""}`)] }),
                new TableCell({ children: [new Paragraph(`Annexure 7`)] }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("6")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Corrigendum issued if any")] }),
                new TableCell({ children: [new Paragraph(`${draft.corrigendum || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("7")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("TCC members")] }),
                new TableCell({ children: [new Paragraph(`Following are the TCC members vide office order: ${draft.tccOrder || ""} dated ${draft.tccDate || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("8")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Mode of Tendering (ST/LT/PT)")] }),
                new TableCell({ children: [new Paragraph(`${draft.tenderMode || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("9")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Type of Tendering system (Single bid / Two Bid System)")] }),
                new TableCell({ children: [new Paragraph(`${draft.tenderingSystem || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("10")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Tenders Issued / No of parties to whom enquiry was sent")] }),
                new TableCell({ children: [new Paragraph(`${draft.tendersIssued || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("11")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Time allowed for submission of tenders from the date of opening of sale of tender documents")] }),
                new TableCell({ children: [new Paragraph(`${draft.timeAllowed || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("12")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Whether any Pre-bid meeting held")] }),
                new TableCell({ children: [new Paragraph(`${draft.preBidMeeting || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("13")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Due Date & Receipt of E-tenders")] }),
                new TableCell({ children: [new Paragraph(`${draft.dueDate || ""} ${draft.receipt || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("14")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Actual Date & Time of Opening of E-tenders")] }),
                new TableCell({ children: [new Paragraph(`${draft.openingDate || ""} ${draft.openingTime || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("15")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("No of Offers received up to the due date and time of receipt")] }),
                new TableCell({ children: [new Paragraph(`The technical bid of the subject tender was opened on ${draft.technicalBidOpenDate || ""}. On due date and time, the offers of the following parties were received: ${draft.offersReceived || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("16")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("No of Late Tenders")] }),
                new TableCell({ children: [new Paragraph(`${draft.lateTenders || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("17")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Pre-Qualification Criteria")] }),
                new TableCell({ children: [new Paragraph(`NON-MSE BIDDER: Bidder Turnover - Rs ${draft.nonMseTurnover || ""} (${draft.nonMsePercentage || ""}) MSE BIDDER: Bidder Turnover – Rs ${draft.mseTurnover || ""} (${draft.msePercentage || ""})`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("17")] }),
                new TableCell({ children: [new Paragraph("B")] }),
                new TableCell({ children: [new Paragraph("Similar Work")] }),
                new TableCell({ children: [new Paragraph(`NON MSE BIDDER: Three works – Rs ${draft.nonMseThreeWorks || ""} each Two works – Rs ${draft.nonMseTwoWorks || ""} each One work – Rs ${draft.nonMseOneWork || ""} each MSE BIDDER: Three works – Rs ${draft.mseThreeWorks || ""} each Two works – Rs ${draft.mseTwoWorks || ""} each One work – Rs ${draft.mseOneWork || ""} each`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("17")] }),
                new TableCell({ children: [new Paragraph("C")] }),
                new TableCell({ children: [new Paragraph("EMD")] }),
                new TableCell({ children: [new Paragraph(`${draft.emd || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("18")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Technical Evaluation of Bidders as per PQ Criteria and Other mandatory document criteria")] }),
                new TableCell({ children: [new Paragraph(`Technical clarifications were raised on GeM Portal dated ${draft.technicalClarifications || ""} All clarifications are raised to all the ${draft.vendors || ""} vendors.`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("19")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("No of Offers rejected technically")] }),
                new TableCell({ children: [new Paragraph(`${draft.offersRejectedTechnically || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("20")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("No of offer rejected on the grounds of Holiday listing and reasons thereof (in case of two bid)")] }),
                new TableCell({ children: [new Paragraph(`${draft.offersRejectedHoliday || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("21")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Reference of Technical bid TCC minutes")] }),
                new TableCell({ children: [new Paragraph(`${draft.tccMinutes || ""} ANNEXURE 1`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("22")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Reference of commercial bid TCC minutes")] }),
                new TableCell({ children: [new Paragraph(`${draft.tccMinutesCommercial || ""} ANNEXURE 2`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("23")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Evaluation of bids and recommended bidder")] }),
                new TableCell({ children: [new Paragraph(`Following are the recommended bidders: ${draft.recommendedBidders || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("24")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Approval of recommended bidders")] }),
                new TableCell({ children: [new Paragraph(`Approval for ${draft.recommendedBidders || ""} was granted by ${draft.approvedBy || ""} vide ref: ${draft.approvalRef || ""} dated ${draft.approvalDate || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("25")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("No of L1 or lowest bidder")] }),
                new TableCell({ children: [new Paragraph(`${draft.lowestBidder || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("26")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Approval of the final recommendation")] }),
                new TableCell({ children: [new Paragraph(`Final recommendation for ${draft.finalRecommendation || ""} was approved by ${draft.finalApprovalBy || ""} vide ref: ${draft.finalApprovalRef || ""} dated ${draft.finalApprovalDate || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("27")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Contracts awarded and orders placed")] }),
                new TableCell({ children: [new Paragraph(`${draft.contractsAwarded || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph("28")] }),
                new TableCell({ children: [new Paragraph("A")] }),
                new TableCell({ children: [new Paragraph("Invoice approval")] }),
                new TableCell({ children: [new Paragraph(`Invoices for the contract ${draft.contractNumber || ""} were approved on ${draft.invoiceApprovalDate || ""}`)] }),
                new TableCell({ children: [new Paragraph("")] }),  // Empty cell if no content
            ],
        }),
    ];

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Table({
                        rows: tableRows,
                        width: {
                            size: 100,
                            type: WidthType.PERCENTAGE,
                        },
                    }),
                    // Add other document content here if needed
                ],
            },
        ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "example.docx");
};
  

  return (
    <div className="w-full min-h-[88.9vh] gap-5 p-5 flex flex-col font-sans justify-center items-center">
      <div className="flex w-full min-h-full items-center justify-center">
        <div
          id="formContainer"
          className="flex flex-col items-center w-[794px] min-h-[800px] rounded-md justify-center gap-5 p-2 bg-white border"
        >
          <h1 className="text-4xl font-semibold">TCC Intermediate</h1>
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
              value={formData.date?.split("T")[0] || ""}
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
                    <input
                      name="videref1"
                      value={formData.videref1}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-b-2 focus:border-blue-500 outline-none"
                      type="text"
                    />{" "}
                    dated{" "}
                    <input
                      className="font-bold p-1"
                      name="date1"
                      value={formData.date1?.split("T")[0] || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="date"
                    />
                    , approval is granted by{" "}
                    <input
                      name="grantedBy1"
                      value={formData.grantedBy1}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-b-2 focus:border-blue-500 outline-none"
                      type="text"
                      placeholder=""
                    />{" "}
                    <p className="font-bold">
                      <input
                        name="annexure1"
                        value={formData.annexure1}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                        placeholder="Annexure"
                        type="text"
                      />
                    </p>
                    <br className="" />
                    Approval for technical specifications vide ref:{" "}
                    <input
                      name="videref2"
                      value={formData.videref2}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-b-2 focus:border-blue-500 outline-none"
                      type="text"
                    />{" "}
                    dated{" "}
                    <input
                      className=" p-1 mt-1"
                      type="date"
                      name="date2"
                      value={formData.date2?.split("T")[0] || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />{" "}
                    &nbsp; is approved by{" "}
                    <input
                      name="grantedBy2"
                      value={formData.grantedBy2}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="text"
                      className="border-b-2 focus:border-blue-500 outline-none"
                    />{" "}
                    <p className="font-bold">
                      <input
                        name="annexure2"
                        value={formData.annexure2}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                        placeholder="Annexure"
                        type="text"
                      />
                    </p>
                    <br className="mt-2" />
                    Vide note ref:{" "}
                    <input
                      name="videref3"
                      value={formData.videref3}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-b-2 focus:border-blue-500 outline-none"
                      type="text"
                    />{" "}
                    dated{" "}
                    <input
                      type="date"
                      name="date3"
                      value={formData.date3?.split("T")[0] || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />
                    , estimate for Rs.{" "}
                    <input
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="number"
                      className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                      placeholder="Amount"
                    />{" "}
                    including GST is approved by{" "}
                    <input
                      name="grantedBy3"
                      value={formData.grantedBy3}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="text"
                      className="border-b-2 focus:border-blue-500 outline-none"
                    />{" "}
                    <p className="font-bold">
                      <input
                        name="annexure3"
                        value={formData.annexure3}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                        placeholder="Annexure"
                        type="text"
                      />
                    </p>
                    <br className="mt-2" />
                    Admin approval for procurement of{" "}
                    <input
                      name="itemDetails1"
                      value={formData.itemDetails1}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                      type="text"
                    />{" "}
                    at{" "}
                    <input
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="text"
                      className="border-b-2 focus:border-blue-500 outline-none"
                    />{" "}
                    is granted by{" "}
                    <input
                      name="grantedBy4"
                      value={formData.grantedBy4}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="text"
                      className="border-b-2 focus:border-blue-500 outline-none"
                    />{" "}
                    vide note ref:{" "}
                    <input
                      className="border-b-2 focus:border-blue-500 outline-none"
                      name="videref4"
                      value={formData.videref4}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />{" "}
                    dated{" "}
                    <input
                      className="rounded-md p-1"
                      name="date4"
                      value={formData.date4?.split("T")[0] || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="date"
                    />{" "}
                    <p className="font-bold">
                      <input
                        name="annexure4"
                        value={formData.annexure4}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="border-2 rounded-md p-1 focus:border-blue-500 outline-none mt-2"
                        placeholder="Annexure"
                        type="text"
                      />
                    </p>
                    <br className="mt-2" />
                    Approval for PQ, Evaluation criteria, Special Terms and
                    Conditions, Tender Document, Draft Bid Document is provided
                    vide note ref:{" "}
                    <input
                      name="videref5"
                      value={formData.videref5}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-b-2 focus:border-blue-500 outline-none"
                      id=""
                    />{" "}
                    dated{" "}
                    <input
                      name="date5"
                      value={formData.date5?.split("T")[0] || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="date"
                    />{" "}
                    duly approved by{" "}
                    <input
                      name="grantedBy5"
                      value={formData.grantedBy5}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="text"
                      className="border-b-2 focus:border-blue-500 outline-none"
                    />{" "}
                    <p className="font-bold">
                      <input
                        name="annexure5"
                        value={formData.annexure5}
                        onChange={handleChange}
                        disabled={!isEditing}
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
                      disabled={!isEditing}
                      type="text"
                      className="border-b-2 focus:border-blue-500 outline-none"
                    />{" "}
                    dated{" "}
                    <input
                      name="date6"
                      value={formData.date6?.split("T")[0] || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="date"
                    />{" "}
                    was published on GeM portal on{" "}
                    <input
                      type="date"
                      name="date7"
                      value={formData.date7?.split("T")[0] || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />{" "}
                    <p className="font-bold">
                      <input
                        name="annexure6"
                        value={formData.annexure6}
                        onChange={handleChange}
                        disabled={!isEditing}
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
                    <input
                      name="itemDetails2"
                      value={formData.itemDetails2}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                      type="text"
                    />{" "}
                    at{" "}
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                      value={formData.refNo2}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="text"
                      className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    />{" "}
                    dated{" "}
                    <input
                      name="date8"
                      value={formData.date8?.split("T")[0] || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                      disabled={!isEditing}
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
                      value={formData.grantedBy6}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                    In case the estimate is more than Rs. 25 Lacs whether vetted
                    by Finance
                  </td>
                  <td className="px-6 py-4 border-r border-gray-300">
                    <input
                      name="twoB"
                      value={formData.twoB}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                      disabled={!isEditing}
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
                      disabled={!isEditing}
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
                      disabled={!isEditing}
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
                    Cumulative commitments made prior to the current proposal
                    against the approval given in item No: 3 above
                  </td>
                  <td className="px-6 py-4 border-r border-gray-300">
                    <input
                      name="four"
                      value={formData.four}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                    <input
                      name="itemDetails3"
                      value={formData.itemDetails3}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="text"
                      className="border-b-2 focus:border-blue-500 outline-none"
                    />{" "}
                    at{" "}
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="text"
                      className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    />{" "}
                    is granted by{" "}
                    <input
                      name="grantedBy7"
                      value={formData.grantedBy7}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="text"
                      className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    />{" "}
                    vide note ref:{" "}
                    <input
                      name="videref6"
                      value={formData.videref6}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                      id=""
                    />{" "}
                    dated{" "}
                    <input
                      type="date"
                      name="date9"
                      value={formData.date9?.split("T")[0] || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                        disabled={!isEditing}
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
                      value={formData.corrigendum}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                    <input
                      name="videref7"
                      value={formData.videref7}
                      onChange={handleChange}
                      id=""
                      disabled={!isEditing}
                      className="border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    />{" "}
                    dated{" "}
                    <input
                      className=""
                      name="date9"
                      value={formData.date9?.split("T")[0] || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="date"
                    />{" "}
                    <br />{" "}
                    <p className="font-bold">
                      <input
                        name="annexure8"
                        value={formData.annexure8}
                        onChange={handleChange}
                        disabled={!isEditing}
                        type="text"
                        className="border-2 rounded-md p-1 mt-2"
                        placeholder="ANNEXURE"
                      />
                    </p>{" "}
                    <br />
                    <br />
                    <input
                      className="border-b-2 focus:border-blue-500 outline-none"
                      placeholder="Name of TCC Members"
                      name="tccmembers"
                      value={formData.tccmembers}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />
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
                      value={formData.modeoftendering}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                      value={formData.typeoftendering}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="text"
                      className="border-b-2 focus:border-blue-500 outline-none"
                    />{" "}
                    <p>
                      <input
                        name="annexure9"
                        value={formData.annexure9}
                        onChange={handleChange}
                        disabled={!isEditing}
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
                      value={formData.tenderissued}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                    opening of sale of tender documents
                  </td>
                  <td className="px-6 py-4 border-r border-gray-300">
                    <input
                      name="timeallowed"
                      value={formData.timeallowed}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="text"
                      className="border-b-2 focus:border-blue-500 outline-none mt-2"
                      placeholder=""
                    />{" "}
                    <p>
                      <input
                        name="annexure10"
                        value={formData.annexure10}
                        onChange={handleChange}
                        disabled={!isEditing}
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
                      value={formData.prebidmeetings}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                      name="date10"
                      value={formData.date10?.split(".")[0] || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />{" "}
                    <p>
                      <input
                        name="annexure11"
                        value={formData.annexure11}
                        onChange={handleChange}
                        disabled={!isEditing}
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
                      name="date11"
                      value={formData.date11?.split(".")[0] || ""}
                      disabled={!isEditing}
                      onChange={handleChange}
                      id=""
                    />{" "}
                    <p>
                      <input
                        name="annexure12"
                        value={formData.annexure12}
                        onChange={handleChange}
                        disabled={!isEditing}
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
                    No of Offers received up to the due date and time of receipt
                  </td>
                  <td className="px-6 py-4 border-r border-gray-300">
                    The technical bid of the subject tender was opened on{" "}
                    <input
                      type="date"
                      name="date12"
                      value={formData.date12?.split("T")[0] || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />
                    . On due date and time, the offers of the following parties
                    were received:
                    <input
                      className="border-b-2 focus:border-blue-500 outline-none"
                      name="noofoffersreceived"
                      value={formData.noofoffersreceived}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />
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
                      value={formData.nooflatetenders}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                      value={formData.annexure13}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                    {formData.financialYears &&
                      formData.financialYears.map((year, index) => (
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
                        number={formData.amount}
                        percentage={60}
                      />
                      <span> (60%)</span>
                    </div>
                    <div style={{ marginTop: "1rem" }}>MSE BIDDER:</div>
                    <div>
                      <span>1. Bidder Turnover – Rs </span>
                      <PercentageDisplay
                        number={formData.amount}
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
                    <PercentageDisplay
                      number={formData.amount}
                      percentage={25.5}
                    />{" "}
                    each
                    <br />
                    2. Two works – Rs{" "}
                    <PercentageDisplay
                      number={formData.amount}
                      percentage={34}
                    />{" "}
                    each
                    <br />
                    3. One work – Rs{" "}
                    <PercentageDisplay
                      number={formData.amount}
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
                    <input
                      className="border-b-2 focus:border-blue-500 outline-none"
                      name="emd"
                      value={formData.emd}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />
                  </td>
                </tr>

                <tr className="border-b border-gray-300">
                  <td className="px-6 py-4 border-r border-l border-gray-300">
                    18
                  </td>
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
                      value={formData.date13?.split("T")[0] || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />
                    ,{" "}
                    <input
                      type="date"
                      name="date14"
                      value={formData.date14?.split("T")[0] || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />{" "}
                    and{" "}
                    <input
                      type="date"
                      name="date15"
                      value={formData.date15?.split("T")[0] || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />{" "}
                    <br /> (&nbsp;{" "}
                    <input
                      name="annexure14"
                      value={formData.annexure14}
                      onChange={handleChange}
                      disabled={!isEditing}
                      type="text"
                      placeholder="ANNEXURE"
                      className="font-bold p-1 rounded-md border-2 mt-2"
                    />{" "}
                    ,{" "}
                    <input
                      name="annexure15"
                      value={formData.annexure15}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="ANNEXURE"
                      className="font-bold p-1 rounded-md border-2 mt-2"
                      type="text"
                    />{" "}
                    and{" "}
                    <input
                      name="annexure16"
                      value={formData.annexure16}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                      disabled={!isEditing}
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
                      value={formData.noofoffersrejectedtechnically}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="number"
                      className="border-b-2 focus:border-blue-500 outline-none mb-5"
                      type="text"
                    />
                    <br />
                    <input
                      placeholder="vendorname with reason "
                      className="border-b-2 w-72 focus:border-blue-500 outline-none mb-2"
                      name="rejectedvendorsnames"
                      value={formData.rejectedvendorsnames}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />
                    <br />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="px-6 py-4 border-r border-l border-gray-300">
                    20
                  </td>
                  <td className="px-6 py-4 border-r border-gray-300"></td>
                  <td className="px-6 py-4 font-bold border-r border-gray-300">
                    No of offer rejected on the grounds of Holiday listing and
                    reasons thereof (in case of two bid)
                  </td>
                  <td className="px-6 py-4 border-r  border-gray-300">
                    <input
                      name="noofoffersrejectedonthegrounds"
                      value={formData.noofoffersrejectedonthegrounds}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-b-2 focus:border-blue-500 outline-none mb-2"
                      type="text"
                    />
                    <br />
                    <br />
                    <input
                      className="border-b-2 focus:border-blue-500 outline-none mb-2"
                      name="noofoffersrejectedonthegroundsreason"
                      value={formData.noofoffersrejectedonthegroundsreason}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />
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
                    <input
                      className="border-b-2 focus:border-blue-500 outline-none mb-2"
                      name="referenceoftechnicalbidtcc"
                      value={formData.referenceoftechnicalbidtcc}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />
                    <input
                      name="annexure17"
                      value={formData.annexure17}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                    Whether any pre-Price bid meeting held? If yes on which date
                    & reference of Pre-bid minutes
                  </td>
                  <td className="px-6 py-4 border-r border-gray-300">
                    <textarea
                      className="border-b-2 focus:border-blue-500 outline-none mb-2"
                      name="anyprepricebidmeetingheld"
                      value={formData.anyprepricebidmeetingheld}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />
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
                      value={formData.detailsofdeviationacceptedbytcc}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="px-6 py-4 border-r border-l border-gray-300">
                    24
                  </td>
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
                      disabled={!isEditing}
                      id=""
                    />
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
                      value={formData.anyrevisedpricebid}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="px-6 py-4 border-r border-l border-gray-300">
                    26
                  </td>
                  <td className="px-6 py-4 border-r border-gray-300"></td>
                  <td className="px-6 py-4 font-bold border-r border-gray-300">
                    Parties who qualify for opening of Price Bids with reference
                    to TCC recommendations
                  </td>
                  <td className="px-6 py-4 border-r border-l border-gray-300">
                    TCC recommends opening of Price bids of following{" "}
                    <textarea
                      className="border-b-2 w-36 mr-2 focus:border-blue-500 outline-none mb-2"
                      type="text"
                      name="noofpartieswhoqualifyforopeningofpricebids"
                      value={
                        formData.noofpartieswhoqualifyforopeningofpricebids
                      }
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    bidders who have been qualified as per PQ criteria and
                    submission of relevant other mandatory document criteria.
                    <br />
                    <textarea
                      className="border-b-2 focus:border-blue-500 outline-none mb-2"
                      name="partieswhoqualifyforopeningofpricebids"
                      value={formData.partieswhoqualifyforopeningofpricebids}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />
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
                      value={formData.validityofoffers}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="px-6 py-4 border-r border-l border-gray-300">
                    28
                  </td>
                  <td className="px-6 py-4 border-r border-gray-300"></td>
                  <td className="px-6 py-4 font-bold border-r border-gray-300">
                    Weather CVC guidelines have been complied with
                  </td>
                  <td className="px-6 py-4 border-r border-gray-300">
                    <textarea
                      name="weathercvcguidelineshavebeencompiledwith"
                      value={formData.weathercvcguidelineshavebeencompiledwith}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                    Any other relevant information
                  </td>
                  <td className="px-6 py-4 border-r border-gray-300">
                    <textarea
                      className="border-b-2 focus:border-blue-500 outline-none mb-2"
                      name="anyotherrelevantinfo"
                      value={formData.anyotherrelevantinfo}
                      onChange={handleChange}
                      disabled={!isEditing}
                      id=""
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="px-6 py-4 border-r border-b border-l border-gray-300">
                    30
                  </td>
                  <td className="px-6 py-4 border-r border-b border-gray-300"></td>
                  <td className="px-6 py-4 font-bold border-r border-b border-gray-300">
                    DOA/Approving Authority
                  </td>
                  <td className="px-6 py-4 border-r border-b border-gray-300">
                    <textarea
                      name="doaapprovingauthorityone"
                      value={formData.doaapprovingauthorityone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-b-2 focus:border-blue-500 outline-none mt-4"
                      type="text"
                    />{" "}
                    is requested to accord approval for opening of Price Bid of
                    the{" "}
                    <textarea
                      name="doaapprovingauthoritytwo"
                      value={formData.doaapprovingauthoritytwo}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-b-2 w-40 focus:border-blue-500 outline-none mt-4"
                      type="text"
                    />{" "}
                    technically qualified bidder as recommended above.
                    <br />
                    Approval sought under{" "}
                    <textarea
                      name="doaapprovingauthoritythree"
                      value={formData.doaapprovingauthoritythree}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-b-2 focus:border-blue-500 outline-none mb-2"
                      type="text"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
