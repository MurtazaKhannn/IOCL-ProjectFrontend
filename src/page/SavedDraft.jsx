import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const SavedDraft = () => {
  const { userId } = useParams(); // Get userId from URL params
  const [drafts, setDrafts] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingView, setLoadingView] = useState({});

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
    const isConfirmed = window.confirm("Do you really want to delete this draft?");

    if (isConfirmed) {
      try {
        setLoadingDelete(true);
        const res = await fetch(`/api/forms/delete/${draftId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.ok) {
          setDrafts(drafts.filter((draft) => draft._id !== draftId));
        } else {
          console.log("Failed to delete draft");
        }
      } catch (error) {
        console.log("Error deleting draft", error);
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  const handleDraftClick = (draftId) => {
    setLoadingView((prev) => ({ ...prev, [draftId]: true }));
    console.log(loadingView);
    
    setTimeout(() => {
      setLoadingView((prev) => ({ ...prev, [draftId]: false }));
      navigate(`/savedraft/${draftId}`);
    }, 500); // Simulate a delay of 2 seconds
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
            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(draft._id)}
                className="text-white text-xl bg-red-500 hover:bg-red-700 py-2 px-4 rounded-md"
              >
                {loadingDelete ? <ClipLoader size={20} color={"#fff"} /> : "Delete"}
              </button>

              <button
                onClick={() => handleDraftClick(draft._id)}
                className="text-white text-xl bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-md"
              >
                {loadingView[draft._id] ? <ClipLoader  size={20} color={"#fff"} /> : "Edit"}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="flex items-center justify-center w-full h-[88.9vh] text-5xl">No drafts available</p>
      )}
    </div>
  );
};

export default SavedDraft;
