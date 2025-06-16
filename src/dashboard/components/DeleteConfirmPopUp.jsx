import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DeleteConfirmPopUp = ({ id, setShowConfirmPopup }) => {
  const nav = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`${baseUrl}/api/team/member/${id}`);
      nav(-1);
    } catch (error) {
      console.error("Failed to delete member:", error);
      alert("Failed to delete member. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowConfirmPopup(false);
    }
  };

  const handleCancel = () => setShowConfirmPopup(false);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold text-zinc-800 mb-3">Confirm Deletion</h2>
        <p className="text-zinc-600 mb-5">Are you sure you want to delete this member?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="bg-zinc-300 text-zinc-800 px-4 py-2 rounded-sm hover:bg-zinc-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
            className={`px-4 py-2 text-white rounded-sm transition ${isDeleting ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
              }`}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}
export default DeleteConfirmPopUp