const ResearchCard = ({ item, index }) => {
  return (
    <div>
      {/* <div className="bg-zinc-500 w-full h-[40vh]"></div> */}
      <span className="border border-cyan-500 rounded-full px-5 py-1 text-cyan-500 tracking-widest">0{index + 1}</span>
      <div className="pt-6">
        <h2 className="text-2xl font-quicksand font-bold">{item.title}</h2>
        <p className="pt-4 text-lightGray">{item.description}</p>
      </div>
    </div>
  )
}
export default ResearchCard