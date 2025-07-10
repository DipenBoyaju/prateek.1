import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import NewsList from "./NewsList"
import axios from 'axios'
import { baseUrl } from "../../../utils/baseUrl"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import toast from 'react-hot-toast'

const fetchNews = async () => {
  const res = await axios.get(`${baseUrl}/api/news/getAllNews`);
  return res.data
}

const DasNews = () => {
  const nav = useNavigate()
  const { data: news, isFetching } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews
  })

  const [showPopup, setShowPopup] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const handleConfirmDelete = (id) => {
    setDeletingId(id);
    setShowPopup(true);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`${baseUrl}/api/news/deleteNews/${deletingId}`);
      toast.success("News deleted successfully!");
      queryClient.invalidateQueries(["news"]);
    } catch (err) {
      toast.error("Failed to delete news");
      console.error(err);
    } finally {
      setIsDeleting(false);
      setShowPopup(false);
    }
  };

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow rounded-md">
        <p className="text-sm text-blue-500 flex items-center">News</p>
        <div className="">
          <button onClick={() => nav('/dashboard/news/addnews')} className="bg-blue-500 text-white text-xs md:text-sm p-2 px-2 md:px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:bg-blue-600 transition-colors ease-in-out"><Plus size={16} />Add News</button>
        </div>
      </div>

      <div className="pt-5 w-[310px] overflow-x-auto sm:w-[650px] md:w-full">
        <div className="min-w-[800px] shadow-md rounded-lg border border-zinc-200">
          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-blue-100 text-zinc-700 text-sm uppercase border-l-4 border-blue-100">
              <tr>
                <th className="text-left px-6 py-4">Title</th>
                <th className="text-left px-6 py-4">Date</th>
                <th className="text-left px-6 py-4">Time</th>
                <th className="text-left px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 text-sm divide-y divide-zinc-100">
              {
                news?.length ?
                  news.map((newsItem) => (
                    <NewsList news={newsItem} key={newsItem._id} onDeleteClick={handleConfirmDelete} />
                  ))
                  : (
                    <tr>
                      {isFetching ?
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
                        </> :
                        <td className="px-6 py-4" colSpan={4}>No News Found</td>
                      }
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold text-zinc-800 mb-3">
              Confirm Deletion
            </h2>
            <p className="text-zinc-600 mb-5">
              Are you sure you want to delete this news?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-zinc-300 text-zinc-800 px-4 py-2 rounded-sm hover:bg-zinc-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-4 py-2 text-white rounded-sm transition ${isDeleting
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
                  }`}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default DasNews