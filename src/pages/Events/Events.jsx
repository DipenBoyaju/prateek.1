import axios from "axios";
import NoContent from "../../components/NoContent"
import Title from "../../components/Title"
import EventCards from "./EventCards"
import { baseUrl } from "../../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { Mosaic } from 'react-loading-indicators'

const getAllEvents = async () => {
  const res = await axios.get(`${baseUrl}/api/events/getAllEvents`);
  return res.data;
};

const Events = () => {

  const { data, isLoading } = useQuery({
    queryFn: getAllEvents,
    queryKey: ['event'],
  })

  const events = Array.isArray(data) ? data : [];

  const publishedEvents = events.filter((e) => e.publish) || [];

  return (
    <div>
      <Title tag="Events" title="Latest Events" />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20">
        {
          isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Mosaic color="#0096FF" size="medium" text="" textColor="" />
            </div>
          ) : publishedEvents.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {publishedEvents.map((event) => (
                <EventCards key={event._id} event={event} />
              ))}
            </div>
          )
            : (
              <NoContent title="Events Coming Soon" sub="There are no events scheduled right now, but exciting ones are coming soon. Stay tuned!" />
            )
        }
      </div>
    </div>
  )
}
export default Events