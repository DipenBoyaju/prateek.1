import { Link } from "react-router-dom"
import PartnerOrganizationCard from "../../components/PartnerOrganizationCard"
import Title from "../../components/Title"
import { CornerDownRight, CornerRightDown } from 'lucide-react'

const ProjectDetails = () => {
  return (
    <div>
      <Title tag="Project" title="Inclusive Real time Sign Language Translation Platform" />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20 relative">
        <div className="absolute -top-5 right-10 animate-bounce">
          <Link to="/signlanguageplatform" className="bg-orange-500 p-5 px-18 rounded-full font-bold font-quicksand uppercase text-xl tracking-wider text-white shadow-lg flex items-center gap-6">Try Demo <CornerDownRight strokeWidth={2.5} /></Link>
        </div>

        <div className="grid grid-cols-6 gap-8">
          <div className="col-span-4 ">
            <div className="">
              <div className="shadow rounded-xl overflow-hidden border border-zinc-800/20">
                <img src="/images/signlanguage.png" alt="" className="hover:scale-105 transition-all duration-300 ease-linear" />
              </div>
              <div className="flex gap-4 items-center mt-5">
                <p className="text-xl font-semibold uppercase text-purple-400">Project Details</p>
                <CornerRightDown className="animate-bounce" />
              </div>
              <div className="my-4 border-t border-b py-3 border-zinc-800/20">
                <p className="flex items-center gap-5 text-zinc-800/80"><span className="uppercase text-purple-500">Division</span> Center for Human Mobility and Communications</p>
              </div>
              <div className="grid grid-cols-3 mt-5 border-b border-zinc-800/20 pb-5">
                <div className="">
                  <h5 className="uppercase text-purple-500 pb-2">Year</h5>
                  <p>2022</p>
                </div>
                <div className="">
                  <h5 className="uppercase text-purple-500 pb-2">Team</h5>
                  <div className="space-y-2">
                    <p>Jatin Bhusal</p>
                    <p>Dipen Boyaju</p>
                    <p>Sonia Dhaubhadel</p>
                    <p>Nir Ratna Shakya</p>
                  </div>
                </div>
                <div className="">
                  <h5 className="uppercase text-purple-500 pb-2">Dataset</h5>
                  <a href="https://www.kaggle.com/datasets/jatinbhusal/word-based-nepali-sign-language" target="_blank" className="underline">Dataset Link</a>
                </div>
              </div>
            </div>

            <div className="border-b pb-8 border-zinc-800/20 mt-5">
              <h2 className="text-2xl font-bold font-quicksand uppercase">Objective</h2>
              <p className="font-poppins pt-5 text-zinc-800/90 text-lg font-light">Our Sign Language project bridges the communication gap between hearing and non-hearing communities through AI-powered real-time translation. We have started with Nepali Sign Language gradually aiming to connect with other versions. By converting Nepali Sign Language to speech and vice versa, the platform enables seamless interaction across web, mobile, and wearable devices like smart glasses. Designed in close collaboration with the Deaf community, it combines gesture recognition, speech processing, and emotion-aware avatars to ensure natural, accessible, and inclusive communication for all.
              </p>
            </div>
          </div>
          <div className="col-span-2">
            <h3 className="text-xl font-semibold text-purple-500">Word Based Nepali Sign Language Dataset</h3>
            <p className="font-light mt-3">We created a first word based Nepali Sign Language Dataset that consisted of 4 words: Namaste (Hello), Dhanyabaad (Thank you), Ghar (House) and Ma (me), each word consisting of 5000 unique signed images. </p>
            <div className=" rounded-xl overflow-hidden mt-5">
              <h4 className="bg-purple-500 py-2 px-3 text-lg font-semibold text-white">Partner Organizations</h4>
              <div className="flex flex-col gap-3">
                <PartnerOrganizationCard name="National Deaf federation of Nepal" address="Ranibari Marg, Kathmandu" image="/images/NDFN-Logo.png" />
                <PartnerOrganizationCard name="Kavre Deaf School" address="" image="" />
                <PartnerOrganizationCard name="Vidhya Sagar English Secondary School" address="" image="/images/VidhyaSagar_logo.png" />
                <PartnerOrganizationCard name="Khwopa Engineering College" address="Libali, Bhaktapur - 8, Nepal" image="/images/KhEC_Logo.png" />
                <PartnerOrganizationCard name="Community Based Rehabilitation Organization, Bhaktapur" address="" image="" />
              </div>
            </div>
            <div className=" mt-10">
              <img src="/images/signlanguageteam.png" alt="" />
            </div>
          </div>
        </div>


      </div >
    </div >
  )
}
export default ProjectDetails