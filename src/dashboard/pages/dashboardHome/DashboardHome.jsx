import { FaProjectDiagram } from "react-icons/fa";
import QuickStatCard from "../../components/QuickStatCard";
import { FaUsers } from "react-icons/fa";
import { RiBloggerFill } from "react-icons/ri";
import { useAuthStore } from "../../../store/authStore";
import NewsEventsPanel from "./NewsEventPanel";

const DashboardHome = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="space-y-5 ">
      {/* Greeting Section */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="md:w-2/3 w-full space-y-5">
          <div
            className="shadow bg-blue-500 rounded-lg relative w-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: "url('/images/shapes/grettings-pattern.png')",
            }}
          >
            <div className="p-5 flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-white text-2xl mb-1">Welcome back, <span className="capitalize">{user?.username}</span> 👋</h2>
                <p className="text-white font-quicksand text-base">
                  Manage your AI projects, content & teams from this dashboard.
                </p>
              </div>
              <img
                src="/images/shapes/gretting-img.png"
                alt="Gretting"
                className="hidden md:block w-60"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-5">
            <QuickStatCard Icon={FaProjectDiagram} title="Projects" count={1} color="blue" />
            <QuickStatCard Icon={FaUsers} title="Team Members" count={9} color="yellow" />
            <QuickStatCard Icon={RiBloggerFill} title="Published Blogs" count={0} color="emerald" />
          </div>
        </div>

        <div className="md:w-1/3 w-full shadow p-6 rounded-2xl bg-white self-start">
          <h3 className="font-semibold text-xl mb-5 text-blue-600 tracking-wide">
            Research Wings
          </h3>
          <ul className="space-y-4 text-sm text-gray-800">
            {[
              "Center for Human Mobility and Communications",
              "Center for Cognitive and Emotional Intelligence",
              "Center for Companion and Care Technologies",
              "Center for Inclusive Innovation & Assistive Tech Collaboration",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="min-w-[42px] h-[42px] flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-base shadow">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm leading-snug">{item}</p>
              </li>
            ))}
          </ul>
        </div>

      </div>


      <div className="grid md:grid-cols-3 gap-5">

        <div className="col-span-3 lg:col-span-2 bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-5">Recent Projects</h3>
          <ul className="space-y-4 text-sm text-gray-800">
            {[
              {
                icon: "🧑‍🦯",
                title: "Smart Navigation for the Visually Impaired",
                status: "Ongoing",
                color: "bg-yellow-100 text-yellow-800",
              },
              {
                icon: "🤝",
                title: "AI-Based Sign Language Translator",
                status: "Deployed",
                color: "bg-green-100 text-green-800",
              },
            ].map((project, idx) => (
              <li
                key={idx}
                className="flex items-start justify-between bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow transition"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{project.icon}</span>
                  <div>
                    <p className="font-medium leading-snug">{project.title}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${project.color}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <NewsEventsPanel />

      </div>
    </div>
  );
};

export default DashboardHome;
