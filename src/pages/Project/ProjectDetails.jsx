import { Link, useNavigation } from "react-router-dom"
import Title from "../../components/Title"

const ProjectDetails = () => {
  const nav = useNavigation()
  return (
    <div>
      <Title tag="Project" title="Inclusive Real time Sign Language Translation Platform" />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20 relative">

        <div className="pb-8">
          <h2 className="text-2xl font-bold font-quicksand uppercase text-cyan-400">Objective</h2>
          <p className="font-poppins pt-5 text-zinc-800/90 text-lg font-light">Our Sign Language project bridges the communication gap between hearing and non-hearing communities through AI-powered real-time translation. We have started with Nepali Sign Language gradually aiming to connect with other versions. By converting Nepali Sign Language to speech and vice versa, the platform enables seamless interaction across web, mobile, and wearable devices like smart glasses. Designed in close collaboration with the Deaf community, it combines gesture recognition, speech processing, and emotion-aware avatars to ensure natural, accessible, and inclusive communication for all.
          </p>
        </div>

        <div className="border-t border-b py-3 border-zinc-800/20">
          <p className="flex items-center gap-5 text-zinc-800/80"><span className="uppercase text-cyan-400">Division</span> <a href="/division/center-for-human-mobility-and-communications" className="cursor-pointer hover:underline hover:text-cyan-700" >Center for Human Mobility and Communications</a></p>
        </div>

        <div className="pt-10 grid sm:grid-cols-2 gap-5">
          <Link
            to='/projects/signlanguage/wordbase'
            className="block border-l-4 border-l-emerald-400 rounded shadow p-3 bg-emerald-500/10 border border-emerald-500/30 hover:scale-101 transition-all duration-300 ease-in-out"
          >
            <p className="tracking-wider text-lg">Word Based Nepali Sign Language</p>
            <p className="text-sm font-light text-zinc-800/80">
              <span className="uppercase font-medium">Year</span> - 2022
            </p>
          </Link>
        </div>
      </div >
    </div >
  )
}
export default ProjectDetails