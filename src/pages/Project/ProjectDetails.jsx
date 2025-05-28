import { Link } from "react-router-dom"
import PartnerOrganizationCard from "../../components/PartnerOrganizationCard"
import Title from "../../components/Title"
import { CornerDownRight, CornerRightDown } from 'lucide-react'

const ProjectDetails = () => {
  return (
    <div>
      <Title tag="Project" title="Inclusive Real time Sign Language Translation Platform" />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20 relative">

        <div className="pb-8">
          <h2 className="text-2xl font-bold font-quicksand uppercase text-purple-500">Objective</h2>
          <p className="font-poppins pt-5 text-zinc-800/90 text-lg font-light">Our Sign Language project bridges the communication gap between hearing and non-hearing communities through AI-powered real-time translation. We have started with Nepali Sign Language gradually aiming to connect with other versions. By converting Nepali Sign Language to speech and vice versa, the platform enables seamless interaction across web, mobile, and wearable devices like smart glasses. Designed in close collaboration with the Deaf community, it combines gesture recognition, speech processing, and emotion-aware avatars to ensure natural, accessible, and inclusive communication for all.
          </p>
        </div>

        <div className="border-t border-b py-3 border-zinc-800/20">
          <p className="flex items-center gap-5 text-zinc-800/80"><span className="uppercase text-purple-500">Division</span> Center for Human Mobility and Communications</p>
        </div>

        <div className="">
          <a href="/projects/signlanguage/wordbase">Word base</a>
        </div>
      </div >
    </div >
  )
}
export default ProjectDetails