import { useState } from "react";
import { Plus } from "lucide-react";
import UploadNewsletter from "./UploadNewsletter";
import NewsletterList from "./NewsletterList";
import NewsletterViewer from "./NewsletterViewer";

const DasNewsletter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow rounded-md">
        <p className="text-sm text-blue-500 flex items-center">Newsletter</p>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white text-sm p-2 px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand hover:bg-blue-600 transition-colors"
          >
            <Plus size={16} /> Add Newsletter
          </button>
        </div>
      </div>

      {isModalOpen && (
        <UploadNewsletter
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div className="">
        <NewsletterList onSelect={setSelectedNewsletter} />
      </div>

      <NewsletterViewer
        newsletter={selectedNewsletter}
        onClose={() => setSelectedNewsletter(null)}
      />
    </div>
  );
};

export default DasNewsletter;
