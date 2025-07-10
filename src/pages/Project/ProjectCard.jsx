import { Link } from 'react-router-dom'

const ProjectCard = ({ project }) => {
  return (
    <div className='shadow relative rounded-lg overflow-hidden border-4 border-cyan-100'>
      <div className="absolute w-full h-32 bg-cyan-500 -z-10 top-0"></div>
      <div className="flex flex-col p-8 backdrop-blur-2xl">
        <h2 className="font-quicksand font-bold text-xl md:text-2xl text-white">{project?.title}</h2>
        <p className="text-zinc-800 pt-6">{project?.description.slice(0, 120)}..</p>
        <div className="w-full mt-20">
          <Link to={`/projects/${project?.slug}`} className="uppercase rounded-full py-3 md:py-5 px-6 md:px-10 cursor-pointer hover:shadow-xl text-white font-quicksand font-semibold md:text-white hover:bg-cyan-300  transition-all duration-500 ease-in-out hover:text-primary hover:px-9 md:mt-10 bg-cyan-300 text-center w-full block">Learn More</Link>
        </div>
      </div>
    </div>
  )
}
export default ProjectCard