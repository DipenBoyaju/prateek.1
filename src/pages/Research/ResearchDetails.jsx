import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl.js";
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import Title from "../../components/Title.jsx";

const fetchResearchDetailBySlug = async (slug) => {
  const res = await axios(`${baseUrl}/api/division/slug/${slug}`);
  return res.data;
};


const ResearchDetails = () => {
  const { slug } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['researchDetail', slug],
    queryFn: () => fetchResearchDetailBySlug(slug),
    enabled: !!slug,
  });

  return (
    <div>
      <Title tag="Research Wing" title={data?.title} />
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="">
          <p className="text-lg font-light">
            {
              isLoading ? (
                <div className="space-y-2 animate-pulse">
                  <div className="w-full h-3 bg-zinc-300 rounded-full"></div>
                  <div className="w-full h-3 bg-zinc-300 rounded-full"></div>
                  <div className="w-1/2 h-3 bg-zinc-300 rounded-full"></div>
                </div>
              ) : (
                data?.description
              )
            }
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-10">
          <div className="col-span-2">
            <div className="relative border-b border-gray-300 mb-4">
              <h4 className="inline-block text-white text-xl font-semibold font-geist tracking-wide px-6 pr-15 py-3 bg-cyan-500 shadow-md clip-right-slant uppercase rounded-l-lg">
                Projects
              </h4>
            </div>

            <div className="flex flex-col gap-3">
              {
                data?.projects?.length > 0 ? (
                  data.projects.map((project, index) => (
                    <div
                      key={index}
                      className="block border-l-4 border-l-emerald-400 rounded shadow p-3 bg-emerald-500/10 border border-emerald-500/30 hover:scale-101 transition-all duration-300 ease-in-out"
                    >
                      <p className="tracking-wider text-lg">{project.name}</p>
                      <p className="text-sm font-light text-zinc-800/80">
                        <span className="uppercase font-medium">Year</span> - 2022
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No projects available</p>
                )
              }

            </div>
          </div>
          <div className="">
            <div className="relative border-b border-gray-300 mb-4">
              <h4 className="inline-block text-white text-xl font-semibold font-geist tracking-wide px-6 pr-15 py-3 bg-cyan-500 shadow-md clip-right-slant uppercase rounded-l-lg">
                Publications
              </h4>
            </div>
            <div className="">
              <p className="font-light">No Publications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ResearchDetails