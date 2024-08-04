import React, { useEffect, useState } from "react";
import IOL from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";

const AdministrativePage = () => {
  const predefinedValues = {
    section: "Information System",
    department: "Information Technology",
    location: "Uttar Pradesh",
    date: "",
    subject: "",
    background: "",
    proposal: "",
    budgetAndFinancialImplication: "",
    doaApplicable: "No",
    effectiveAuthority: "",
    conclusion: "",
    confidential: "Yes",
  };

  const [inputs, setInputs] = useState(predefinedValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedInputs = JSON.parse(localStorage.getItem("ap-form"));
    if (storedInputs) {
      setInputs(storedInputs);
    }
  }, [setInputs]);

  const handleChange = (e) => {
    if (e.target.name === "date") {
      const dateValue = e.target.value.split("T")[0];
      setInputs({ ...inputs, [e.target.name]: dateValue });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const newInputs = { ...inputs, [e.target.name]: e.target.value };
    setInputs(newInputs);
    localStorage.setItem("ap-form", JSON.stringify(newInputs));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/forms/administrativepage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();

      console.log("Response data:", data);

      if (data.error) {
        alert("Error: " + data.error);
        return;
      }

      alert("Form saved successfully!");

      setInputs((prevInputs) => ({
        ...prevInputs,
        referenceNumber: data.referenceNumber,
      }));

      setInputs(predefinedValues);
      localStorage.removeItem("ap-form");
    } catch (error) {
      alert("Error: " + error);
      setLoading(false);
      console.log("Error:", error);
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
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 font-sans">
      <div className="w-full max-w-7xl min-h-[80vh] bg-white flex flex-col items-center justify-center p-5">
        <div className="w-full flex flex-col gap-5 items-center justify-center">
          <img src={IOL} alt="Logo" className="w-3/4 sm:w-1/2 lg:w-1/4" />
          <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl">
            ADMINISTRATIVE APPROVAL
          </h1>
          <form
            id="formContainer"
            className="flex flex-col gap-5 w-full max-w-3xl"
            onSubmit={handleSubmit}
          >
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
              <textarea
                className="bg-zinc-100 rounded-md p-2 w-full"
                id="subject"
                name="subject"
                value={inputs.subject}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="background">Background:</label>
              <textarea
                id="background"
                className="bg-zinc-100 rounded-md p-2 w-full"
                name="background"
                value={inputs.background}
                onChange={handleChange}
              />
            </div>

            {/* <div className="overflow-x-auto">
              <div className="mb-4 font-bold">
                TECHNICALSPECIFICATIONS: Technical specification as approved by
                MKHO is asfollows:
              </div>
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">S. No</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Component
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Technical Specification
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Processor
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Latest 12th Gen Intel i7 Processor / AMD RYZEN 7 or higher
                      configuration processor (Minimum Base frequency 2.1 GHz or
                      Higher, 25 MB Cache or Higher, 8 Cores or Higher, 16
                      Threads or higher, 65W TDP or lower, 64 Bit X86 Processor
                      or higher). Processor should have been launched in Q1 2022
                      or after.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">2</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Chipset
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Intel Q670 or higher / AMD PRO 500 series or higher.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">3</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Motherboard
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Original OEM motherboard as manufactured /Certified by
                      processor manufacturer/ OEM logo of the PC manufacturer
                      should be embossed in the motherboard (Sticker not
                      allowed).
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">4</td>
                    <td className="border border-gray-300 px-4 py-2">Memory</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Minimum 1X32 GB DDR4 with support for expansion up to 64
                      GB or higher. Minimum 1 slot must be free for future
                      expansion.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">5</td>
                    <td className="border border-gray-300 px-4 py-2">
                      RAM Type
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      DDR4 with 2933 MHz or higher.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">6</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Expansion Slots
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      2 slots or higher
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">7</td>
                    <td className="border border-gray-300 px-4 py-2">
                      SSD Capacity
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      M.2 1TB PCIe NVMe SSD
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">8</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Storage
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      M.2 PCIe 1TB NVMe SSD or higher
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">9</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Power Supply
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Should be capable to support fully configured system and
                      should be fully energy-efficient Power Supply (BEE
                      Certified) 80 Plus Power Supply 92% efficient or better.
                      Should be of same make as that of PC
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">10</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Ethernet
                    </td>
                    <td className="border border-gray-300 px-4 py-2">1 Gbps</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">11</td>
                    <td className="border border-gray-300 px-4 py-2">
                      USB Ports
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      4xUSB 3.0, 2xUSB 2.0
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">12</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Keyboard
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      OEM standard Keyboard with full size
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">13</td>
                    <td className="border border-gray-300 px-4 py-2">Mouse</td>
                    <td className="border border-gray-300 px-4 py-2">
                      OEM standard Mouse
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">14</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Monitor
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      24” LED Backlit LCD Monitor with height adjustment, LED
                      Backlit display with minimum resolution of 1920x1080 or
                      higher
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">15</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Operating System
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Windows 11 Professional 64-bit
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">16</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Power Management
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      SMPS surge protection, Voltage regulation
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">17</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Energy Certification
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Energy Star certified
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">18</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Product Certification
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      RoHS, EPEAT Gold
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">19</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Security
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      TPM 2.0 Security Chip
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">20</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Warranty
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      5-year onsite comprehensive warranty
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}

            <div className="flex flex-col gap-4">
              <label htmlFor="proposal">Proposal:</label>
              <textarea
                id="proposal"
                className="bg-zinc-100 rounded-md p-2 w-full"
                name="proposal"
                value={inputs.proposal}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="budgetAndFinancialImplication">
                Budget and Financial Implication:
              </label>
              <textarea
                id="budgetAndFinancialImplication"
                className="bg-zinc-100 rounded-md p-2 w-full"
                name="budgetAndFinancialImplication"
                value={inputs.budgetAndFinancialImplication}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="doaApplicable">DOA Applicable:</label>
              <select
                className="bg-zinc-100 rounded-md p-2 w-full"
                id="doaApplicable"
                name="doaApplicable"
                value={inputs.doaApplicable}
                onChange={handleChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="effectiveAuthority">Effective Authority:</label>
              <textarea
                id="effectiveAuthority"
                className="bg-zinc-100 rounded-md p-2 w-full"
                name="effectiveAuthority"
                value={inputs.effectiveAuthority}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="conclusion">Conclusion:</label>
              <textarea
                id="conclusion"
                className="bg-zinc-100 rounded-md p-2 w-full"
                name="conclusion"
                value={inputs.conclusion}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="confidential">Confidential:</label>
              <select
                className="bg-zinc-100 rounded-md p-2 w-full"
                id="confidential"
                name="confidential"
                value={inputs.confidential}
                onChange={handleChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-zinc-400 text-white px-4 py-2 rounded-md"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdministrativePage;
