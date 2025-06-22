import { HiMiniSlash } from "react-icons/hi2";
import EventForm from "../../components/EventForm";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const addEvent = async (data) => {
  const res = await axios.post(`${baseUrl}/api/events/addEvent`, data);
  return res.data;
}
const AddEvent = () => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      toast.success('News added successfully!');
      queryClient.invalidateQueries(['events']);
      nav(-1);
    },
    onError: () => {
      toast.error('Failed to add news')
    },
  })

  const handleCreate = async (data) => {
    await mutation.mutateAsync(data)
    nav('/dashboard/events')
  }

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow mx-4 mt-4 rounded-md">
        <p className="font-semibold text-lg text-blue-600">Add Event</p>
        <p className="text-sm text-zinc-800/90 flex items-center">
          Event <HiMiniSlash className="text-base" />{" "}
          <span className="text-blue-500 ">Add Event</span>
        </p>
      </div>

      <div className="px-5 py-8">
        <div className="bg-white rounded-lg">
          <EventForm
            onSubmit={handleCreate} loading={mutation.isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
