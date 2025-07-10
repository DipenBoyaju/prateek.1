import axios from "axios"
import ProjectForm from "./ProjectForm"
import { baseUrl } from "../../../utils/baseUrl"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { HiMiniSlash } from "react-icons/hi2"

const fetchProjectBySlug = async (slug) => {
  const res = await axios.get(`${baseUrl}/api/project/getProjectBySlug/${slug}`)
  return res.data
}

const updateProjectById = async ({ id, data }) => {
  const res = await axios.put(`${baseUrl}/api/project/updateProject/${id}`, data);
  return res.data;
}

const EditProject = () => {
  const { slug } = useParams();
  const nav = useNavigate()
  const queryClient = useQueryClient();

  const { data: project } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => fetchProjectBySlug(slug),
    enabled: !!slug,
  })

  const mutation = useMutation({
    mutationFn: updateProjectById,
    onSuccess: () => {
      toast.success('Project updated successfully!')
      queryClient.invalidateQueries(['project', slug])
      nav(- 1)
    },
    onError: () => {
      toast.error('Failed to update project')
    },
  })

  const handleUpdate = (data) => {
    const id = project?._id;
    mutation.mutate({ id, data })
  }

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow rounded-md">
        <p className="font-semibold text-lg text-blue-600">Edit News</p>
        <p className="text-sm text-zinc-800/90 flex items-center">
          Project <HiMiniSlash className="text-base" /> <span className="text-blue-500">Edit Project</span>
        </p>
      </div>

      <div className="py-6">
        <div className="bg-white rounded-lg">
          <ProjectForm
            onSubmit={handleUpdate}
            defaultValues={project || {}}
            isEditMode
            loading={mutation.isPending}
          />
        </div>
      </div>
    </div>
  )
}
export default EditProject