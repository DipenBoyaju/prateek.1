import { useState } from "react"
import { Plus } from "lucide-react"
import DashboardEventCard from "../../components/DashboardEventCard"
import AddEventForm from "../../components/AddEventForm"

const DashboardEvents = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold text-zinc-800 flex items-center">All Events</p>

        <button
          onClick={() => setShowModal(true)}
          className="bg-cyan-500 text-white text-sm p-1 px-2 rounded-sm flex items-center gap-1 cursor-pointer hover:bg-cyan-400"
        >
          <Plus size={20} /> Add Event
        </button>
      </div>

      <div className="mt-5">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          <DashboardEventCard />
          <DashboardEventCard />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <AddEventForm closeModal={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardEvents
