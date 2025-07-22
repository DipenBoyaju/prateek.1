import { AlignJustify, Grid2x2, Plus } from "lucide-react";
import DasTeamCard from "../../components/DasTeamCard";
import { HiMiniSlash } from "react-icons/hi2";
import { useTeamByDepartment } from "../../hooks/useTeam";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DasTeamList from "../../components/DasTeamList";

const DevelopmentTeam = () => {
  const [cardLayout, setCardLayout] = useState(true)
  const nav = useNavigate()
  const { data: team } = useTeamByDepartment('Product Development');

  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow rounded-md">
        <p className="text-sm text-zinc-800/90 flex items-center">Team <HiMiniSlash className="text-base" /> <span className="text-blue-500 ">Development</span></p>
        <div className="">
          <button onClick={() => nav('/dashboard/team/addmember')} className="bg-blue-500 text-white text-xs md:text-sm p-2 px-2 md:px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:bg-blue-600 transition-colors ease-in-out"><Plus size={16} />Add Member</button>
        </div>
      </div>
      <div className="py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold font-quicksand text-blue-600">Team Members</h2>
        {
          team?.length > 0 && (
            <div className="flex items-center bg-white">
              <button
                className={`${cardLayout ? 'bg-blue-500 rounded-sm text-white' : 'bg-transparent text-zinc-800'
                  } p-1.5 cursor-pointer`}
                onClick={() => setCardLayout(true)}
              >
                <Grid2x2 size={20} />
              </button>
              <button
                className={`${!cardLayout ? 'bg-blue-500 rounded-sm text-white' : 'bg-transparent text-zinc-800'
                  } p-1.5 cursor-pointer`}
                onClick={() => setCardLayout(false)}
              >
                <AlignJustify size={18} />
              </button>
            </div>
          )
        }
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        {
          cardLayout ? (
            team?.map((member) => (
              <DasTeamCard key={member?._id} member={member} />
            ))
          ) : (
            <div className="col-span-full overflow-x-auto">
              <div className="min-w-[1000px] divide-y divide-zinc-200 bg-white rounded-2xl shadow-xl ring-1 ring-zinc-200">
                <table className="min-w-full divide-y divide-zinc-200">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-zinc-600 text-left">S.No</th>
                      <th className="px-6 py-4 text-sm font-semibold text-zinc-600 text-left">Photo</th>
                      <th className="px-6 py-4 text-sm font-semibold text-zinc-600 text-left">
                        Name
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-zinc-600 text-left">Designation</th>
                      <th className="px-6 py-4 text-sm font-semibold text-zinc-600 text-left">Division</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {
                      team?.map((member, index) => (
                        <DasTeamList key={member?._id} member={member} index={index} />
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
export default DevelopmentTeam