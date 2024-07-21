import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // For getting URL parameters

const SavedDraft = () => {
  const { userId } = useParams(); // Get userId from URL params
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await fetch(`/api/forms/savedrafts/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setDrafts(data);
        } else {
          console.log("Failed to fetch drafts");
        }
      } catch (error) {
        console.log("Error fetching drafts", error);
      }
    };

    if (userId) {
      fetchDrafts();
    }
  }, [userId]);

  const handleDelete = async (draftId) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm("Do you really want to delete this draft?");

    if (isConfirmed) {
      try {
        const res = await fetch(`/api/forms/delete/${draftId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.ok) {
          // Remove the draft from the state only if deletion was successful
          setDrafts(drafts.filter((draft) => draft._id !== draftId));
        } else {
          console.log("Failed to delete draft");
        }
      } catch (error) {
        console.log("Error deleting draft", error);
      }
    }
  };

  const handleDraftClick = (draftId) => {
    navigate(`/savedraft/${draftId}`);
  };

  return (
    <div className="w-full min-h-[88.9vh] font-teko mt-5 bg-zinc-100">
      {drafts.length > 0 ? (
        drafts.map((draft) => (
          <div
            key={draft._id}
            className="p-5 flex flex-col w-3/4 gap-5 ml-5 bg-white rounded-md shadow-md mb-4"
          >
            <div>
              <h2 className="text-2xl font-bold">{draft._id}</h2>
              <p>CreatedAt: {draft.createdAt ? draft.createdAt.split('T')[0] : 'Date not available'}</p>
              <p>UpdatedAt: {draft.updatedAt ? draft.updatedAt.split('T')[0] : 'Date not available'}</p>
            </div>
            {/* Add more draft details here */}
            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(draft._id)}
                className="text-white text-xl bg-red-500 hover:bg-red-700 py-2 px-4 rounded-md"
              >
                Delete
              </button>

              <button
                onClick={() => handleDraftClick(draft._id)}
                className="text-white text-xl bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-md"
              >
                View
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No drafts available</p>
      )}
    </div>
  );
};

export default SavedDraft;
