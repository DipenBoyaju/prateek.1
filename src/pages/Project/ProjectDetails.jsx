import { useParams } from "react-router-dom"
import Title from "../../components/Title"
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";
import ProjectLists from "./ProjectLists";

const getProjectBySlug = async (slug) => {
  const res = await axios.get(`${baseUrl}/api/project/getProjectBySlug/${slug}`)
  return res.data;
}

const getSubProjects = async (mainProjectId) => {
  const res = await axios.get(
    `${baseUrl}/api/subProject/getProjectsByMainId?mainProject=${mainProjectId}`
  );
  return res.data;
};

const ProjectDetails = () => {
  const { slug } = useParams();

  const { data: project } = useQuery({
    queryFn: () => getProjectBySlug(slug),
    queryKey: ['project', slug],
    enabled: !!slug,
  })

  const { data: subProjects = [], isLoading } = useQuery({
    queryKey: ["subProjects", project?._id],
    queryFn: () => getSubProjects(project?._id),
    enabled: !!project?._id,
  });

  return (
    <div>
      <Title tag="Project" title={project?.title} />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20 relative">

        <div className="pb-8">
          <h2 className="text-2xl font-bold font-quicksand uppercase text-cyan-400">Objective</h2>
          <p className="font-poppins pt-5 text-zinc-800/90 text-lg font-light">{project?.description}
          </p>
        </div>

        <div className="border-t border-b py-3 border-zinc-800/20">
          <p className="flex items-center gap-5 text-zinc-800/80"><span className="uppercase text-cyan-400">Division</span> <a href="/division/center-for-human-mobility-and-communications" className="cursor-pointer hover:underline hover:text-cyan-700" >{project?.division}</a></p>
        </div>


        {
          isLoading ? (
            <p>Loading Data</p>
          ) : subProjects?.length > 0 ? (
            <div className="pt-10 grid sm:grid-cols-2 gap-5">
              {
                subProjects?.map((subproject) => (
                  <ProjectLists key={subproject?._id} project={subproject} mainSlug={slug} />
                ))
              }
            </div>
          ) : (
            <p>No Projects</p>
          )

        }
      </div >
    </div >
  )
}
export default ProjectDetails