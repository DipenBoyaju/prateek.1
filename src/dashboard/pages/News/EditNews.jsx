import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { baseUrl } from '../../../utils/baseUrl'
import toast from "react-hot-toast"
import { HiMiniSlash } from "react-icons/hi2"
import NewsForm from "../../components/NewsForm"

const fetchNewsBySlug = async (slug) => {
  const res = await axios.get(`${baseUrl}/api/news/getNewsBySlug/${slug}`)
  return res.data
}

const updateNewsById = async ({ id, data }) => {
  const res = await axios.put(`${baseUrl}/api/news/updateNews/${id}`, data);
  return res.data;
}


const EditNews = () => {
  const { slug } = useParams();
  const nav = useNavigate()
  const queryClient = useQueryClient();

  const { data: news } = useQuery({
    queryKey: ['news', slug],
    queryFn: () => fetchNewsBySlug(slug),
    enabled: !!slug,
  })

  const mutation = useMutation({
    mutationFn: updateNewsById,
    onSuccess: () => {
      toast.success('News updated successfully!')
      queryClient.invalidateQueries(['news', slug])
      nav(- 1)
    },
    onError: () => {
      toast.error('Failed to update news')
    },
  })

  const handleUpdate = (data) => {
    const id = news?._id;
    mutation.mutate({ id, data })
    nav(-1)
  }

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow md:mx-4 md:mt-4 rounded-md">
        <p className="font-semibold md:text-lg text-blue-600">Edit News</p>
        <p className="text-xs md:text-sm text-zinc-800/90 flex items-center">
          News <HiMiniSlash className="text-base" /> <span className="text-blue-500">Edit News</span>
        </p>
      </div>

      <div className="md:px-5 py-4 md:py-8">
        <div className="bg-white rounded-lg">
          <NewsForm
            onSubmit={handleUpdate}
            defaultValues={news || {}}
            isEditMode
            loading={mutation.isLoading}
          />
        </div>
      </div>
    </div>
  )
}
export default EditNews