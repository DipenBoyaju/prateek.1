import { CalendarDays, Clock3, MapPinCheckInside, PenLine, Trash } from "lucide-react"

const DashboardEventCard = () => {
  return (
    <div className="p-5 bg-white">
      <div className="w-full h-[200px] bg-zinc-500">
        <div className="flex flex-col gap-1">
          <button className="bg-emerald-400 text-white p-2 rounded-sm w-fit cursor-pointer hover:bg-emerald-500"><PenLine strokeWidth={1.5} /></button>
          <button className="bg-red-400 text-white p-2 rounded-sm w-fit cursor-pointer hover:bg-red-500"><Trash strokeWidth={1.5} /></button>
        </div>
      </div>
      <div className=" py-4">
        <h3 className="text-lg font-semibold">TechNova 2025</h3>
        <p className="text-base line-clamp-2">A one-day technology summit showcasing the latest innovations in AI, cloud computing, and web development. Keynote speeches, startup pitches, and networking sessions.</p>
      </div>
      <ul>
        <li className="flex items-center gap-1"><CalendarDays size={15} strokeWidth={1.5} /> June 14, 2025</li>
        <li className="flex items-center gap-1"><Clock3 size={15} strokeWidth={1.5} /> 10:00 AM – 5:00 PM</li>
        <li className="flex items-center gap-1"><MapPinCheckInside size={15} strokeWidth={1.5} /> Kathmandu Convention Center</li>
      </ul>
    </div>
  )
}
export default DashboardEventCard