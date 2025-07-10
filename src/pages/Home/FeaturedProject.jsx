import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { Mosaic } from "react-loading-indicators";

const fetchAllProject = async () => {
  const res = await axios.get(`${baseUrl}/api/project/getAllProjects`);
  return res.data;
}

const FeaturedProject = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['project'],
    queryFn: fetchAllProject,
  })

  return (
    <div className="py-10 md:py-20 relative overflow-hidden">
      <img src="/images/shapes/bg.png" alt="" className="absolute left-0 top-0 opacity-20 h-full w-full object-cover" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h3 className="font-quicksand font-bold tracking-wide uppercase text-3xl md:text-4xl text-cyan-400">
            Featured Projects
          </h3>
          <p className="text-zinc-600 mt-2 text-base md:text-lg">
            Explore our ongoing research and innovative solutions.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            isLoading ? (
              <Mosaic color="#0096FF" size="medium" text="" textColor="" />
            ) : projects?.length > 0 ?
              projects?.map((project) => (
                <div className="bg-white shadow-lg border border-zinc-200 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300" key={project?._id}>
                  <h4 className="text-xl font-semibold text-cyan-500 mb-2">{project?.title}</h4>
                  <p className="text-zinc-700 text-sm">
                    {project?.description.slice(0, 110)}...
                  </p>
                  <a href={`/projects/${project?.slug}`} className="inline-block hover:underline bg-zinc-800 text-white text-sm py-2 px-4 rounded-md mt-10">
                    Learn More →
                  </a>
                </div>
              )) : (
                <div className="bg-white shadow-md text-center mx-auto flex items-center justify-center flex-col p-8 border border-zinc-800/20 rounded-sm md:col-start-2">
                  <p className="text-xl font-semibold text-zinc-800">
                    Projects Coming Soon
                  </p>
                  <p className="text-sm pt-5 text-zinc-500">
                    We're working on some insightful projects for you. Stay tuned for updates, stories, and more!
                  </p>
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}
export default FeaturedProject