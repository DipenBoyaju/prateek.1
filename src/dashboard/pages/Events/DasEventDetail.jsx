import axios from "axios"
import { baseUrl } from "../../../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Pen, Trash } from "lucide-react";

const getEventBySlug = async (slug) => {
  const res = await axios.get(`${baseUrl}/api/events/getEventBySlug/${slug}`);
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
  const nav = useNavigate();
  const { slug } = useParams();
  const { data: event, isPending } = useQuery({
    queryFn: () => getEventBySlug(slug),
    queryKey: ['event'],
    enabled: !!slug,
  })
  return (
    <div>
      <div className="flex justify-between items-center">
        <button className="text-sm bg-blue-500 text-white flex items-center gap-1 py-1 px-2 rounded-sm cursor-pointer" onClick={() => nav(-1)}><ArrowLeft size={14} />Back</button>
        <div className="flex items-center gap-2">
          <button onClick={() => nav('/dashboard/events/addevent')} className="bg-blue-500 text-white text-sm p-2 px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:bg-blue-600 transition-colors ease-in-out"><Pen size={16} />Edit</button>
          <button onClick={() => nav('/dashboard/events/addevent')} className="bg-red-400 text-white text-sm p-2 px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:bg-red-500 transition-colors ease-in-out"><Trash size={16} />Delete</button>
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
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: event?.description }} />
        </div>
      </div>
    </div>
  )
}
export default DasEventDetail