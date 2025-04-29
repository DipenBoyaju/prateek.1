const BlogNewsCard = () => {
  return (
    <div className="p-5 backdrop-blur-3xl rounded-md shadow-lg border border-zinc-800/10">
      <div className="w-full h-[35vh] bg-zinc-400"></div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center pt-4">
          <p className="font-quicksand font-semibold">Author Name</p>
          <p className="text-sm text-zinc-500">Apr 18, 2025</p>
        </div>
        <div className="space-y-3">
          <p className="text-xl">Why Consistent Brand Identity is Key to Business Success</p>
          <p className="text-sm text-zinc-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus libero sequi maiores voluptatum distinctio...</p>
        </div>
        <div className="">
          <button className="rounded-full py-3 px-10 cursor-pointer bg-cyan-300 text-sm font-quicksand font-semibold text-white hover:bg-cyan-300  transition-all duration-500 ease-in-out">Read More</button>
        </div>
      </div>
    </div>
  )
}
export default BlogNewsCard