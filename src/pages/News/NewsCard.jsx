const NewsCard = ({ news, onClick }) => {
  const formatDate = (dateString) => {
    if (!dateString) return { day: '--', month: '--' };
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    return { day, month };
  };

  const { day, month } = formatDate(news?.createdAt);

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-4 border border-zinc-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white cursor-pointer"
    >
      {/* ✅ Responsive Date Badge */}
      <div className="flex flex-col items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-md bg-cyan-500 text-white flex-shrink-0">
        <p className="text-lg md:text-2xl font-bold">{day}</p>
        <p className="text-[10px] md:text-xs uppercase">{month}</p>
      </div>

      {/* ✅ Content */}
      <div className="flex flex-col overflow-hidden">
        <h2 className="text-base md:text-lg font-semibold text-zinc-800">
          {news.title}
        </h2>
        <p className="text-sm text-zinc-500 mt-1 line-clamp-2">
          {news.description}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
