import { X } from "lucide-react";
import { useEffect, useState } from "react";

const NewsModal = ({ news, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger fade-in when mounted
    setShow(true);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '--';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  };

  const fullDate = formatDate(news?.createdAt);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Animated container */}
      <div
        className={`
          bg-white max-w-3xl w-full p-8 rounded-xl shadow-xl relative transform transition-all duration-300 
          ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 transition cursor-pointer"
        >
          <X strokeWidth={1.5} size={24} />
        </button>

        <div className="mb-4">
          <h2 className="text-xl md:text-3xl font-bold text-zinc-800 mb-1">
            {news.title}
          </h2>
          <p className="text-xs text-zinc-500">{fullDate}</p>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[70vh] pr-2">
          {news.description && (
            <p className="text-zinc-600 leading-relaxed font-light">{news.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
