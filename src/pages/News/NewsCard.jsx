const NewsCard = () => {
  return (
    <div className="grid md:grid-cols-12 items-center border-b border-zinc-800/20 gap-y-2 md:gap-y-0 pb-3 border-l">
      <div className="bg-cyan-300 size-14 md:size-16 flex flex-col text-white relative">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-2xl md:text-4xl font-bold font-quicksand">21</p>
        </div>
        <p className="text-xs bg-cyan-600 w-full text-center absolute bottom-0 font-semibold">Jan</p>
      </div>

      <div className="md:col-span-4 pl-3 md:pl-0">
        <h1 className="text-base md:text-lg font-semibold text-zinc-700">AI Breakthroughs: Weekly Roundup of Innovations & Impacts</h1>
      </div>
      <div className="md:col-span-6 pl-3 md:pl-0">
        <p className="text-sm text-zinc-500 font-light">Stay updated with the latest in artificial intelligence — from groundbreaking research and product launches to policy updates and ethical debates shaping the future of AI.</p>
      </div>
    </div>
  )
}
export default NewsCard