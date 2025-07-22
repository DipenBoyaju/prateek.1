import axios from "axios"
import { baseUrl } from "../../../utils/baseUrl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Pen, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

const getEventBySlug = async (slug) => {
  const res = await axios.get(`${baseUrl}/api/events/getEventBySlug/${slug}`);
  return res.data;
}

const deleteEventById = async (id) => {
  const res = await axios.delete(`${baseUrl}/api/events/delete/${id}`);
  return res.data;
};

const publishStatus = async ({ id, publish }) => {
  const res = await axios.patch(`${baseUrl}/api/events/publishStatus/${id}`, { publish });
  return res.data;
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatTime = (timeString) => {
  const date = new Date(`1970-01-01T${timeString}:00`) // Convert time to Date object
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

const DasEventDetail = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const nav = useNavigate();
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const { data: event, isLoading } = useQuery({
    queryFn: () => getEventBySlug(slug),
    queryKey: ['event'],
    enabled: !!slug,
  })

  const mutation = useMutation({
    mutationFn: deleteEventById,
    onSuccess: () => {
      console.log('Invalidating events query...');
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event deleted!');
    },
    onError: (error) => {
      toast.error('Failed to delete event: ' + error.message);
    },
  });

  const publishMutation = useMutation({
    mutationFn: publishStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event'] });
      toast.success('Publish status updated!');
    },
    onError: (error) => {
      toast.error('Failed to update publish status: ' + error.message);
    },
  });

  const handleDelete = () => {
    mutation.mutate(event._id);
    nav('/dashboard/events')
  }

  if (isLoading) return <p>Loading Event</p>

  return (
    <div>
      <div className="flex justify-between items-center">
        <button className="text-sm bg-blue-500 text-white flex items-center gap-1 py-1 px-2 rounded-sm cursor-pointer" onClick={() => nav(-1)}><ArrowLeft size={14} />Back</button>
        <div className="flex items-center gap-2">
          <button onClick={() => {
            publishMutation.mutate({ id: event._id, publish: !event.publish });
          }} className={`${event?.publish ? 'bg-zinc-500' : 'bg-emerald-500'} text-white text-sm p-2 px-2 md:px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:emerald-blue-600 transition-colors ease-in-out`}>{event?.publish ? 'Published' : 'Publish'}</button>
          <button onClick={() => nav(`/dashboard/events/updateEvent/${slug}`)} className="bg-blue-500 text-white text-sm p-2 px-2 md:px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:bg-blue-600 transition-colors ease-in-out"><Pen size={16} /><span className="hidden md:block">Edit</span></button>
          <button onClick={() => setShowPopup(true)} className="bg-red-400 text-white text-sm p-2 px-2 md:px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:bg-red-500 transition-colors ease-in-out"><Trash size={16} /><span className="hidden md:block">Delete</span></button>
        </div>
      </div>
      <div className="mt-5 bg-white p-5 rounded-lg h-full">
        <div className="">
          <h3 className="text-xl tracking-wider font-semibold text-zinc-800">{event?.title}</h3>
        </div>
        <div className="flex items-center gap-6 mt-3 border-b border-blue-300 pb-3">
          <div className="flex text-sm gap-2">
            <p className="text-sm flex items-center gap-1"><Calendar size={15} />{formatDate(event?.startDate)}</p>
            {
              event?.endDate && <p className="text-sm flex items-center gap-1"> - <Calendar size={15} />{formatDate(event?.endDate)}</p>
            }
          </div>
          <div className="">
            <p className="text-sm flex items-center gap-1"><Clock size={15} />{formatTime(event?.time)}</p>
          </div>
        </div>
        <div className="mt-5">
          <div className="prose max-w-none">
            <div
              className="[&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
              dangerouslySetInnerHTML={{ __html: event?.description }}
            />
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold text-zinc-800 mb-3">
              Confirm Deletion
            </h2>
            <p className="text-zinc-600 mb-5">
              Are you sure you want to delete this news?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-zinc-300 text-zinc-800 px-4 py-2 rounded-sm hover:bg-zinc-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-4 py-2 text-white rounded-sm transition ${isDeleting
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
                  }`}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default DasEventDetail