
const AboutCard = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className="p-6 border rounded-md flex flex-col gap-4 bg-white shadow border-zinc-700/10">
      <span className={`${item.color} text-white w-fit p-1 rounded-md`}>
        <Icon strokeWidth={1} size={30} />
      </span>
      <h3 className="font-quicksand font-bold text-zinc-700 text-xl">{item.title}</h3>
      <p className="text-sm font-light text-zinc-500">{item.description}</p>
    </div>
  )
}
export default AboutCard