const ResearchCard = ({ item }) => {
  return (
    <div>
      <div className="bg-zinc-500 w-full h-[40vh]"></div>
      <div className="pt-6">
        <h2 className="text-2xl font-quicksand font-bold">{item.title}</h2>
        <p className="pt-4 text-lightGray">{item.description}</p>
      </div>
    </div>
  )
}
export default ResearchCard