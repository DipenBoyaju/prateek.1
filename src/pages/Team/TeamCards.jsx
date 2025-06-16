import { FaLinkedin } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";
import { SiResearchgate } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { RiGlobalFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const TeamCards = ({ item }) => {
  const defaultImg = "/team/dimg.avif";

  return (
    <article className="relative rounded-xl overflow-hidden shadow-lg group">
      <Link to={`/team/${item.id}`} className="block">
        <img
          src={item.image || defaultImg}
          alt={item.name}
          className="w-full h-82 object-cover grayscale-[10%] brightness-[90%] rounded-t-xl"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[rgba(255,114,114,0.25)] mix-blend-multiply z-10 rounded-t-xl"></div>
      </Link>

      {/* Info Box */}
      <div className="absolute bottom-0 left-0 w-full p-4 text-white z-30 backdrop-blur-lg shadow-lg border-t border-white/20 rounded-b-xl">
        <h3 className="text-white font-semibold">{item.name}</h3>
        <p className="text-sm opacity-90">{item.role}</p>

        <div className="mt-2 flex items-center gap-3 text-sm">
          {item?.linkedin && (
            <a
              href={item.linkedin}
              aria-label="LinkedIn profile"
              className="text-white"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="size-4 hover:text-zinc-200" />
            </a>
          )}
          {item.googleScholar && (
            <a
              href={item.googleScholar}
              aria-label="Google Scholar profile"
              target="_blank"
              rel="noreferrer"
            >
              <FaGoogleScholar className="size-4 hover:text-zinc-200" />
            </a>
          )}
          {item.researchGate && (
            <a
              href={item.researchGate}
              aria-label="ResearchGate profile"
              target="_blank"
              rel="noreferrer"
            >
              <SiResearchgate className="size-4 hover:text-zinc-200" />
            </a>
          )}
          {item.github && (
            <a
              href={item.github}
              aria-label="GitHub profile"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="size-4 hover:text-zinc-200" />
            </a>
          )}
          {item.website && (
            <a
              href={item.website}
              aria-label="Personal website"
              target="_blank"
              rel="noreferrer"
            >
              <RiGlobalFill className="size-4 hover:text-zinc-200" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default TeamCards;
