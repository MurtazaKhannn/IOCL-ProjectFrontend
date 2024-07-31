import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SDone = () => {
  // const apiUrl = process.env.REACT_APP_API_URL;

  const { draftId } = useParams();
  const [draft, setDraft] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const res = await fetch(`/api/forms/savedraft/${draftId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setDraft(data);
        } else {
          console.log('Failed to fetch Draft Details');
        }
      } catch (error) {
        console.log('Error in fetching draft details', error);
      }
    };

    fetchDraft();
  }, [draftId]);

  const handleFormSelect = (event) => {
    const formType = event.target.value;
    setSelectedForm(draft[formType]);
  };

  if (!draft) return <><p>Loading ... </p></> ;

  return (
    <div className='w-full min-h-[88.9vh] gap-5 flex flex-col font-teko justify-center items-center'>
      <h1 className='text-4xl font-semibold '>SELECT FORM</h1>
      <div className='flex w-full h-full items-center justify-center'>
        <select onChange={handleFormSelect} className="p-2 w-[20vw] rounded-md bg-white">
          <option value="">Select Form</option>
          {draft.apData.length > 0 && <option value="apData">AP Data</option>}
          {draft.tcciData.length > 0 && <option value="tcciData">TCCI Data</option>}
          {draft.tccfnData.length > 0 && <option value="tccfnData">TCCFN Data</option>}
          {draft.beData.length > 0 && <option value="beData">BE Data</option>}
          {draft.ipaData.length > 0 && <option value="ipaData">IPA Data</option>}
        </select>
      </div>
    </div>
  );
};

export default SDone;

