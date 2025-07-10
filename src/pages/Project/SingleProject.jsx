import { Link, useParams } from "react-router-dom"
import PartnerOrganizationCard from "../../components/PartnerOrganizationCard"
import Title from "../../components/Title"
import { CornerDownRight, CornerRightDown } from 'lucide-react'
import axios from "axios"
import { baseUrl } from "../../utils/baseUrl"
import { useQuery } from "@tanstack/react-query"

const getSubProjectBySlug = async (slug) => {
  const res = await axios.get(`${baseUrl}/api/subProject/getProjectBySlug/${slug}`
  );
  return res.data;
}

const SingleProject = () => {
  const { slug } = useParams();

  const { data: project } = useQuery({
    queryFn: () => getSubProjectBySlug(slug),
    queryKey: ['subProject'],
    enabled: !!slug
  })

  return (
    <div>
      <Title tag="Project" title={project?.title} />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20 relative">
        <div className="absolute -top-5 md:right-10 animate-bounce">
          {/* <Link to="/signlanguageplatform" className="bg-orange-500 p-4 md:p-5 px-10 md:px-18 rounded-full font-bold font-quicksand uppercase text-base md:text-xl tracking-wider text-white shadow-lg flex items-center gap-6">Try Demo <CornerDownRight strokeWidth={2.5} /></Link> */}
        </div>

        <div className="grid md:grid-cols-6 gap-8">
          <div className="md:col-span-4 ">
            <div className="">
              <div className=" mt-5 border-b border-zinc-800/20 pb-5">
                <h3 className="text-xl font-semibold text-purple-500">{project?.title}</h3>
                <p className="font-light mt-3">{project?.description}</p>
              </div>
              <div className="flex gap-4 items-center mt-5">
                <p className="text-xl font-semibold uppercase text-purple-400">Project Details</p>
                <CornerRightDown className="animate-bounce" />
              </div>
              <div className="my-4 border-t border-b py-3 border-zinc-800/20">
                <p className="flex items-center gap-5 text-zinc-800/80"><span className="uppercase text-purple-500">Division</span> <a href="/division/center-for-human-mobility-and-communications" className="cursor-pointer hover:underline hover:text-cyan-700" >{project?.division}</a></p>
              </div>
              <div className="grid grid-cols-3 mt-5 border-b border-zinc-800/20 pb-5">
                <div className="">
                  <h5 className="uppercase text-purple-500 pb-2">Year</h5>
                  <p>2022</p>
                </div>
                <div className="">
                  <h5 className="uppercase text-purple-500 pb-2">Team</h5>
                  <div className="space-y-2">
                    {
                      project?.teamMember?.map((team, index) => (
                        <p key={index} className="capitalize">{team.name}</p>
                      ))
                    }
                  </div>
                </div>
                <div className="">
                  <h5 className="uppercase text-purple-500 pb-2">Dataset</h5>
                  <a href={project?.datasetLink} target="_blank" className="underline">Dataset Link</a>
                </div>
              </div>
            </div>

          </div>
          <div className="md:col-span-2">
            <div className=" rounded-xl overflow-hidden">
              <h4 className="bg-purple-500 py-2 px-3 text-lg font-semibold text-white">Partner Organizations</h4>
              <div className="flex flex-col gap-3">

                {
                  project?.partnerOrganization?.map((org, index) => (
                    <PartnerOrganizationCard name={org?.name} address={org?.address} image={org?.logo} key={index} />
                  ))
                }
              </div>
            </div>
            <div className=" mt-10">
              <img src={project?.image} alt="" />
            </div>
          </div>
        </div>


      </div >
    </div >
  )
}
export default SingleProject