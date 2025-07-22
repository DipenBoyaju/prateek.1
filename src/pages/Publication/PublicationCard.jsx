import toast from "react-hot-toast";

const PublicationCard = ({ publicationitem }) => {
  return (
    <div
      onClick={() => {
        if (publicationitem.pdfUrl) {
          window.open(publicationitem.pdfUrl, '_blank');
        } else {
          toast.error("No PDF available");
        }
      }}
      className="flex items-stretch shadow-md border border-zinc-300 rounded bg-white w-full overflow-hidden cursor-pointer hover:shadow-lg transition"
    >
      {/* Left vertical tag */}
      <div className="bg-emerald-500 text-white font-semibold px-4 flex items-center justify-center">
        <p className="text-xl uppercase">{publicationitem.code}</p>
      </div>

      {/* Right content area */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="border-b border-zinc-900/20 pb-1 px-4 pt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium ">
              {publicationitem.year}
              {publicationitem.divisionSymbol && `, ${publicationitem.divisionSymbol}`}
            </p>
          </div>
          <p className="text-lg font-semibold text-zinc-800 leading-snug pl-4 py-2">
            {publicationitem.title}
          </p>
        </div>

        {/* Bottom: authors list and conference */}
        <div>
          <ul className="flex flex-wrap gap-x-4 text-sm font-medium text-gray-600 pl-4 mt-8">
            {publicationitem.authors.map((author, idx) => (
              <li key={idx}>{author.name}</li>
            ))}
          </ul>
          <p className="text-sm pl-4 py-3 bg-emerald-300 text-white mt-2">
            {publicationitem.conference}
          </p>
        </div>
      </div>
    </div >
  );
};
export default PublicationCard;
