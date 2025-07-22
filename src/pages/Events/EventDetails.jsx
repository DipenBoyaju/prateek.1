import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { CalendarRange, CalendarX2, Clock, MapPin } from "lucide-react";

const getEventBySlug = async (slug) => {
  const res = await axios.get(`${baseUrl}/api/events/getEventBySlug/${slug}`);
  return res.data;
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (timeString) => {
  if (!timeString) return "-";
  const date = new Date(`1970-01-01T${timeString}:00`);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const EventDetails = () => {
  const { slug } = useParams();

  const { data: event, isLoading } = useQuery({
    queryFn: () => getEventBySlug(slug),
    queryKey: ["event", slug],
    enabled: !!slug,
  });

  if (isLoading)
    return (
      <p className="text-center py-20 text-xl text-gray-600">Loading event...</p>
    );

  return (
    <div>
      {/* Hero Section with new soft gradient */}
      <section
        className="w-full rounded-lg overflow-hidden shadow-lg mb-12 flex items-center px-8 md:px-16"
        style={{
          height: "400px",
          background:
            "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", // Blue to light teal
        }}
      >
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow">
            {event?.title}
          </h2>
          {/* <p className="mt-6 text-xl text-white/90 font-medium max-w-xl">
            {formatDate(event?.startDate)}
            {event?.endDate && ` - ${formatDate(event?.endDate)}`}
            {event?.location && ` • ${event.location}`}
          </p> */}
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl pb-10">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Sidebar with clean neutral background */}
          <aside className="md:sticky top-24 bg-blue-50 rounded-xl shadow-lg p-8 border border-blue-100 self-start">
            <div className="flex items-center justify-between pb-5 border-b border-zinc-800/20">
              <h3 className="text-lg md:text-2xl font-semibold text-blue-600">
                Event Details
              </h3>
              {event?.status && (
                <span
                  className={`text-xs uppercase font-bold px-3 py-1 rounded-full ${event.status === "upcoming"
                    ? "bg-green-100 text-green-700"
                    : event.status === "ended"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {event.status}
                </span>
              )}
            </div>

            <ul className="text-zinc-800 font-medium">
              <li className="flex items-center gap-5 py-4 border-b border-blue-100">
                <CalendarRange
                  size={36}
                  strokeWidth={1.5}
                  className="text-blue-600"
                  aria-label="Start Date Icon"
                />
                <div>
                  <p className="uppercase text-xs tracking-wider text-blue-600 font-semibold mb-1">
                    Start Date
                  </p>
                  <p className="font-light">{formatDate(event?.startDate)}</p>
                </div>
              </li>

              {event?.endDate && (
                <li className="flex items-center gap-5 py-4 border-b border-blue-100">
                  <CalendarX2 size={36}
                    strokeWidth={1.5}
                    className="text-blue-600"
                    aria-label="End Date Icon" />
                  <div>
                    <p className="uppercase text-xs tracking-wider text-blue-600 font-semibold mb-1">
                      End Date
                    </p>
                    <p className="font-light">{formatDate(event?.endDate)}</p>
                  </div>
                </li>
              )}

              <li className="flex items-center gap-5 py-4 border-b border-blue-100">
                <Clock
                  size={36}
                  strokeWidth={1.5}
                  className="text-blue-600"
                  aria-label="Time Icon"
                />
                <div>
                  <p className="uppercase text-xs tracking-wider text-blue-600 font-semibold mb-1">
                    Time
                  </p>
                  <p className="font-light">{formatTime(event?.time)}</p>
                </div>
              </li>

              {event?.location && (
                <li className="flex items-center gap-5 py-4">
                  <MapPin
                    size={36}
                    strokeWidth={1.5}
                    className="text-blue-600"
                    aria-label="Location Icon"
                  />
                  <div>
                    <p className="uppercase text-xs tracking-wider text-blue-600 font-semibold mb-1">
                      Location
                    </p>
                    <p className="font-light">{event.location}</p>
                  </div>
                </li>
              )}
            </ul>
          </aside>


          {/* Right side: image + description */}
          <section className="md:col-span-2 space-y-10">
            {event?.image && (
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src={event.image}
                  alt={event.title || "Event image"}
                  className="object-cover object-center w-full h-[60vh]"
                  loading="lazy"
                />
              </div>
            )}


            <article
              className="prose prose-blue max-w-5xl leading-relaxed font-light text-gray-800 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
              dangerouslySetInnerHTML={{ __html: event?.description }}
            />

            {/* Share This Event */}
            <div className="mt-16 border-t pt-8">
              <h4 className="text-xl font-semibold text-blue-900 mb-4">
                Share This Event
              </h4>
              <div className="flex items-center gap-6">
                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562V12h2.773l-.443 2.892h-2.33V21.88C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>

                {/* Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(event?.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-500 hover:text-sky-700 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1s-1.92.9-3.08 1.2a4.48 4.48 0 0 0-7.64 4.09 12.72 12.72 0 0 1-9.23-4.68 4.48 4.48 0 0 0 1.38 5.98A4.4 4.4 0 0 1 2 7.53v.05a4.48 4.48 0 0 0 3.6 4.4 4.52 4.52 0 0 1-2 .08 4.48 4.48 0 0 0 4.2 3.12A9 9 0 0 1 2 19.54a12.69 12.69 0 0 0 6.86 2" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.027-3.04-1.852-3.04-1.853 0-2.137 1.446-2.137 2.94v5.669h-3.554V9h3.414v1.561h.05c.476-.9 1.637-1.852 3.368-1.852 3.601 0 4.268 2.37 4.268 5.451v6.292zM5.337 7.433a2.062 2.062 0 1 1 .002-4.124 2.062 2.062 0 0 1-.002 4.124zM7.116 20.452H3.558V9h3.558v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.543C0 23.226.792 24 1.771 24h20.451C23.205 24 24 23.226 24 22.271V1.729C24 .774 23.205 0 22.225 0z" />
                  </svg>
                </a>
              </div>
            </div>

          </section>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
