import { useNavigate } from "react-router-dom";


const DasTeamList = ({ member, index }) => {
  const nav = useNavigate();
  return (
    <tr
      key={index}
      className="hover:bg-zinc-50 transition duration-200 cursor-pointer" onClick={() => nav(`/dashboard/team/${member.department}/${member.slug}`)}
    >
      <td className="px-6 py-2 text-zinc-700 font-medium">{index + 1}</td>
      <td className="px-6 py-2 text-zinc-700 font-medium"><div className="size-10 bg-zinc-900 rounded-sm overflow-hidden">
        <img src={member.image} alt="" /></div></td>
      <td className="px-6 py-2 text-zinc-800">{member.name}</td>
      <td className="px-6 py-2 text-zinc-800">{member.designation}</td>
      <td className="px-6 py-2">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700`}
        >
          {member.division}
        </span>
      </td>
    </tr>
  );
};

export default DasTeamList;



