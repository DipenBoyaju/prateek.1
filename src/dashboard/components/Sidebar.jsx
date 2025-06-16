import { ChevronDown, FlaskConical, LayoutDashboard, Newspaper, Users } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LiaProjectDiagramSolid } from "react-icons/lia";

const Sidebar = ({ isOpen, setIsSidebarOpen }) => {
  const [openMenu, setOpenMenu] = useState("");

  const toggleSubMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const activeClass = "font-semibold bg-blue-100 text-blue-600";
  const normalClass = "font-semibold text-zinc-600 text-sm";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div
        className={`
        fixed top-0 left-0 h-screen bg-white shadow-md transition-all z-30
        ${isOpen ? "w-64" : "w-0 md:w-64"} overflow-hidden
      `}>
        <div className="pt-3 pl-3">
          <a href="/" target="_blank">
            <img src="/images/logo1.png" className="w-32" alt="" />
          </a>
        </div>
        <nav className="mt-5 font-quicksand">
          <ul className="space-y-1">
            <li className="">
              <NavLink
                to="/dashboard" end
                className={({ isActive }) => `${isActive ? activeClass : normalClass} flex items-center gap-2 px-4 py-3`}
              >
                <LayoutDashboard strokeWidth={2.5} size={18} className="" />
                Dashboard
              </NavLink>
            </li>

            <li className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-3 cursor-pointer">
                <FlaskConical strokeWidth={2.5} size={20} className="text-zinc-700" />
                <button
                  onClick={() => toggleSubMenu("research")}
                  className="w-full text-left font-semibold text-gray-600 text-sm cursor-pointer"
                >
                  Research Wing
                </button>
                <ChevronDown strokeWidth={2.5} size={24} className="text-zinc-700" />
              </div>
              {openMenu === "research" && (
                <ul className="space-y-1 font-light text-sm">
                  <li className="">
                    <NavLink
                      to="/dashboard/chmc"
                      className={({ isActive }) =>
                        `${isActive ? activeClass : normalClass} block pl-6 py-2 w-full`}>
                      CHMC
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/ccei"
                      className={({ isActive }) =>
                        `${isActive ? activeClass : normalClass} block pl-6 py-2 w-full`}>
                      CCEI
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/ccct"
                      className={({ isActive }) =>
                        `${isActive ? activeClass : normalClass} block pl-6 py-2 w-full`}>
                      CCCT
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/ciiatc"
                      className={({ isActive }) =>
                        `${isActive ? activeClass : normalClass} block pl-6 py-2 w-full`}>
                      CIIATC
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-3 cursor-pointer">
                <Users strokeWidth={2.5} size={20} className="text-zinc-700" />
                <button
                  onClick={() => toggleSubMenu("team")}
                  className="w-full text-left font-semibold text-gray-600 text-sm cursor-pointer"
                >
                  Team
                </button>
                <ChevronDown strokeWidth={2.5} size={24} className="text-zinc-700" />
              </div>
              {openMenu === "team" && (
                <ul className="space-y-1 font-light text-sm">
                  <li className="">
                    <NavLink
                      to="/dashboard/team/executive"
                      className={({ isActive }) =>
                        `${isActive ? activeClass : normalClass} block pl-6 py-2 w-full`}>
                      Executive
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/team/research"
                      className={({ isActive }) =>
                        `${isActive ? activeClass : normalClass} block pl-6 py-2 w-full`}>
                      Research
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/team/development"
                      className={({ isActive }) =>
                        `${isActive ? activeClass : normalClass} block pl-6 py-2 w-full`}>
                      Development
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/team/management"
                      className={({ isActive }) =>
                        `${isActive ? activeClass : normalClass} block pl-6 py-2 w-full`}>
                      Management
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/team/consultants"
                      className={({ isActive }) =>
                        `${isActive ? activeClass : normalClass} block pl-6 py-2 w-full`}>
                      Consultants
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li className="">
              <NavLink
                to="/dashboard/projects" end
                className={({ isActive }) => `${isActive ? activeClass : normalClass} flex items-center gap-2 px-4 py-3`}
              >
                <LiaProjectDiagramSolid className="size-5" />
                Projects
              </NavLink>
            </li>

            <li className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-3 cursor-pointer w-full">
                <Newspaper strokeWidth={2.5} size={20} className="text-zinc-700" />
                <button
                  onClick={() => toggleSubMenu("updates")}
                  className="w-full text-left font-semibold text-gray-600 text-sm cursor-pointer"
                >
                  Updates
                </button>
                <ChevronDown strokeWidth={2.5} size={24} className="text-zinc-600" />
              </div>
              {openMenu === "updates" && (
                <ul className="space-y-1 font-light">
                  <li className="">
                    <NavLink
                      to="/dashboard/events"
                      className={({ isActive }) =>
                        `${isActive ? activeClass : normalClass} block pl-6 py-2 w-full`}>
                      Events
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/newsletter"
                      className={({ isActive }) =>
                        `${isActive ? activeClass : normalClass} block pl-6 py-1 w-full`}>
                      NewsLetter
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/news"
                      className={({ isActive }) =>
                        `${isActive ? activeClass : normalClass} block pl-6 py-1 w-full`}>
                      News
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* <li>
            <button
              onClick={() => toggleSubMenu("users")}
              className="w-full text-left font-medium"
            >
              User Management
            </button>
            {openMenu === "users" && (
              <ul className="ml-4 space-y-1 text-sm">
                <li>
                  <NavLink
                    to="/dashboard/roles"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    Roles
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/users"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    Users
                  </NavLink>
                </li>
              </ul>
            )}
          </li> */}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
