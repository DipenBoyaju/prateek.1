import { Facebook, Instagram, Linkedin } from "lucide-react";
import HomeEventCard from "./HomeEventCard"
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { Mosaic } from "react-loading-indicators";

const getAllEvents = async () => {
  const res = await axios.get(`${baseUrl}/api/events/getAllEvents`);
  return res.data;
};

const EventHome = () => {
  const { data, isLoading } = useQuery({
    queryFn: getAllEvents,
    queryKey: ['event'],
  })

  const events = Array.isArray(data) ? data : [];

  const publishedEvents = events.filter((e) => e.publish) || [];
  return (
    <div className="py-20 relative">
      <img src="/images/shapes/shape2.png" alt="" className="hidden md:block md:absolute right-0 bottom-0 md:h-full" />
      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <div className="text-center">
          <p className="text-cyan-300 font-quicksand font-bold text-lg">Events</p>
          <h3 className="font-quicksand font-bold tracking-wide uppercase text-3xl md:text-4xl pt-3 md:pt-7">Upcoming Events</h3>
          <p className="text-zinc-800/50 md:pt-2 text-sm">Follow Us and know more about our events and news</p>
        </div>
        {
          isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Mosaic color="#0096FF" size="medium" text="" textColor="" />
            </div>
          ) : publishedEvents.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-x-6 gap-y-10 pt-5">
              {publishedEvents.slice(0, 2).map((event) => (
                <HomeEventCard key={event._id} event={event} />
              ))}
            </div>
          )
            : (
              <div className="pt-10 flex justify-center">
                <div className="bg-white shadow-md border border-zinc-200 rounded-xl px-6 py-10 text-center text-zinc-500 max-w-xl w-full">
                  <div className="pt-10 text-center text-zinc-500 flex flex-col items-center gap-4">
                    <div className="text-6xl animate-bounce">📅</div>
                    <p className="text-xl md:text-2xl font-semibold text-zinc-700">
                      Events Coming Soon
                    </p>
                    <p className="text-sm md:text-base text-zinc-500 max-w-md">
                      We’re currently cooking up something amazing! Check back soon or follow us to stay in the loop.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 justify-center">
                    <p className="font-semibold text-cyan-400">Follow for Updates</p>
                    <div className="flex items-center gap-2 border-l pl-3">
                      <a href="https://www.facebook.com/profile.php?id=100091857246327&_rdr" target="_blank"><Facebook strokeWidth={1.5} size={20} /></a>

                      <a href="https://www.linkedin.com/company/prateek-innovations/" target="_blank"><Linkedin strokeWidth={1.5} size={20} /></a>
                    </div>
                  </div>
                </div>
              </div>
            )
        }
      </div>
    </div>
  )
}
export default EventHome