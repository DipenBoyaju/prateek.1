import { HiMiniSlash } from "react-icons/hi2"
import ProjectForm from "./ProjectForm"
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addProject = async (data) => {
  const res = await axios.post(`${baseUrl}/api/project/addProject`, data)
  return res.data;
}

const AddProject = () => {
  const nav = useNavigate()
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      toast.success('Project added successfully!');
      queryClient.invalidateQueries(['project']);
      nav(-1);
    },
    onError: () => {
      toast.error('Failed to add project')
    },
  })

  const handleCreate = (data) => {
    mutation.mutate(data)
  }
  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow rounded-md">
        <p className="font-semibold text-lg text-blue-600">Add Project</p>
        <p className="text-sm text-zinc-800/90 flex items-center">Project <HiMiniSlash className="text-base" /> <span className="text-blue-500 ">Add Project</span></p>
      </div>

      <div className="py-6">
        <div className="bg-white rounded-lg">
          <ProjectForm onSubmit={handleCreate} loading={mutation.isPending} />
        </div>
      </div>
    </div>
  )
}
export default AddProject