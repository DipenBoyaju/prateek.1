import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Title from "../../components/Title";
import TeamCards from "./TeamCards";
import { groupTeamsByDepartment } from "../../utils/groupTeamsByDepartment";
import { baseUrl } from "../../utils/baseUrl";
import { Mosaic } from "react-loading-indicators";

const getAllTeam = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/team/members`, {
      timeout: 5000,
    });
    return res.data.data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw new Error("Failed to fetch team members");
  }
};

const departmentOrder = [
  "Executive",
  "Research",
  "Product Development",
  "Management",
  "Consultants",
];

const Team = () => {
  const { data: team = [], isLoading, isError } = useQuery({
    queryKey: ["team"],
    queryFn: getAllTeam,
    staleTime: 1000 * 60 * 60,
  });

  const groupedTeams = groupTeamsByDepartment(team);

  const allDepartments = Object.keys(groupedTeams);
  const remainingDepartments = allDepartments.filter(
    (dept) => !departmentOrder.includes(dept)
  );
  const finalDeptOrder = [...departmentOrder, ...remainingDepartments];

  return (
    <div>
      <Title tag="Team" title="Meet Our Team" />
      <div className="container mx-auto px-4 md:px-8 py-20">
        <h2 className="text-center font-quicksand font-semibold text-2xl md:text-3xl md:w-2/3 mx-auto">
          Meet the talented and passionate team members who drive our mission forward every day.
        </h2>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Mosaic color="#0096FF" size="medium" text="" textColor="" />
          </div>
        )}

        {isError && (
          <p className="text-center text-red-500 mt-10">Error loading team data.</p>
        )}

        {!isLoading && !isError && (
          <div className="mt-10">
            {finalDeptOrder.map(
              (dept) =>
                groupedTeams[dept]?.length > 0 && (
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
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {groupedTeams[dept].map((member) => (
                        <TeamCards key={member._id} item={member} />
                      ))}
                    </div>
                  </section>
                )
            )}

            {allDepartments.length === 0 && (
              <p className="text-center text-zinc-500 mt-10">No team members found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;