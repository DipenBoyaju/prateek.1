import Title from "../../components/Title";
import teamList from "../../utils/teamList";
import TeamCards from "./TeamCards";
import { groupTeamsByDepartment } from "../../utils/groupTeamsByDepartment";

const groupedTeams = groupTeamsByDepartment(teamList);

const departmentOrder = [
  "Executive",
  "Research",
  "Product Development",
  "Management",
  "Consultants",
];

// Include any other departments not in the main order, at the end
const allDepartments = Object.keys(groupedTeams);
const remainingDepartments = allDepartments.filter(
  (dept) => !departmentOrder.includes(dept)
);
const finalDeptOrder = [...departmentOrder, ...remainingDepartments];

const Team = () => {
  return (
    <div>
      <Title tag="Team" title="Meet Our Team" />
      <div className="container mx-auto px-4 md:px-8 py-20">
        <h2 className="text-center font-quicksand font-semibold text-2xl md:text-3xl md:w-2/3 mx-auto">
          Meet the talented and passionate team members who drive our mission forward every day.
        </h2>

        {finalDeptOrder.map(
          (dept) =>
            groupedTeams[dept] && (
              <section
                aria-labelledby={`heading-${dept.toLowerCase()}`}
                key={dept}
                className="mt-14"
              >
                <div className="border-b border-zinc-800/30 pb-2 mb-4">
                  <h3
                    id={`heading-${dept.toLowerCase()}`}
                    className="uppercase tracking-wider font-semibold text-xl text-zinc-800"
                  >
                    {dept}
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                  {groupedTeams[dept].map((member) => (
                    <TeamCards key={member.id} item={member} />
                  ))}
                </div>
              </section>
            )
        )}
      </div>
    </div>
  );
};

export default Team;
