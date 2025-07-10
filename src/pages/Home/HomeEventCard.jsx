import { CalendarRange, Clock, Map } from "lucide-react";
import { Link } from "react-router-dom";

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

const HomeEventCard = ({ event }) => {
  const truncateText = (htmlString, maxLength) => {
    const plainText = htmlString.replace(/<[^>]+>/g, "");
    if (plainText.length <= maxLength) return plainText;
    return plainText.slice(0, maxLength) + "...";
  };

  return (
    <Link
      to={event?.slug ? `/event/${event.slug}` : '#'}
      className="block bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="grid md:grid-cols-5">
        {/* Image */}
        <div className="md:col-span-2 relative h-48 md:h-full">
          {event?.image ? (
            <img
              src={event.image}
              alt={event.title || "Event image"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-500 text-sm">
              No Image Available
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="md:col-span-3 p-5 flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <h4 className="text-xl md:text-2xl font-bold text-zinc-800">
              {event?.title}
            </h4>
            <p className="text-sm text-zinc-600">
              {truncateText(event?.description, 120) ||
                "No description available"}
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-2 text-sm text-zinc-700">
              <CalendarRange size={18} className="text-cyan-600" />
              <span>
                {formatDate(event?.startDate)}
                {event?.endDate ? ` - ${formatDate(event.endDate)}` : ""}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-700">
              <Clock size={18} className="text-cyan-600" />
              <span>{formatTime(event?.time)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-700">
              <Map size={18} className="text-cyan-600" />
              <span>{event?.location || "TBA"}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeEventCard;
