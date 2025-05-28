const ResearchCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-gray-300 rounded-lg h-40 w-full p-5 flex flex-col gap-3">
      <div className="h-10 w-18 bg-zinc-400 rounded-full"></div>
      <div className="space-y-3">
        <div className="h-5 w-full bg-zinc-400 rounded-full"></div>
        <div className="h-5 w-2/3 bg-zinc-400 rounded-full"></div>
      </div>
    </div>
  )
}
export default ResearchCardSkeleton