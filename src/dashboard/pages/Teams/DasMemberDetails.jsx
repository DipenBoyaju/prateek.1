import axios from "axios"
import { HiMiniSlash } from "react-icons/hi2"
import { useNavigate, useParams } from "react-router-dom"
import { baseUrl } from "../../../utils/baseUrl"
import { useQuery } from "@tanstack/react-query"
import { Pencil, Trash } from "lucide-react"
import { useState } from "react"
import DeleteConfirmPopUp from "../../components/DeleteConfirmPopUp"

const divisionColors = {
  CHMC: "bg-blue-500",
  CCEI: "bg-emerald-500",
  CCCT: "bg-purple-500",
  CIIATC: "bg-yellow-500",
};

const getMemberDetails = async ({ slug }) => {
  const res = await axios.get(`${baseUrl}/api/team/member/${slug}`);
  return res.data;
};

const DasMemberDetails = () => {
  const { slug, department } = useParams();
  const nav = useNavigate()
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const { data: member } = useQuery({
    queryKey: ["memberDetails", slug],
    queryFn: () => getMemberDetails({ slug }),
    enabled: !!slug,
  });

  const colorClass = divisionColors[member?.divisionSymbol] || "bg-gray-400";

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow md:mx-4 md:mt-4 rounded-md">
        <p className=" text-xs md:text-sm text-zinc-800/90 flex items-center">Team <HiMiniSlash className="text-base" /> <span className="text-blue-500 ">{department}</span></p>
        <div className="flex items-center gap-3">
          <button onClick={() => nav(`/dashboard/team/editMember/${slug}`)} className="bg-blue-500 text-white text-sm p-2 px-2 md:px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:bg-blue-600 transition-colors ease-in-out"><Pencil size={16} /><span className="md:block hidden">Edit</span></button>
          <button onClick={() => setShowConfirmPopup("true")} className="bg-red-400 text-white text-sm p-2 px-2 md:px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:bg-red-500 transition-colors ease-in-out"><Trash size={16} /><span className="hidden md:block">Delete</span></button>
        </div>
      </div>
      {
        showConfirmPopup && <DeleteConfirmPopUp id={member?._id} setShowConfirmPopup={setShowConfirmPopup} />
      }
      <div className="px-4 py-4 md:py-6 bg-white my-6 md:mx-4 rounded-lg">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 rounded-lg overflow-hidden md:h-[50vh]">
            <div className="relative">
              <img src={member?.image} alt="" className="object-cover h-full w-full" />
              {
                member?.category === 'Intern' && <span className="absolute z-20 top-0 left-0 text-sm bg-blue-600 text-white px-4 py-1 rounded-br-xl font-quicksand">{member?.category}</span>
              }
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-3xl font-quicksand font-bold tracking-wider text-zinc-800">{member?.name}</h3>
            <p className="text-blue-600 text-sm">{member?.designation}</p>
            {
              member?.division && <p className="pt-2 font-semibold text-zinc-800 border-b pb-3 border-zinc-800/20">Division <span className={`${colorClass} px-2 py-1 rounded-sm text-white ml-2`}> {member?.division}</span></p>
            }
            <div className="">
              <p className="font-semibold text-zinc-800 pt-2 text-lg">Bio</p>
              <p className="font-light text-justify md:text-left">{member?.bio}</p>
            </div>
            <div className="mt-5">
              <div className="flex gap-2">
                {Object.entries(member?.socials || {}).map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-2 py-1 rounded-sm text-white ${key === "linkedin" ? "bg-[#0a66c2]" :
                      key === "googleScholar" ? "bg-[#3367bd]" :
                        key === "website" ? "bg-gray-800" : key === "github" ? "bg-[#24292E]" : key === "researchGate" ? "bg-[#2ec5a6]" :
                          "bg-gray-400"
                      }`}
                  >
                    {key === "googleScholar" ? "Google Scholar" : key.charAt(0).toUpperCase() + key.slice(1)}
                  </a>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
export default DasMemberDetails