import { Plus } from "lucide-react";
import DasTeamCard from "../../components/DasTeamCard";
import { HiMiniSlash } from "react-icons/hi2";
import { useTeamByDepartment } from "../../hooks/useTeam";
import { useNavigate } from "react-router-dom";

const DevelopmentTeam = () => {
  const nav = useNavigate()
  const { data: team } = useTeamByDepartment('Product Development');

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow rounded-md">
        <p className="text-sm text-zinc-800/90 flex items-center">Team <HiMiniSlash className="text-base" /> <span className="text-blue-500 ">Management</span></p>
        <div className="">
          <button onClick={() => nav('/dashboard/team/addmember')} className="bg-blue-500 text-white text-sm p-2 px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:bg-blue-600 transition-colors ease-in-out"><Plus size={16} />Add Member</button>
        </div>
      </div>
      <div className="py-6 grid md: grid-cols-4 gap-5">
        {
          team?.map((member) => (
            <DasTeamCard key={member?._id} member={member} />
          ))
        }
      </div>
    </div>
  )
}
export default DevelopmentTeam