import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Spinner from '../page/Spinner';


const DraftCard = () => {
  const [loadingNew, setLoadingNew] = useState(false);
  const [loadingDrafts, setLoadingDrafts] = useState(false);
  const navigate = useNavigate();
  const userId = '6694cf84e02a217abe0f7bda'; // Replace with dynamic user ID if available

  const handleCreateNew = () => {
    setLoadingNew(true);
    // Simulate a delay for the loading spinner
    setLoadingNew(false);
    navigate("/createnew");
  };

  const handleSavedDrafts = () => {
    setLoadingDrafts(true);
    // Simulate a delay for the loading spinner
    setLoadingDrafts(false);
    navigate(`/savedrafts/${userId}`);
  };

  return (
    <div className='w-full min-h-[88.9vh] flex items-center justify-center bg-zinc-100 font-teko text-white p-4'>
      <div className='flex flex-col gap-8 items-center justify-center w-full md:w-[80vw] h-[70vh] bg-white rounded-md p-4'>
        <h1 className='text-3xl md:text-5xl font-semibold text-black text-center'>Workflow Options</h1>
        
        <div className='w-full md:w-[55vw] h-[35%] pt-5 flex flex-col items-center justify-center rounded-md bg-orange-500 p-4'>
          <div className='flex flex-col items-center justify-center gap-3'>
            <p className='p-2 text-[1.2rem] md:text-[1.8rem] w-full text-center'>Start a new tender by filling in the necessary details and submitting for approval.</p>
            <button 
              onClick={() => {
                setLoadingNew(true);
                // Simulate a brief loading period
                setTimeout(() => {
                  setLoadingNew(false);
                  navigate("/createnew");
                }, 500);
              }} 
              className='text-[0.8rem] md:text-[1rem] mb-4 flex justify-center items-center w-full md:w-[15vw] p-2 font-semibold rounded-md bg-white text-black'
              disabled={loadingNew}
            >
              {loadingNew ? <ClipLoader size={20} color={"#000"} /> : "Create New"}
            </button>
          </div>
        </div>
        
        <div className='w-full md:w-[55vw] h-[35%] pt-5 flex flex-col items-center justify-center rounded-md bg-orange-500 p-4'>
          <div className='flex flex-col items-center justify-center gap-3'>
            <p className='p-2 text-[1.2rem] md:text-[1.8rem] w-full text-center'>View and manage your tenders, edit drafts, and finalize them for submission.</p>
            <button 
              onClick={() => {
                setLoadingDrafts(true);
                // Simulate a brief loading period
                setTimeout(() => {
                  setLoadingDrafts(false);
                  navigate(`/savedrafts/${userId}`);
                }, 500);
              }} 
              className='text-[0.8rem] md:text-[1rem] mb-4 flex justify-center items-center w-full md:w-[15vw] p-2 font-semibold rounded-md bg-white text-black'
              disabled={loadingDrafts}
            >
              {loadingDrafts ? <ClipLoader size={20} color={"#000"} /> : "Saved"}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default DraftCard;

