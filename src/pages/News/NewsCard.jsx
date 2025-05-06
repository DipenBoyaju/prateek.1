const NewsCard = () => {
  return (
    <div className="grid grid-cols-12 items-center border-b border-zinc-800/20">
      <div className="bg-cyan-300 size-16 flex flex-col text-white relative">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-4xl font-bold font-quicksand">21</p>
        </div>
        <p className="text-xs bg-cyan-600 w-full text-center absolute bottom-0 font-semibold">Jan</p>
      </div>

      <div className="col-span-4">
        <h1 className="text-lg font-semibold text-zinc-700">AI Breakthroughs: Weekly Roundup of Innovations & Impacts</h1>
      </div>
      <div className="col-span-6">
        <p className="text-sm text-zinc-500 font-light">Stay updated with the latest in artificial intelligence — from groundbreaking research and product launches to policy updates and ethical debates shaping the future of AI.</p>
      </div>
    </div>
  )
}
export default NewsCard