import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom"
import PublicationLCard from "./PublicationLCard";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl.js";
import { useQuery } from "@tanstack/react-query";

const getPublication = async () => {
  const res = await axios.get(`${baseUrl}/api/publication/getAllPublication`)
  return res.data.data;
}

const DasPublication = () => {
  const nav = useNavigate();

  const { data, isLoading } = useQuery({
    queryFn: getPublication,
    queryKey: ['publication']
  })

  return (
    <div>
      <div className="bg-white p-4 flex justify-between items-center shadow rounded-md">
        <p className="md:text-lg font-semibold text-blue-600">Publications</p>
        <button
          onClick={() => nav("/dashboard/publications/addPublication")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm px-2 md:px-4 py-2 rounded-md flex items-center gap-1 transition cursor-pointer"
        >
          <Plus className="size-4 md:size-5" /> Add Publication
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
        {
          isLoading ? (
            <div className="w-full bg-white p-5 rounded-md ring ring-zinc-800/10">
              <div className="w-30 h-2 bg-zinc-400 rounded-full animate-pulse"></div>
              <div className="w-full h-4 bg-zinc-400 rounded-full mt-8 animate-pulse"></div>
              <div className="w-[80%] h-4 bg-zinc-400 rounded-full mt-1 animate-pulse"></div>
              <div className="w-[60%] h-4 bg-zinc-400 rounded-full mt-1 animate-pulse"></div>
              <div className="w-full h-5 bg-zinc-400 rounded-full mt-10 animate-pulse"></div>
            </div>
          ) : data?.length ? (
            data.map((item) => (
              <PublicationLCard publication={item} key={item._id} />
            ))
          ) : (
            <p>No Publications</p>
          )
        }
      </div>
    </div>
  )
}
export default DasPublication