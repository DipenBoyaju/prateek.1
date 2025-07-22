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

const getProject = async (symbol) => {
  const res = await axios.get(`${baseUrl}/api/project/getProjectByDivision?divisionSymbol=${symbol}`)
  return res.data;
}

const getPublication = async (symbol) => {
  const res = await axios.get(`${baseUrl}/api/publication/getPublicationByDivision?divisionSymbol=${symbol}`)
  return res.data;
}

const CCCT = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");

  const { data: research, isLoading, isError } = useQuery({
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

  const symbol = research && Array.isArray(research) && research.length > 0 ? research[2].symbol : null;

  // Update local content state when data is loaded
  useEffect(() => {
    if (research && research[2]) {
      setContent(research[2].description);
    }
  }, [research]);

  const { data: projects, isPending } = useQuery({
    queryFn: () => getProject(symbol),
    queryKey: ['subProject'],
    enabled: !!symbol,
  })

  const { data: publications, isLoading: publicationLoading } = useQuery({
    queryFn: () => getPublication(symbol),
    queryKey: ['publication'],
    enabled: !!symbol,
  })

  if (isLoading) return <p>Loading research info...</p>;
  if (isError) return <p>Failed to load research info.</p>;

  const handleSave = () => {
    mutation.mutate(
      {
        id: research[2]._id,
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
          <span className="text-blue-500">{research[2]?.symbol}</span>
        </p>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white text-xs md:text-sm p-2 px-2 md:px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand hover:bg-blue-600 transition cursor-pointer"
        >
          <Pen className="size-3 md:size-4" /> Edit
        </button>
      </div>

      <div className="my-5 bg-white p-4 rounded-md ">
        <div className="">
          <h1 className="text-xl md:text-2xl text-blue-600 font-semibold">{research[2]?.title}</h1>
          <p className="pt-3 font-poppins font-light text-sm">{research[2]?.description}</p>
        </div>

        <div className="pt-10">
          <h3 className="text-lg font-semibold uppercase text-zinc-800">Projects</h3>
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {
              isPending ? (
                <p>Loading</p>
              ) : projects?.length > 0 ?
                projects?.map((project) => (
                  <div className="shadow p-3 bg-indigo-500 rounded-sm" key={project._id}>
                    <p className="text-white text-lg font-semibold tracking-wide">{project?.title}</p>
                    <p className="text-sm font-light text-white py-4">{project?.description.slice(0, 50)}...</p>
                    <p className="text-xs bg-white w-fit rounded-full py-0.5 px-2 mt-2 text-indigo-500 font-semibold font-quicksand">{project?.divisionSymbol}</p>
                  </div>
                )) : (
                  <p className="text-sm text-zinc-600">No Projects</p>
                )
            }
          </div>
        </div>

        <div className="pt-10">
          <h3 className="text-lg font-semibold uppercase text-zinc-800">Publications</h3>
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
            {
              publicationLoading ? (
                <p>Loading</p>
              ) : publications?.length > 0 ?
                publications?.map((publication) => (
                  <div
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
                  </div>
                )) : (
                  <p className="text-sm text-zinc-600">No Publication</p>
                )
            }
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

export default CCCT;
