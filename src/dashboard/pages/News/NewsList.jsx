import axios from "axios";
import { Eye, Pen, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const NewsList = ({ news }) => {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const [showPopup, setShowPopup] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const createdAtDate = news?.updatedAt ? new Date(news.updatedAt) : new Date(news.createdAt);

  const formattedDate = createdAtDate
    ? createdAtDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    : "";

  const formattedTime = createdAtDate
    ? createdAtDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    : "";

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`${baseUrl}/api/news/deleteNews/${deletingId}`);
      toast.success("News deleted successfully!");
      queryClient.invalidateQueries(["newsList"]);
      setShowPopup(false);
    } catch (err) {
      toast.error("Failed to delete news");
      console.log(err)
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConfirmDelete = (id) => {
    setDeletingId(id);
    setShowPopup(true);
  };

  return (
    <>
      <tr className="hover:bg-zinc-50 transition duration-150">
        <td className="px-6 py-4 font-semibold">{news?.title}</td>
        <td className="px-6 py-4">{formattedDate}</td>
        <td className="px-6 py-4">{formattedTime}</td>
        <td className="px-6 py-4 flex gap-1">
          <button onClick={() => nav(`/dashboard/news/${news?.slug}`)} className="bg-zinc-800 p-2 rounded-sm text-white cursor-pointer">
            <Eye size={16} />
          </button>
          <button
            onClick={() => nav(`/dashboard/news/editnews/${news?.slug}`)}
            className="bg-emerald-500 p-2 rounded-sm text-white cursor-pointer"
          >
            <Pen size={16} />
          </button>
          <button
            onClick={() => handleConfirmDelete(news?._id)}
            className="bg-red-500 p-2 rounded-sm text-white cursor-pointer"
          >
            <Trash size={16} />
          </button>
        </td>
      </tr>

      {/* Delete Confirmation Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold text-zinc-800 mb-3">
              Confirm Deletion
            </h2>
            <p className="text-zinc-600 mb-5">
              Are you sure you want to delete this news?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-zinc-300 text-zinc-800 px-4 py-2 rounded-sm hover:bg-zinc-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-4 py-2 text-white rounded-sm transition ${isDeleting
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
                  }`}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsList;
