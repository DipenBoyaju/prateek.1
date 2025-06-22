import { useState, useEffect } from "react";
import { Pen, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import { HiMiniSlash } from "react-icons/hi2";
import { toast } from "react-hot-toast";


const fetchResearchData = async () => {
  const res = await axios(`${baseUrl}/api/allResearch`);
  return res.data;
};

const updateResearchData = async ({ id, description }) => {
  const res = await axios.put(`${baseUrl}/api/research/update/${id}`, { description });
  return res.data;
};

const CIIATC = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["research"],
    queryFn: fetchResearchData,
  });

  const mutation = useMutation({
    mutationFn: updateResearchData,
    onSuccess: () => {
      queryClient.invalidateQueries(["research"]);
      setIsEditing(false);
    },
  });

  // Update local content state when data is loaded
  useEffect(() => {
    if (data && data[3]) {
      setContent(data[3].description);
    }
  }, [data]);

  if (isLoading) return <p>Loading research info...</p>;
  if (isError) return <p>Failed to load research info.</p>;

  const handleSave = () => {
    mutation.mutate(
      {
        id: data[3]._id,
        description: content,
      },
      {
        onSuccess: () => {
          toast.success("Updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update data.");
        },
      }
    );
  };

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow rounded-md">
        <p className="text-sm text-zinc-800/90 flex items-center gap-1">
          Research Wings <HiMiniSlash className="text-base" />
          <span className="text-blue-500">{data[3]?.symbol}</span>
        </p>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white text-sm p-2 px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand hover:bg-blue-600 transition"
        >
          <Pen size={16} /> Edit
        </button>
      </div>

      <div className="my-5 bg-white p-4 rounded-md ">
        <div className="">
          <h1 className="text-2xl text-blue-600 font-semibold">{data[3]?.title}</h1>
          <p className="pt-3 font-poppins font-light">{data[3]?.description}</p>
        </div>

        <div className="pt-10">
          <h3 className="text-lg font-semibold uppercase text-zinc-800">Projects</h3>
          <div className="pt-2">
            <div className="shadow p-3 bg-blue-200 rounded-sm">
              <p className="text-white">Inclusive Real time Sign Language Translation Platform</p>
            </div>
          </div>
        </div>
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
                className="px-4 py-2 rounded-md bg-zinc-200 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={mutation.isLoading}
                className="px-4 py-2 rounded-md bg-emerald-400 text-white text-sm hover:bg-emerald-600"
              >
                {mutation.isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CIIATC;
