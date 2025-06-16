import { Plus } from "lucide-react"
import { HiMiniSlash } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"

const DasEvent = () => {
  const nav = useNavigate()
  return (
    <div>
      <div className="bg-white p-4 flex justify-between shadow rounded-md">
        <p className="text-sm text-blue-500 flex items-center">Events</p>
        <div className="">
          <button onClick={() => nav('/dashboard/events/addevent')} className="bg-blue-500 text-white text-sm p-2 px-4 rounded-sm tracking-wider flex items-center gap-1 font-quicksand cursor-pointer hover:bg-blue-600 transition-colors ease-in-out"><Plus size={16} />Add Event</button>
        </div>
      </div>
    </div>
  )
}
export default DasEvent