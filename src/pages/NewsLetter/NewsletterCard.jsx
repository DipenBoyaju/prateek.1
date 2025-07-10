const NewsletterCard = ({ newsletter }) => {
  return (
    <a href={newsletter.fileUrl}
      target="_blank"
      rel="noopener noreferrer" className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ring-1 ring-blue-800/20 bg-zinc-50">
      {/* Cover image with increased height */}
      <img
        className="w-full h-64 md:h-84 object-cover"
        src={newsletter.coverUrl}
        alt={newsletter.title}
      />

      <div className="px-6 py-6 bg-blue-50 h-full">
        {/* Title */}
        <h3 className="font-bold text-lg md:text-xl mb-3 text-zinc-800   leading-snug">
          {newsletter.title}
        </h3>

        {/* Link as plain text, styled for clarity */}
      </div>
    </a>
  );
};

export default NewsletterCard;
