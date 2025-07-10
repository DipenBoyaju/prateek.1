import axios from "axios";
import Title from "../../components/Title"
import ProjectCard from "./ProjectCard"
import { baseUrl } from "../../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";

const fetchAllProject = async () => {
  const res = await axios.get(`${baseUrl}/api/project/getAllProjects`);
  return res.data;
}

const Project = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['project'],
    queryFn: fetchAllProject,
  })


  return (
    <div>
      <Title tag="Project" title="Our Projects" />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20">
        {
          isLoading ? (
            <p>Project Loading</p>
          ) : projects?.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
              {
                projects?.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                )
                )}
            </div>
          ) : (
            <p>No Projects</p>
          )
        }

      </div>
    </div>
  )
}
export default Project