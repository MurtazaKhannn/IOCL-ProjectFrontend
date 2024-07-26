import React from 'react';

const TCCIDetails = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-[760px] divide-y divide-gray-200 text-xl">
        <thead>
          <tr>
            <th className="px-6 py-3 font-bold border-b border-gray-300">No</th>
            <th className="px-6 py-3 font-bold border-b border-gray-300">Point</th>
            <th className="px-6 py-3 font-bold border-b border-gray-300">Details</th>
            <th className="px-6 py-3 font-bold border-b border-gray-300">Content</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">1</td>
            <td className="px-6 py-4 border-r border-gray-300">A</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Brief background of the main project
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              Vide note ref: In-Principle Approval_1500_IS00_2023-2024_30300 dated <input  className='underline w-[12vw] flex items-center justify-center' type="date" />, approval is granted by DGM(IS), UPSO -II <p className='font-bold'>(Annexure 1)</p> 
              <br className='mt-2' />
              Approval for technical specifications vide ref: Administrative Approval_1500_IS00_2023-2024_124562 dated 20.12.2023 is approved by DGM (IS), UPSO-II <p className='font-bold'>(Annexure 2)</p>
              <br className='mt-2' />
              Vide note ref: Budgetary Estimate_1500_IS00_2023-2024_09960 dated 21.12.2023, estimate for Rs. 3,58,720/- including GST is approved by DGM(IS), UPSO -II <p className='font-bold'>(Annexure 3)</p>
              <br className='mt-2' />
              Admin approval for procurement of 10 nos. of colour multifunction printers at UPSO II is granted by DGM (IS), UPSO-II vide note ref: Administrative Approval_1500_IS00_2023-2024_125046 dated 21.12.2023 <p className='font-bold'>(Annexure 4)</p>
              <br className='mt-2' />
              Approval for PQ, Evaluation criteria, Special Terms and Conditions, Tender Document, Draft Bid Document is provided vide note ref: Administrative Approval_1500_IS00_2023-2024_134437 dated 10.01.2024 duly approved by DGM(IS), UPSO -II <p className='font-bold'>(Annexure 5)</p>
              <br className='mt-2' />
              E-Tender - GEM/2024/B/4461249 dated 10.01.2024 was published on GeM portal on 10.01.2024 (Annexure 6)
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">1</td>
            <td className="px-6 py-4 border-r border-gray-300">B</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Description of tendered work
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              Procurement of 10 nos. of colour multifunction printers at UPSO II
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">1</td>
            <td className="px-6 py-4 border-r border-gray-300">C</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Tender No
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              GEM/2023/B/3974893 dated 21.09.2023
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">2</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Estimated value of work
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              Rs. 3,58,720/- including GST
              </td>        
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">2</td>
            <td className="px-6 py-4 border-r border-gray-300">A</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
            Approved by
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
            DGM(IS), UPSO -II
            </td>
          </tr>

          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">2</td>
            <td className="px-6 py-4 border-r border-gray-300">B</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
            In case the estimate is more than Rs. 25 Lacs whether vetted by Finance
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
            NA
            </td>
          </tr>

          {/* <tr className="border-b border-gray-300">
              <td className="px-6 py-4 border-r border-gray-300">A</td>
          </tr> */}
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">3</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Whether Capital / Revenue Item
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              Capital
              </td>
              <br />            
          </tr>

          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">3</td>
            <td className="px-6 py-4 border-r border-gray-300">A</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
            In case of Revenue expenditure give ref No:
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
            NA
            </td>            
          </tr>

          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">3</td>
            <td className="px-6 py-4 border-r border-gray-300">B</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
            In case of Capital Item give IR No and Amount with Administrative Approval reference
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
            929497
            </td>            
          </tr>

          


          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">4</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Cumulative commitments made prior to the current proposal against the approval given in item No: 3 above
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              NA
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">5</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Approval Reference for inviting Tender
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              Admin approval for procurement of 10 nos. of colour multifunction printers at UPSO II is granted by DGM (IS), UPSO-II vide note ref: Administrative Approval_1500_IS00_2023-2024_125046 dated 21.12.2023 (Annexure 4)
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">6</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Corrigendum issued if any
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              NA
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">7</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              TCC members
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              Following are the TCC members vide office order: Inter Office Memo_1500_IS00_2023-2024_04444 dated 30.01.2024 (Annexure 7)
              <br />
              1. Ms Parul Chandra, Mgr (IS), UPSO -II
              <br />
              2. Mr Aman Kumar, AM (Engg), UPSO -II
              <br />
              3. Ms Deepali Goel, AM (Finance), UPSO –II
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">8</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Mode of Tendering (ST/LT/PT)
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              E-Tender on GeM portal
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">9</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Type of Tendering system (Single bid / Two Bid System)
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              Two Bids (Annexure 6)
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">10</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Tenders Issued / No of parties to whom enquiry was sent
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              Not Applicable, E-Public Tender.
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">11</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Time allowed for submission of tenders from the date of opening of sale of tender documents.
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              18 days (Annexure 6)
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">12</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Whether any Pre-bid meeting held
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              NA
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">13</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Due Date & Receipt of E-tenders
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              29.01.2024 @ 17:00 (Annexure 6)
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">14</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Actual Date & Time of Opening of E-tenders
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              29.01.2024 @ 17:30 (Annexure 6)
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">15</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              No of Offers received up to the due date and time of receipt
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              The technical bid of the subject tender was opened on 03.10.2023. On due date and time, the offers of the following parties were received:
              <br />
              1. Guruji Enterprises
              <br />
              2. Inca Infotech Technologies Private Limited
              <br />
              3. Neelam Enterprises
              <br />
              4. Veesara Global Digitech Solution Private Limited
              <br />
              5. Zion Digital Technologies Private Limited
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">16</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              No of Late Tenders
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              Nil (e-Tender)
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">17</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Pre-Qualification Criteria 
            </td>
            <td className='px-6 py-4 font-bold border-r border-gray-300'>(Annexure-5)</td>


          </tr>

          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">17</td>
            <td className="px-6 py-4 border-r border-gray-300">A</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
            Annual Turnover (FY 2020-21, 2021-22 & 2022-23)
            </td>
            <td className="px-6 py-4 border-r border-gray-300">
              NON-MSE BIDDER:
              <br />
              1. Bidder Turnover – Rs 2.15 lakhs (60%)
              <br />
              2. OEM Turnover – Rs 14.34 lakhs (400%)
              <br />
              <br />
              MSE BIDDER:
              <br />
              1. Bidder Turnover – Rs 1.82 lakhs (51%)
              <br />
              2. OEM Turnover – Rs 12.49 lakhs (340%)
              <br />

            </td>
          </tr>

          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">17</td>
            <td className="px-6 py-4 border-r border-gray-300">B</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Similar Work
            </td>
            <td className="px-6 py-4">
              NON MSE BIDDER:
              <br />
              1. Three works – Rs 1.07 lakhs each
              <br />
              2. Two works – Rs 1.43 lakhs each
              <br />
              3. One work – Rs 1.79 lakhs each
              <br />
              <br />
              MSE BIDDER:
              <br />
              1. Three works – Rs 0.91 lakhs each
              <br />
              2. Two works – Rs 1.21 lakhs each
              <br />
              3. One work – Rs 1.52 lakhs each
              <br />
            </td>
          </tr>

          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">17</td>
            <td className="px-6 py-4 border-r border-gray-300">C</td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              EMD
            </td>
            <td className="px-6 py-4">
              NIL – EMD is waivered off. All the bidders have to submit the bid security declaration
            </td>
          </tr>

          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">18</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Technical Evaluation of Bidders as per PQ Criteria and Other mandatory document criteria
            </td>
            <td className="px-6 py-4">
              Technical clarifications were raised on GeM Portal dated 07.02.2024, 20.02.2024 and 26.02.2024 (Annexure-8, Annexure-9 and Annexure-10)
              <br />
              All clarifications are raised to all the five vendors.
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">19</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              No of Offers rejected technically
            </td>
            <td className="px-6 py-4">
              Two (02)
              <br />
              1. Guruji Enterprises – No response received for any clarifications. Complete technical documents not submitted. Hence, technically disqualified.
              <br />
              <br />
              2. Neelam Enterprises – Responded to first clarification only. No response received to second clarification. Complete technical documents not submitted. Hence, technically disqualified.
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">20</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              No of offer rejected on the grounds of Holiday listing and reasons thereof (in case of two bid)
            </td>
            <td className="px-6 py-4">
              NIL
              <br />
              <br />
              Holiday listing status has been checked from Vendor Holiday List on intranet, none of the participating bidders are appearing on holiday listing as on date.
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">21</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Reference of Technical bid TCC minutes
            </td>
            <td className="px-6 py-4">
              Technical comparative chart was prepared by committee on the basis of documents submitted by the bidders at the time of bid submission and in response technical clarification was raised. (Annexure 7)
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">22</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Whether any pre-Price bid meeting held? If yes on which date & reference of Pre-bid minutes
            </td>
            <td className="px-6 py-4">
              NO
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">23</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Details of deviation accepted by TCC, if any
            </td>
            <td className="px-6 py-4">
              NIL
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">24</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Name of parties if any who do not agree to above deviations
            </td>
            <td className="px-6 py-4">
              NA
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">25</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Any revised price bid obtained with reasons
            </td>
            <td className="px-6 py-4">
              NO
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">26</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Parties who qualify for opening of Price Bids with reference to TCC recommendations
            </td>
            <td className="px-6 py-4">
              TCC recommends opening of Price bids of following three (03) bidders who have been qualified as per PQ criteria and submission of relevant other mandatory document criteria.
              <br />
              Technically Qualified bidders are as follows:
              <br />
              <br />
              1. Inca Infotech Technologies Private Limited
              <br />
              <br />
              2. Veesara Global Digitech Solution Private Limited
              <br />
              <br />
              3. Zion Digital Technologies Private Limited
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">27</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Validity of Offer
            </td>
            <td className="px-6 py-4">
              180 days from the opening of the technical bid
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">28</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Weather CVC guidelines have been complied with.
            </td>
            <td className="px-6 py-4">
              YES
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">29</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              Any other relevant information.
            </td>
            <td className="px-6 py-4">
              NA
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-6 py-4 border-r border-gray-300">30</td>
            <td className="px-6 py-4 border-r border-gray-300"></td>
            <td className="px-6 py-4 font-bold border-r border-gray-300">
              DOA/Approving Authority.
            </td>
            <td className="px-6 py-4">
              DGM (IS), UPSO II is requested to accord approval for opening of Price Bid of the 03 (three) technically qualified bidder as recommended above.
              <br />
              Approval sought under DOA 9.01 a) i)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TCCIDetails;
