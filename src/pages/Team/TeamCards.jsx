import { FaLinkedin } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";
import { SiResearchgate } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { RiGlobalFill } from "react-icons/ri";

const TeamCards = ({ item }) => {
  const img = '/team/dimg.avif'
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg group">
      <div
        className="h-82 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${item.image ? item.image : img})`,
          filter: "grayscale(10%) brightness(90%)", backgroundPosition: "center center"
        }}
      >
        <div className="absolute inset-0 bg-[rgba(255,114,114,0.25)] mix-blend-multiply z-10"></div>
      </div>

      {/* Info Box */}
      <div className="absolute bottom-0 left-0 w-full p-4 text-white z-30 backdrop-blur-lg shadow-lg border-t border-white/20">
        <h3 className=" text-white font-semibold">{item.name}</h3>
        <p className="text-sm opacity-90">{item.role}</p>

        <div className="mt-2 flex items-center gap-3 text-sm">
          {item?.linkedin && (
            <a href={item.linkedin} className="text-white" target="_blank" rel="noreferrer">
              <FaLinkedin className="size-4 hover:text-zinc-200" />
            </a>
          )}
          {item.googleScholar && (
            <a href={item.googleScholar} target="_blank" rel="noreferrer">
              <FaGoogleScholar className="size-4 hover:text-zinc-200" />
            </a>
          )}
          {item.researchGate && (
            <a href={item.researchGate} target="_blank" rel="noreferrer">
              <SiResearchgate className="size-4 hover:text-zinc-200" />
            </a>
          )}
          {item.github && (
            <a href={item.github} target="_blank" rel="noreferrer">
              <FaGithub className="size-4 hover:text-zinc-200" />
            </a>
          )}
          {item.website && (
            <a href={item.github} target="_blank" rel="noreferrer">
              <RiGlobalFill className="size-4 hover:text-zinc-200" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCards