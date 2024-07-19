import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Drafts = () => {
  // const { draftId } = useParams();
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState(null);
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await fetch(`/api/forms/savedraft`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Ensure cookies are sent
        });

        if (response.ok) {
          const data = await response.json();
          setDrafts(data); // Assuming your backend returns an array of drafts
        } else {
          // Handle error cases
          console.error('Failed to fetch drafts');
        }
      } catch (error) {
        console.error('Error fetching drafts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  if(loading){
    return <div>Loading... </div>
  }

  const handleEditDraft = (draftId) => {
    navigate(`/editdraft/${draftId}`); // Navigate to edit draft page with draftId
  };
  return (
    <div>
      <h1>Drafts</h1>
      
    </div>
  );
};

export default Drafts;
