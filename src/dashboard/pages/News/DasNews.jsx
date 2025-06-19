import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import NewsList from "./NewsList"
import axios from 'axios'
import { baseUrl } from "../../../utils/baseUrl"
import { useQuery } from "@tanstack/react-query"

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

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow rounded-md">
        <p className="text-sm text-blue-500 flex items-center">News</p>
        <div className="">
          <button onClick={() => nav('/dashboard/news/addnews')} className="bg-blue-500 text-white text-sm p-2 px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:bg-blue-600 transition-colors ease-in-out"><Plus size={16} />Add News</button>
        </div>
      </div>

      <div className="pt-5">
        <div className="w-full overflow-x-auto shadow-md rounded-lg border border-zinc-200">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-blue-100 text-zinc-700 text-sm uppercase">
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
                    <NewsList news={newsItem} key={newsItem._id} />
                  ))
                  : (
                    <tr><td className="px-6 py-4" colSpan={4}>{
                      isFetching ? 'Loading..' : 'No News Found.'
                    }</td></tr>
                  )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default DasNews