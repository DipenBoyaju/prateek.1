import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import toast from "react-hot-toast";
import { FileText, Trash } from "lucide-react";
import { useState } from "react";

const fetchNewsletters = async () => {
  const { data } = await axios.get(`${baseUrl}/api/newsletter/all`);
  return data;
};

const NewsletterList = ({ onSelect }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPopup, setShowPopup] = useState(false)
  const queryClient = useQueryClient();
  const { data: newsletters, error, isLoading } = useQuery({
    queryKey: ["newsletters"],
    queryFn: fetchNewsletters,
    onError: () => toast.error("Failed to load newsletters"),
  });

  if (isLoading) return <p>Loading newsletters...</p>;
  if (error) return <p>Error loading newsletters.</p>;

  if (!newsletters || newsletters.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-4">
        <p>No newsletters available.</p>
      </div>
    );
  }

  const handleConfirmDelete = (id) => {
    setDeletingId(id);
    setShowPopup(true);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`${baseUrl}/api/newsletter/deleteNewsletter/${deletingId}`);
      toast.success("Newsletter deleted successfully!");
      queryClient.invalidateQueries(["newsletters"]);
    } catch (err) {
      toast.error("Failed to delete newsletter");
      console.error(err);
    } finally {
      setIsDeleting(false);
      setShowPopup(false);
    }
  };

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newsletters.map((nl) => (
          <div
            key={nl._id}
            onClick={() => onSelect(nl)}
            className="cursor-pointer rounded-lg border bg-white border-gray-300 p-4 flex flex-col items-center hover:shadow-lg hover:border-blue-500 transition relative group overflow-hidden"
            title={nl.title}
          >
            <div className="absolute top-0 right-0 bg-red-500 text-white p-1 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto rounded-sm" onClick={(e) => {
              e.stopPropagation();
              handleConfirmDelete(nl._id);
            }}>
              <Trash size={20} />
            </div>
            {/* PDF preview or icon */}
            {nl.thumbnailUrl ? (
              <img
                src={nl.thumbnailUrl}
                alt={`Preview of ${nl.title}`}
                className="w-full h-40 object-cover rounded mb-4"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center rounded mb-4 bg-gray-100 text-blue-500">
                <FileText size={64} />
              </div>
            )}

            <p className="text-base font-medium text-center">{nl.title}</p>
            <p className="text-sm text-gray-500 mt-1">
              Uploaded: {new Date(nl.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default NewsletterList;
