import { X } from "lucide-react";

const NewsletterViewer = ({ newsletter, onClose }) => {
  if (!newsletter) return null;

  // Use consistent property name for PDF url:
  const pdfUrl = newsletter.fileUrl || newsletter.url || newsletter.pdfUrl;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      <div className="fixed z-50 top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-4 overflow-auto">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{newsletter.title}</h3>
          <button
            onClick={onClose}
            className="cursor-pointer bg-red-500 rounded-sm p-0.5 text-white hover:text-gray-900 font-bold text-lg"
            title="Close"
          >
            <X />
          </button>
        </div>

        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title={newsletter.title}
            className="w-full h-full border rounded"
          />
        ) : (
          <p className="text-center text-gray-500">No preview available.</p>
        )}
      </div>
    </>
  );
};

export default NewsletterViewer;
