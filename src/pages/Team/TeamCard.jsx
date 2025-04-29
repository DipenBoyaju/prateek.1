const TeamCard = ({ item }) => {
  return (
    <div className="shadow-xl relative">
      <img src={item.image} alt="" className="w-full" />
      <div className="absolute bottom-0 p-2 backdrop-blur-xl pr-20">
        <h4 className="font-quicksand font-bold text-xl">{item.name}</h4>
        <p className="text-zinc-800">{item.role}</p>
      </div>
    </div>
  )
}
export default TeamCard