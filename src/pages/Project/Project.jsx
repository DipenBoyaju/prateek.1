import Title from "../../components/Title"
import ProjectCard from "./ProjectCard"

const Project = () => {

  return (
    <div>
      <Title tag="Project" title="Our Projects" />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          <ProjectCard />
        </div>
      </div>
    </div>
  )
}
export default Project