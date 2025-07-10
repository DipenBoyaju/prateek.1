import axios from "axios";
import { Pen, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const fetchAllProject = async () => {
  const res = await axios.get(`${baseUrl}/api/project/getAllProjects`);
  return res.data;
}

const deleteProject = async (id) => {
  const res = await axios.delete(`${baseUrl}/api/project/deleteProject/${id}`);
  return res.data;
}

const DasProjects = () => {
  const nav = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const { data: projects, isLoading } = useQuery({
    queryKey: ['project'],
    queryFn: fetchAllProject,
  })

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['project']);
      toast.success('Project Deleted')
      setShowPopup(false);
    },
    onError: () => {
      toast.error("Failed to delete project");
    }
  })

  const handleConfirmDelete = (id) => {
    setDeletingId(id);
    setShowPopup(true);
  };

  const handleDelete = () => {
    if (!deletingId) return;
    setDeletingId(true)
    mutation.mutate(deletingId)
  }

  return (
    <div className="">
      <div className="bg-white p-4 flex justify-between items-center shadow rounded-md">
        <p className="md:text-lg font-semibold text-blue-600">Projects</p>
        <button
          onClick={() => nav("/dashboard/projects/addProject")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm px-2 md:px-4 py-2 rounded-md flex items-center gap-1 transition cursor-pointer"
        >
          <Plus className="size-4 md:size-5" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {
          isLoading ? (
            <p>Projects Loading</p>
          ) : projects?.length > 0 ?
            projects.map((project) => (
              <div
                key={project._id}
                className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                onClick={() => nav(`/dashboard/project/${project?.slug}`)}>
                <div>
                  {project.division && (
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full mb-3">
                      {project.divisionSymbol}
                    </span>
                  )}
                  <h2 className="text-xl font-semibold text-zinc-900 mb-2">
                    {project.title}
                  </h2>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nav(`/dashboard/project/editproject/${project?.slug}`)
                    }}
                    className="inline-flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 px-4 py-2 rounded-md transition cursor-pointer"
                  >
                    <Pen size={16} /> Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConfirmDelete(project?._id)
                    }}
                    className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-white hover:bg-red-500 px-4 py-2 rounded-md transition cursor-pointer"
                  >
                    <Trash size={16} /> Delete
                  </button>
                </div>
              </div>
            )) : (
              <p>No Projects</p>
            )
        }
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold text-zinc-800 mb-3">
              Confirm Deletion
            </h2>
            <p className="text-zinc-600 mb-5">
              Are you sure you want to delete this project and the sub project related to it?
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
      )}
    </div>
  );
};

export default DasProjects;
