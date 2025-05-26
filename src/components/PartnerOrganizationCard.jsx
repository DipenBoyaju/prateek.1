const PartnerOrganizationCard = ({ name, address, image }) => {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-800/10 pb-2 shadow p-3">
      <img src={image} alt="" className="size-18 rounded-full shadow border border-zinc-800/10" />
      <div className="">
        <p className="font-semibold">{name}</p>
        <p className="text-sm">{address}</p>
      </div>
    </div>
  )
}
export default PartnerOrganizationCard