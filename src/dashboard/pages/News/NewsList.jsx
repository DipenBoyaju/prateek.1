import { Eye, Pen, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewsList = ({ news, onDeleteClick }) => {
  const nav = useNavigate();

  const createdAtDate = news?.updatedAt ? new Date(news.updatedAt) : new Date(news.createdAt);

  const formattedDate = createdAtDate
    ? createdAtDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    : "";

  const formattedTime = createdAtDate
    ? createdAtDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    : "";

  return (
    <>
      <tr className="hover:bg-zinc-50 transition duration-150">
        <td className="px-6 py-4 font-semibold">{news?.title}</td>
        <td className="px-6 py-4">{formattedDate}</td>
        <td className="px-6 py-4">{formattedTime}</td>
        <td className="px-6 py-4 flex gap-1">
          <button onClick={() => nav(`/dashboard/news/${news?.slug}`)} className="bg-zinc-800 p-2 rounded-sm text-white cursor-pointer">
            <Eye size={16} />
          </button>
          <button
            onClick={() => nav(`/dashboard/news/editnews/${news?.slug}`)}
            className="bg-emerald-500 p-2 rounded-sm text-white cursor-pointer"
          >
            <Pen size={16} />
          </button>
          <button
            onClick={() => onDeleteClick(news._id)}
            className="bg-red-500 p-2 rounded-sm text-white cursor-pointer"
          >
            <Trash size={16} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default NewsList;
