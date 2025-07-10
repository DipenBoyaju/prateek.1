import { Link } from "react-router-dom"

const ProjectLists = ({ project, mainSlug }) => {

  return (
    <Link
      to={`/projects/${mainSlug}/${project?.slug}`}
      className="block border-l-4 border-l-emerald-400 rounded shadow p-3 bg-emerald-500/10 border border-emerald-500/30 hover:scale-101 transition-all duration-300 ease-in-out"
    >
      <p className="tracking-wider text-lg">{project?.title}</p>
      <p className="text-sm font-light text-zinc-800/80">
        <span className="uppercase font-medium">Year</span> - 2022
      </p>
    </Link>
  )
}
export default ProjectLists