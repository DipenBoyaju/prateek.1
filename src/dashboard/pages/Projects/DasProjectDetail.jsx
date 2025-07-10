import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import { baseUrl } from "../../../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";
import SubProjectList from "./SubProject/SubProjectList";

const getProjectBySlug = async (slug) => {
  const res = await axios.get(`${baseUrl}/api/project/getProjectBySlug/${slug}`)
  return res.data;
}

const DasProjectDetail = () => {
  const nav = useNavigate()
  const { slug } = useParams();

  const { data: project, isLoading } = useQuery({
    queryFn: () => getProjectBySlug(slug),
    queryKey: ['project', slug],
    enabled: !!slug,
  })

  return (
    <div className="bg-white p-5 rounded-sm">

      <div className="">
        <h2 className="font-semibold text-xl md:text-3xl text-blue-600 pb-2 border-b border-zinc-800/20">{project?.title}</h2>
        <p className="font-quicksand pt-4 text-sm md:text-base">{project?.description}</p>
      </div>

      <div className="mt-10">
        <div className="flex justify-between items-center w-full bg-blue-600 rounded-sm p-2">
          <h4 className="text-sm md:text-xl font-quicksand font-semibold text-white">Projects List</h4>
          <div className="">
            <button className="text-xs md:text-sm bg-white p-2 rounded-sm px-2 md:px-4 cursor-pointer shadow-sm text-blue-600 uppercase font-semibold" onClick={() => nav(`/dashboard/project/${project?.slug}/addProject`)}>Add Project</button>
          </div>
        </div>

        <div className="mt-5">
          <SubProjectList mainSlug={project?.slug} mainProjectId={project?._id} />
        </div>
      </div>
    </div>
  )
}
export default DasProjectDetail