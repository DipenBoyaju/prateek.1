import { HiMiniSlash } from "react-icons/hi2"
import SubProjectForm from "./SubProjectForm"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../../../../utils/baseUrl.js"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

const addProject = async (data) => {
  const res = await axios.post(`${baseUrl}/api/subProject/addProject`, data)
  return res.data;
}

const getMainProjectBySlug = async (mainSlug) => {
  const res = await axios.get(`${baseUrl}/api/project/getProjectBySlug/${mainSlug}`)
  return res.data;
}

const AddSubProject = () => {
  const { mainSlug } = useParams();
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const { data: mainProjectData } = useQuery({
    queryKey: ['mainProject', mainSlug],
    queryFn: () => getMainProjectBySlug(mainSlug),
    enabled: !!mainSlug,
  });


  const mutation = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      toast.success('Project added successfully!');
      queryClient.invalidateQueries(['subproject']);
      nav(-1);
    },
    onError: () => {
      toast.error('Failed to add project')
    },
  })

  const handleCreate = (data) => {
    mutation.mutate({
      ...data,
      mainProject: mainProjectData?._id
    })
  }

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow rounded-md">
        <p className="font-semibold text-lg text-blue-600">Add Project</p>
        <p className="text-sm text-zinc-800/90 flex items-center">Project<HiMiniSlash className="text-base" /> <span className="text-blue-500 ">Add Project</span></p>
      </div>

      <div className="py-6">
        <div className="bg-white rounded-lg">
          <SubProjectForm onSubmit={handleCreate} loading={mutation.isPending} />
        </div>
      </div>
    </div>
  )
}
export default AddSubProject