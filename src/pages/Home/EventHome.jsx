import HomeEventCard from "./HomeEventCard"

const EventHome = () => {
  return (
    <div className="py-20 relative">
      <img src="/shape2.png" alt="" className="absolute right-0 bottom-0 h-full" />
      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <div className="text-center">
          <p className="text-cyan-300 font-quicksand font-bold text-lg">Events</p>
          <h3 className="font-quicksand font-bold tracking-wide uppercase text-4xl pt-7">Upcoming Events</h3>
          <p className="text-zinc-800/50 pt-2 text-sm">Follow Us and know more about our events and news</p>
        </div>
        <div className="grid md:grid-cols-2 pt-10 gap-10">
          <HomeEventCard />
          <HomeEventCard />
        </div>
      </div>
    </div>
  )
}
export default EventHome