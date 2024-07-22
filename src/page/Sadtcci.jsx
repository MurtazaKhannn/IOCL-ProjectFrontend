import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SAD = () => {
  const { draftId } = useParams();
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const res = await fetch(`/api/forms/TCC%20Intermediate/${draftId}`, {
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

  if (!draft) return <><p>Loading ... </p></> ;

  return (
    <div className='w-full min-h-[88.9vh] gap-5 p-5 flex flex-col font-teko justify-center items-center'>
      <h1 className='text-4xl font-semibold '>TCC Intermediate</h1>
      <div className='flex w-full h-full items-center justify-center'>
        {/* <h2>AP Data</h2> */}
          <div className='flex flex-col items-center w-full justify-center gap-5 p-2'>
            <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
              <label htmlFor="section">Section</label>
              <input type="text" className='rounded-md  p-2 w-full' value={draft.section} readOnly />
            </div>

            <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
              <label htmlFor="department">Department</label>
              <input type="text" className='rounded-md  p-2 w-full' value={draft.department} readOnly />
            </div>

            <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
              <label htmlFor="location">Location</label>
              <input type="text" className='rounded-md  p-2 w-full' value={draft.location} readOnly />
            </div>

            <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
              <label htmlFor="date">Date</label>
              <input type="text" className='rounded-md  p-2 w-full' value={draft.date.split('T')[0]} readOnly />
            </div>

            <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
              <label htmlFor="subject">Subject</label>
              <input type="text" className='rounded-md  p-2 w-full' value={draft.subject} readOnly />
            </div>

            <div className='flex w-2/3 items-center justify-center gap-3 text-xl'>
              <label htmlFor="confidential">Confidential</label>
              <input type="text" className='rounded-md  p-2 w-full' value={draft.confidential} readOnly />
            </div>

            <div className='flex w-2/3 items-center justify-center gap-64 text-xl'>
              <button className='bg-yellow-500 px-6 py-1 rounded-md text-white text-lg'>Edit</button>
              <button className='bg-orange-500 px-6 py-1 rounded-md text-white text-lg'>Save</button>
            </div>
            

          </div>
      </div>
    </div>
  );
};

export default SAD;
