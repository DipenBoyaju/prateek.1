import axios from "axios"
import { HiMiniSlash } from "react-icons/hi2"
import { baseUrl } from "../../../../utils/baseUrl"
import SubProjectForm from "./SubProjectForm";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const fetchprojectBySlug = async (slug) => {
  const res = await axios.get(`${baseUrl}/api/subProject/getProjectBySlug/${slug}`);
  return res.data;
}

const updateProjectById = async ({ id, data }) => {
  const res = await axios.put(`${baseUrl}/api/subProject/updateProject/${id}`, data);
  return res.data;
}

const EditSubProject = () => {
  const { slug } = useParams();
  const nav = useNavigate()
  const queryClient = useQueryClient();

  const { data: project } = useQuery({
    queryKey: ['subProject', slug],
    queryFn: () => fetchprojectBySlug(slug),
    enabled: !!slug,
  })

  const mutation = useMutation({
    mutationFn: updateProjectById,
    onSuccess: () => {
      toast.success('Project updated')
      queryClient.invalidateQueries(['subProject', slug])
      nav(- 1)
    },
    onError: () => {
      toast.error('Failed to update project')
    },
  })

  const handleUpdate = (data) => {
    const id = project?._id;
    mutation.mutate({ id, data })
    console.log("Updating:", { id, data })
  }

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow rounded-md">
        <p className="font-semibold text-lg text-blue-600">Edit Project</p>
        <p className="text-sm text-zinc-800/90 flex items-center">Project<HiMiniSlash className="text-base" /> <span className="text-blue-500 ">Edit Project</span></p>
      </div>

      <div className="py-6">
        <div className="bg-white rounded-lg">
          <SubProjectForm onSubmit={handleUpdate} loading={mutation.isPending} defaultValues={project || {}}
            isEditMode />
        </div>
      </div>
    </div>
  )
}
export default EditSubProject