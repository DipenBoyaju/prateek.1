import axios from "axios";
import { X } from "lucide-react";
import { baseUrl } from "../../../utils/baseUrl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";

const publishStatus = async ({ id, publish }) => {
  const res = await axios.patch(`${baseUrl}/api/newsletter/publishStatus/${id}`, { publish });
  return res.data;
}

const NewsletterViewer = ({ newsletter, onClose }) => {
  if (!newsletter) return null;
  const [isPublished, setIsPublished] = useState(newsletter.publish);
  const queryClient = useQueryClient();

  // Use consistent property name for PDF url:
  const pdfUrl = newsletter.fileUrl || newsletter.url || newsletter.pdfUrl;

  const publishMutation = useMutation({
    mutationFn: publishStatus,
    onSuccess: (_, variables) => {
      setIsPublished(variables.publish);
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast.success('Publish status updated!');
    },
    onError: (error) => {
      toast.error('Failed to update publish status: ' + error.message);
    },
  });

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      <div className="fixed z-50 top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-4 overflow-auto">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{newsletter.title}</h3>

          <div className="flex items-center gap-4">
            <button onClick={() => {
              publishMutation.mutate({ id: newsletter._id, publish: !isPublished });
            }} className={`${isPublished ? 'bg-zinc-500' : 'bg-emerald-500'} text-white text-sm p-2 px-2 md:px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:emerald-blue-600 transition-colors ease-in-out`}>{isPublished ? 'Published' : 'Publish'}</button>
            <button
              onClick={onClose}
              className="cursor-pointer bg-red-500 rounded-sm p-0.5 text-white hover:text-gray-900 font-bold text-lg"
              title="Close"
            >
              <X />
            </button>
          </div>
        </div>

        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title={newsletter.title}
            className="w-full h-full border rounded"
            allowFullScreen />
        ) : (
          <p className="text-center text-gray-500">No preview available.</p>
        )}
      </div>
    </>
  );
};

export default NewsletterViewer;
