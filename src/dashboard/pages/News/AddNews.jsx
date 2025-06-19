import { HiMiniSlash } from "react-icons/hi2"
import NewsForm from "../../components/NewsForm"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { baseUrl } from "../../../utils/baseUrl"
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom"

const createNews = async (data) => {
  const res = await axios.post(`${baseUrl}/api/news/createNews`, data)
  return res.data;
}

const AddNews = () => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      toast.success('News added successfully!');
      queryClient.invalidateQueries(['news']);
      nav(-1);
    },
    onError: () => {
      toast.error('Failed to add news')
    },
  })

  const handleCreate = (data) => {
    mutation.mutate(data)
  }

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow mx-4 mt-4 rounded-md">
        <p className="font-semibold text-lg text-blue-600">Add News</p>
        <p className="text-sm text-zinc-800/90 flex items-center">News <HiMiniSlash className="text-base" /> <span className="text-blue-500 ">Add News</span></p>
      </div>

      <div className="px-5 py-8">
        <div className="bg-white rounded-lg">
          <NewsForm onSubmit={handleCreate} loading={mutation.isLoading} />
        </div>
      </div>
    </div>
  )
}
export default AddNews