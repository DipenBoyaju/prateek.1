import Title from "../../components/Title";
import TeamCards from "./TeamCards";

const teamList = [
  {
    id: 1,
    name: "Jatin Bhusal",
    role: "Founder and CEO",
    image: "/img2.png",
    department: "Executive",
    linkedin: "http",
    twitter: "http"
  },
  {
    id: 2,
    name: "Salma Tamang",
    role: "Research Assistant, AI",
    image: "/img1.png",
    department: "Research",
    linkedin: "http",
    twitter: "http"
  },
  {
    id: 3,
    name: "Dipen Boyaju",
    role: "Full Stack Developer",
    image: "/img3.png",
    department: "Product Development",
    linkedin: "http",
    twitter: "http"
  },
  {
    id: 4,
    name: "Nisha Singh Thakuri",
    role: "Management Intern",
    image: "/img4.png",
    department: "Management",
    linkedin: "http",
    twitter: "http"
  },
  {
    id: 5,
    name: "Dr. Manish Sakhakarmy, PhD",
    role: "Research Consultant, Research Methodology",
    image: "/img3.png",
    department: "Consultants",
    linkedin: "http",
    twitter: "http"
  },
];


const groupedTeams = teamList.reduce((acc, member) => {
  if (!acc[member.department]) {
    acc[member.department] = [];
  }
  acc[member.department].push(member);
  return acc;
}, {});

const departmentOrder = [
  "Executive",
  "Research",
  "Product Development",
  "Management",
  "Consultants",
];

const Team = () => {
  return (
    <div>
      <Title tag="Team" title="Meet Our Team" />
      <div className="container mx-auto px-4 md:px-8 py-20">
        <h2 className="text-center font-quicksand font-semibold text-2xl md:text-3xl md:w-2/3 mx-auto">
          Meet the talented and passionate team members who drive our company forward every day.
        </h2>

        {/* Render team members by department */}
        {departmentOrder.map((dept) =>
          groupedTeams[dept] ? (
            <div key={dept} className="mt-14">
              <div className="border-b border-zinc-800/30 pb-2 mb-4">
                <h3 className="uppercase tracking-wider font-semibold text-xl text-zinc-800">{dept}</h3>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                {groupedTeams[dept].map((member) => (
                  <TeamCards key={member.id} item={member} />
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Team;
