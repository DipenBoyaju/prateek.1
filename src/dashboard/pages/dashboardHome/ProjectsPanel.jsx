import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";

const getAllSubProjects = async () => {
  const res = await axios.get(`${baseUrl}/api/subProject/getAllProjects`);
  return res.data;
}

const ProjectsPanel = () => {

  const { data: projects, isLoading } = useQuery({
    queryKey: ['subProject'],
    queryFn: getAllSubProjects
  });


  return (
    <div className="col-span-3 lg:col-span-2 bg-white shadow-md rounded-2xl pb-5">
      <h3 className="text-xl font-semibold text-blue-600 mb-5 px-6 pt-6">Recent Projects</h3>
      <ul className="space-y-4 text-sm text-gray-800 max-h-[60vh] overflow-auto px-6">

        {
          isLoading ? (
            <li className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:shadow transition space-y-3">
              <div className='w-full bg-zinc-400 h-3 rounded-full animate-pulse'></div>
              <div className="flex justify-between items-center">
                <div className="w-[5vw] bg-blue-200 h-2 rounded-full animate-pulse"></div>
              </div>
            </li>
          ) : projects?.data?.length > 0 ?
            projects?.data?.slice(0, 5).map((project) => (
              <li key={project._id} className="flex items-start justify-between bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow transition">
                <div className="flex items-start gap-3">
                  <div>
                    <p className="leading-snug md:text-lg font-semibold">{project?.title}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-indigo-500 text-white`}>
                      {project.divisionSymbol}
                    </span>
                  </div>
                </div>
              </li>
            )) : (
              <p>No Projects</p>
            )}
      </ul>
    </div>
  )
}
export default ProjectsPanel