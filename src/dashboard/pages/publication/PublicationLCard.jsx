import axios from "axios";
import { Pen, Trash } from "lucide-react";
import { baseUrl } from "../../../utils/baseUrl.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const deletePublication = async (id) => {
  const res = await axios.delete(`${baseUrl}/api/publication/deletePublication/${id}`);
  return res.data;
}

const publishStatus = async ({ id, publish }) => {
  const res = await axios.patch(`${baseUrl}/api/publication/publishStatus/${id}`, { publish });
  return res.data;
}

const PublicationLCard = ({ publication }) => {
  const nav = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deletePublication(publication._id),
    onSuccess: () => {
      queryClient.invalidateQueries(["publication"]);
    },
    onError: (error) => {
      console.error("Failed to delete publication:", error);
      alert("Failed to delete publication");
    },
  });

  const publishMutation = useMutation({
    mutationFn: publishStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publication'] });
      toast.success('Publish status updated!');
    },
    onError: (error) => {
      toast.error('Failed to update publish status: ' + error.message);
    },
  });

  const handleConfirmDelete = (id) => {
    setDeletingId(id);
    setShowPopup(true);
  };

  const handleDelete = () => {
    if (!deletingId) return;
    mutation.mutate(deletingId);
  };

  return (
    <div
      onClick={() => {
        if (publication.pdfUrl) {
          window.open(publication.pdfUrl, '_blank');
        } else {
          toast.error("No PDF available");
        }
      }}
      className="flex items-stretch shadow-md border border-zinc-300 rounded bg-white w-full overflow-hidden cursor-pointer hover:shadow-lg transition"
    >
      {/* Left vertical tag */}
      <div className="bg-emerald-500 text-white font-semibold px-4 flex items-center justify-center">
        <p className="text-xl uppercase">{publication.code}</p>
      </div>

      {/* Right content area */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="border-b border-zinc-900/20 pb-1 px-4 pt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium ">
              {publication.year}
              {publication.divisionSymbol && `, ${publication.divisionSymbol}`}
            </p>
            <div className="gap-1 flex">
              <button onClick={(e) => {
                e.stopPropagation();
                publishMutation.mutate({ id: publication._id, publish: !publication.publish });
              }} className={`${publication?.publish ? 'bg-zinc-500' : 'bg-emerald-500'} text-white text-sm p-2 px-2 md:px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:emerald-blue-600 transition-colors ease-in-out`}>{publication?.publish ? 'Published' : 'Publish'}</button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nav(`/dashboard/publications/editPublication/${publication.slug}`);
                }}
                className="bg-emerald-500 p-2 rounded-md text-white cursor-pointer"
              >
                <Pen size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent parent click
                  handleConfirmDelete(publication._id);
                }}
                className="bg-red-500 p-2 rounded-md text-white cursor-pointer"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
          <p className="text-lg font-semibold text-zinc-800 leading-snug pl-4 py-2">
            {publication.title}
          </p>
        </div>

        {/* Bottom: authors list and conference */}
        <div>
          <ul className="flex flex-wrap gap-x-4 text-sm font-medium text-gray-600 pl-4 mt-8">
            {publication.authors.map((author, idx) => (
              <li key={idx}>{author.name}</li>
            ))}
          </ul>
          <p className="text-sm pl-4 py-3 bg-emerald-300 text-white mt-2">
            {publication.conference}
          </p>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold text-zinc-800 mb-3">
              Confirm Deletion
            </h2>
            <p className="text-zinc-600 mb-5">
              Are you sure you want to delete this publication?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup(false)
                }}
                className="bg-zinc-300 text-zinc-800 px-4 py-2 rounded-sm hover:bg-zinc-400 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={mutation.isPending}
                className={`px-4 py-2 text-white rounded-sm transition ${mutation.isPending
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 cursor-pointer"
                  }`}
              >
                {mutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default PublicationLCard;
