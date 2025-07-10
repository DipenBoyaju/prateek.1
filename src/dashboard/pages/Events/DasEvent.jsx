import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EventList from "./EventList";
import axios from 'axios';
import { baseUrl } from "../../../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";

const getAllEvents = async () => {
  const res = await axios.get(`${baseUrl}/api/events/getAllEvents`);
  return res.data;
};

const DasEvent = () => {
  const nav = useNavigate();
  const { data: event, isPending } = useQuery({
    queryFn: getAllEvents,
    queryKey: ['events'],
  });

  return (
    <div className="">
      <div className="bg-white p-4 flex justify-between shadow rounded-md">
        <p className="text-sm text-blue-500 flex items-center">Events</p>
        <div>
          <button
            onClick={() => nav('/dashboard/events/addevent')}
            className="bg-blue-500 text-white text-xs md:text-sm p-2 px-2 md:px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:bg-blue-600 transition-colors ease-in-out"
          >
            <Plus size={16} />Add Event
          </button>
        </div>
      </div>
      <div className="pt-5 w-[310px] sm:w-[650px] md:w-full overflow-x-auto">
        <div className="min-w-[800px] md:w-full shadow-md rounded-lg border border-zinc-200">
          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-blue-100 text-zinc-700 text-sm uppercase">
              <tr className="border-l-4 border-blue-100">
                <th className="text-left px-6 py-4">Title</th>
                <th className="text-left px-6 py-4">Location</th>
                <th className="text-left px-6 py-4">Start Date</th>
                <th className="text-left px-6 py-4">End Date</th>
                <th className="text-left px-6 py-4">Time</th>
                <th className="text-left px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 text-sm divide-y divide-zinc-100">
              {event?.length ? (
                event?.map((eventItem) => (
                  <EventList event={eventItem} key={eventItem._id} />
                ))
              ) : (
                <tr>
                  {isPending ? (
                    <>
                      <td className="px-6 py-4">
                        <p className="bg-zinc-300 h-3 w-full rounded-full animate-pulse"></p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="bg-zinc-300 h-3 w-full rounded-full animate-pulse"></p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="bg-zinc-300 h-3 w-full rounded-full animate-pulse"></p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="bg-zinc-300 h-3 w-full rounded-full animate-pulse"></p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="bg-zinc-300 h-3 w-full rounded-full animate-pulse"></p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="bg-zinc-300 h-3 w-full rounded-full animate-pulse"></p>
                      </td>
                    </>
                  ) : (
                    <td className="px-6 py-4" colSpan={6}>No Events.</td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DasEvent;