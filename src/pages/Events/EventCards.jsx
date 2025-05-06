const EventCards = () => {
  return (
    <div className="grid grid-cols-5 gap-5 border-b border-zinc-800/10 pb-3 border-l">
      <div className="bg-cyan-300 size-14 md:size-16 flex flex-col text-white relative col-span-1">
        <div className="flex-1 flex items-center justify-center">
          <p className="md:text-4xl text-3xl font-bold font-quicksand">25</p>
        </div>
        <p className="text-xs bg-cyan-600 w-full text-center absolute bottom-0 font-semibold">Apr</p>
      </div>
      <div className="col-span-4 space-y-3">
        <h3 className="font-quicksand font-bold text-xl md:text-2xl text-zinc-800">AI Innovators Hackathon 2025: Building Intelligence for Impact</h3>
        <p className="font-light text-sm">Join developers, researchers, and changemakers for a 48-hour AI hackathon focused on solving real-world problems using artificial intelligence. Whether you're passionate about healthcare ...</p>
      </div>
    </div>
  )
}
export default EventCards