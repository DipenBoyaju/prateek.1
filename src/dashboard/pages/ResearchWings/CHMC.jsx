import { useState } from "react";
import { ChevronRight, Pencil, X } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

const fetchResearchData = async () => {
  const res = await axios('http://localhost:5000/api/allResearch');
  return res.data
}

const CHMC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(
    "Researches on innovating and pushing the boundaries of physical aids and systems like Sign Language Translation, Blind aids, advanced prosthetics among many."
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ['research'],
    queryFn: fetchResearchData,
  });

  if (isLoading) {
    return <p>Loading research info...</p>;
  }

  if (isError) {
    return <p>Failed to load research info.</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-zinc-800/40 flex items-center">
          Research Wing <ChevronRight strokeWidth={1.5} size={16} />{" "}
          <span className="text-cyan-300">CHMC</span>
        </p>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-cyan-300 text-white flex items-center gap-2 text-sm rounded-md p-1 cursor-pointer"
        >
          <Pencil strokeWidth={2} size={20} />
        </button>
      </div>

      <div className="mt-5">
        <h1 className="text-2xl font-semibold">
          {data[0]?.title}
        </h1>
        <p className="pt-3 font-poppins">{data[0]?.description}</p>
      </div>

      {/* Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg space-y-4 relative">
            <button
              className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-800"
              onClick={() => setIsEditing(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold">Edit Description</h2>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-zinc-300 p-2 rounded-md min-h-[120px] resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-1 rounded-md bg-zinc-200 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-1 rounded-md bg-cyan-500 text-white text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CHMC;
