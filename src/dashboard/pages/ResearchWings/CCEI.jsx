import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronRight } from "lucide-react"
import { baseUrl } from "../../../utils/baseUrl";

const fetchResearchData = async () => {
  const res = await axios(`${baseUrl}/api/allResearch`);
  return res.data
}
const CCEI = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['research'],
    queryFn: fetchResearchData,
  });

  if (isLoading) {
    return <p>Loading research info...</p>;
  }

  if (isError) {
    return <p>Failed to load research info.</p>;
  }
  return (
    <div>
      <div className="">
        <p className="text-sm text-zinc-800/40 flex items-center">Research Wing <ChevronRight strokeWidth={1.5} size={16} /> <span className="text-cyan-300">CCEI</span></p>
        <button></button>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-semibold">{data[1].title}</h1>
        <p className="pt-3 font-poppins">{data[1].description}</p>
      </div>
    </div>
  )
}
export default CCEI