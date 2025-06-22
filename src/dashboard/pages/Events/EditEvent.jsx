import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { HiMiniSlash } from "react-icons/hi2";
import EventForm from "../../components/EventForm";

const fetchEventBySlug = async (slug) => {
  const res = await axios.get(`${baseUrl}/api/events/getEventBySlug/${slug}`)
  return res.data
}

const updateEventById = async ({ id, data }) => {
  const res = await axios.put(`${baseUrl}/api/events/updateEvent/${id}`, data);
  return res.data;
}

const EditEvent = () => {
  const { slug } = useParams();
  console.log("editpage", slug)
  const nav = useNavigate()
  const queryClient = useQueryClient();

  const { data: event } = useQuery({
    queryKey: ['events', slug],
    queryFn: () => fetchEventBySlug(slug),
    enabled: !!slug,
  })

  const mutation = useMutation({
    mutationFn: updateEventById,
    onSuccess: () => {
      toast.success('News updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['events'] }); // Invalidate event list
      queryClient.invalidateQueries({ queryKey: ['events', slug] }); // Invalidate single event
      nav(- 1)
    },
    onError: () => {
      toast.error('Failed to update news')
    },
  })

  const handleUpdate = async (data) => {
    const id = event?._id;
    await mutation.mutateAsync({ id, data })
  }

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow mx-4 mt-4 rounded-md">
        <p className="font-semibold text-lg text-blue-600">Edit Event</p>
        <p className="text-sm text-zinc-800/90 flex items-center">Event <HiMiniSlash className="text-base" /> <span className="text-blue-500 ">Add Event</span></p>
      </div>
      <div className="px-5 py-8">
        <div className="bg-white rounded-lg">
          <EventForm onSubmit={handleUpdate}
            defaultValues={event || {}}
            isEditMode
            loading={mutation.isLoading} />
        </div>
      </div>
    </div>
  )
}
export default EditEvent