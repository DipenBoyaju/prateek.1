import { CalendarRange, Clock, Map } from "lucide-react"

const HomeEventCard = () => {
  return (
    <div className="bg-white shadow-md p-6 rounded-md border-2 border-zinc-800/10">
      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-2">
          <div className="w-full h-[35vh] md:h-full bg-zinc-200"></div>
        </div>
        <div className="md:col-span-3">
          <div className="flex flex-col gap-5">
            <h4 className="font-quicksand font-bold text-xl text-zinc-800 pt-3">Help for Language. Volunteer</h4>
            <p className="text-sm text-zinc-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos in, aliquam maiores ut iure quod?</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <CalendarRange strokeWidth={1} className="text-cyan-600" size={20} />
                <p className="text-sm text-zinc-700">Jan 30, 2020 - 10:00 am</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock strokeWidth={1} className="text-cyan-600" size={20} />
                <p className="text-sm text-zinc-700">10:00 AM - 18:00 PM</p>
              </div>
              <div className="flex items-center gap-3">
                <Map strokeWidth={1} className="text-cyan-600" size={20} />
                <p className="text-sm text-zinc-700">Jan 30, 2020 - 10:00 am</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomeEventCard