import { useParams } from "react-router-dom"
import Title from "../../components/Title"
import teamList from "../../utils/teamList";
import { FaLinkedin } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";
import { SiResearchgate } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { RiGlobalFill } from "react-icons/ri";

const MemberDetail = () => {
  const { id } = useParams();
  const member = teamList.find(item => item.id === Number(id));

  return (
    <div>
      <Title tag="Team" title={member.department} />
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <div className="w-full h-[60vh] bg-zinc-400 overflow-hidden rounded-md shadow-sm">
              <img src={member.image} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="">
              <h2 className="font-poppins font-semibold tracking-wider text-xl md:text-3xl md:pt-5 text-zinc-800">{member?.name}</h2>
              <p className="font-quicksand font-medium text-zinc-900/60 mt-2 text-lg">{member.role}</p>

              <div className="mt-3 flex members-center gap-3 text-sm border-t border-b py-3 border-zinc-800/30">
                {member?.linkedin && (
                  <a
                    href={member.linkedin}
                    aria-label="LinkedIn profile"
                    className="text-[#0a66c2]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin className="size-5 hover:text-zinc-800 transition-colors ease-in-out" />
                  </a>
                )}
                {member.googleScholar && (
                  <a
                    href={member.googleScholar}
                    aria-label="Google Scholar profile"
                    target="_blank"
                    className="text-[#3367bd]"
                    rel="noreferrer"
                  >
                    <FaGoogleScholar className="size-5 hover:text-zinc-800 transition-colors ease-in-out" />
                  </a>
                )}
                {member.researchGate && (
                  <a
                    href={member.researchGate}
                    aria-label="ResearchGate profile"
                    target="_blank"
                    className="text-[#2ec5a6]"
                    rel="noreferrer"
                  >
                    <SiResearchgate className="size-5 hover:text-zinc-800 transition-colors ease-in-out" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    aria-label="GitHub profile"
                    target="_blank"
                    className="text-[#24292E]"
                    rel="noreferrer"
                  >
                    <FaGithub className="size-5 hover:text-zinc-800 transition-colors ease-in-out" />
                  </a>
                )}
                {member.website && (
                  <a
                    href={member.website}
                    aria-label="Personal website"
                    className="text-[#d014ff]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <RiGlobalFill className="size-5 hover:text-zinc-800 transition-colors ease-in-out" />
                  </a>
                )}
              </div>

              <p className="font-quicksand text-lg pt-5">{member.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MemberDetail