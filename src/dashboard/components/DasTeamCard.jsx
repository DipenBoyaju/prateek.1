import { Link } from "react-router-dom"

const DasTeamCard = ({ member }) => {
  return (
    <Link to={`/dashboard/team/${member.department}/${member.slug}`} className="shadow rounded-md overflow-hidden bg-white">
      <div className="h-[30vh] overflow-hidden relative">
        <img src={member?.image} alt="" className="object-cover h-full w-full" />
        {
          member?.category === 'Intern' && <span className="absolute z-20 bottom-0 right-0 text-sm bg-blue-600 text-white px-4 py-1 rounded-tl-xl font-quicksand">{member?.category}</span>
        }
      </div>
      <div className="p-4 bg-blue-100 h-full">
        <p className="capitalize font-semibold text-lg ">{member?.name}</p>
        <p className="text-sm">{member?.designation}</p>
      </div>
    </Link>
  )
}
export default DasTeamCard