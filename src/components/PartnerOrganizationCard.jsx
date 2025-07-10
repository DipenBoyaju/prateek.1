const PartnerOrganizationCard = ({ name, address, image }) => {
  return (
    <div className="flex items-center gap-4 border-b border-zinc-800/10 pb-4 shadow p-4">
      <div className="w-16 h-16 rounded-md shadow border border-zinc-800/10 overflow-hidden flex-shrink-0">
        {
          image ? (
            <img src={image} alt="" className="h-full w-full " />
          ) : (
            <span className="flex items-center justify-center h-full font-semibold text-zinc-700">N/A</span>
          )
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-zinc-800">{name}</p>
        <p className="text-sm text-zinc-600 truncate">{address}</p>
      </div>
    </div>
  )
}
export default PartnerOrganizationCard