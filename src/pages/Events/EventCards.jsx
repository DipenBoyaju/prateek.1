import { Link } from 'react-router-dom';

const EventCards = ({ event }) => {
  const truncateText = (htmlString, maxLength) => {
    const plainText = htmlString.replace(/<[^>]+>/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.slice(0, maxLength) + '...';
  };

  const formatDate = (dateString) => {
    if (!dateString) return { day: '--', month: '--' };
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    return { day, month };
  };

  const { day, month } = formatDate(event?.startDate);

  return (
    <Link
      to={event?.slug ? `/event/${event.slug}` : '#'}
      aria-label={`View details for ${event?.title || 'event'}`}
      className="group relative block max-w-sm mx-auto rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {/* Image Section */}
      <div className="relative rounded-t-xl overflow-hidden">
        {event?.image ? (
          <>
            <img
              src={event.image}
              alt={`Poster for ${event.title} event`}
              className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </>
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-300 rounded-t-xl flex items-center justify-center text-gray-500 text-lg font-semibold">
            No Image Available
          </div>
        )}
        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white rounded-lg px-3 py-2 flex flex-col justify-center items-center shadow-md transition-transform duration-300 group-hover:scale-110">
          <span className="text-lg font-bold leading-none">{day}</span>
          <span className="text-xs uppercase tracking-wider mt-1">{month}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative bg-white rounded-b-xl px-6 py-5">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          {event?.title || 'Untitled Event'}
        </h3>
        <p className="mt-2 text-sm text-gray-600 font-light line-clamp-3">
          {truncateText(event?.description, 120) || 'No description available'}
        </p>
      </div>
    </Link>
  );
};

export default EventCards;
