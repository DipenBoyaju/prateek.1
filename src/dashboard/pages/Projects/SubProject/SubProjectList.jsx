import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../../utils/baseUrl";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pen, Trash } from "lucide-react";

const getSubProjects = async (mainProjectId) => {
  const res = await axios.get(
    `${baseUrl}/api/subProject/getProjectsByMainId?mainProject=${mainProjectId}`
  );
  return res.data;
};

const deleteSubProject = async (id) => {
  const res = await axios.delete(`${baseUrl}/api/subProject/deleteProject/${id}`);
  return res.data;
};

const SubProjectList = ({ mainSlug, mainProjectId }) => {
  const nav = useNavigate()
  const [showPopup, setShowPopup] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const queryClient = useQueryClient();

  const { data: projects = [], isLoading, isError } = useQuery({
    queryKey: ["subProjects", mainProjectId],
    queryFn: () => getSubProjects(mainProjectId),
    enabled: !!mainProjectId,
  });

  const mutation = useMutation({
    mutationFn: (id) => deleteSubProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["subProjects", mainProjectId]);
      setShowPopup(false);
      setDeletingId(null);
    },
    onError: () => {
      alert("Failed to delete project");
    },
  });

  const handleConfirmDelete = (id) => {
    setDeletingId(id);
    setShowPopup(true);
  };

  const handleDelete = () => {
    if (deletingId) {
      mutation.mutate(deletingId);
    }
  };

  if (isError) {
    return <div className="text-center text-red-500">Failed to load subprojects.</div>;
  }

  if (!projects.length) {
    return <div className="text-gray-500 text-center">No SubProjects available yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        projects.map((project) => (
          <div
            key={project._id}
            className="flex flex-col h-full rounded-md shadow-sm bg-white hover:shadow-md transition relative"
          >
            <div className="absolute top-0 right-0">
              <div className="flex flex-col">
                <button className="bg-emerald-500 p-2 text-white cursor-pointer hover:bg-emerald-400 transition-colors ease-in-out " onClick={() => nav(`/dashboard/project/${mainSlug}/${project?.slug}/editProject`)}>
                  <Pen strokeWidth={1.5} size={25} />
                </button>
                <button
                  className="bg-red-500 p-2 text-white cursor-pointer hover:bg-red-400 transition-colors ease-in-out"
                  onClick={() => handleConfirmDelete(project._id)}
                >
                  <Trash strokeWidth={1.5} size={25} />
                </button>
              </div>
            </div>

            <Link
              to={`/dashboard/project/${mainSlug}/${project.slug}`}
              className="flex flex-col flex-grow"
            >
              {/* Image Banner */}
              <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold rounded-t-md">
                {project.divisionSymbol || "IMG"}
              </div>

              {/* Text content */}
              <div className="flex flex-col flex-grow border-l-4 border-blue-600 p-4 rounded-br-md rounded-bl-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{project.title}</h2>
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <span className="mr-2">{project.division}</span>
                  {project.divisionSymbol && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-mono">
                      {project.divisionSymbol}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 text-sm line-clamp-3 flex-grow">
                  {project.description}
                </p>
                <div className="mt-3 text-blue-600 text-xs font-medium">
                  View Project →
                </div>
              </div>
            </Link>
          </div>
        ))
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold text-zinc-800 mb-3">
              Confirm Deletion
            </h2>
            <p className="text-zinc-600 mb-5">
              Are you sure you want to delete this project?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-zinc-300 text-zinc-800 px-4 py-2 rounded-sm hover:bg-zinc-400 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={mutation.isPending}
                className={`px-4 py-2 text-white rounded-sm transition cursor-pointer ${mutation.isPending
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
                  }`}
              >
                {mutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubProjectList;
