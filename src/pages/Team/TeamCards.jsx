import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const TeamCards = ({ item }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg group w-72">
      <div
        className="h-82 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${item.image})`,
          filter: "grayscale(10%) brightness(90%)", backgroundPosition: "center center"
        }}
      >
        <div className="absolute inset-0 bg-[rgba(255,114,114,0.25)] mix-blend-multiply z-10"></div>
      </div>

      {/* Info Box */}
      <div className="absolute bottom-0 left-0 w-full p-4 text-white z-30 backdrop-blur-lg shadow-lg border-t border-white/20">
        <h3 className=" text-white font-semibold">{item.name}</h3>
        <p className="text-sm opacity-90">{item.role}</p>

        <div className="mt-2 flex gap-3 text-sm">
          {item?.linkedin && (
            <a href={item.linkedin} className="text-white" target="_blank" rel="noreferrer">
              <FaLinkedin className="size-4 hover:text-zinc-200" />
            </a>
          )}
          {item.twitter && (
            <a href={item.twitter} target="_blank" rel="noreferrer">
              <FaXTwitter className="size-4 hover:text-zinc-200" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCards