import { ChevronDown, FlaskConical, LayoutDashboard, Newspaper, Users } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const [openMenu, setOpenMenu] = useState("");

  const toggleSubMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const activeClass = "font-normal bg-blue-300 text-white";
  const normalClass = "font-light text-gray-700";

  return (
    <div
      className={`bg-white w-64 py-4 shadow-md transition-transform duration-300 ${isOpen ? "block" : "hidden md:block"
        }`}
    >
      <img src="/images/logo1.png" className="w-32" alt="" />
      <nav className="mt-10 font-poppins">
        <ul className="space-y-1">
          <li className="">
            <NavLink
              to="/dashboard" end
              className={({ isActive }) => `${isActive ? activeClass : normalClass} flex items-center gap-2 px-4 py-3`}
            >
              <LayoutDashboard strokeWidth={1.5} size={20} className="" />
              Dashboard
            </NavLink>
          </li>

          <li className="cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-3 cursor-pointer">
              <FlaskConical strokeWidth={1.5} size={20} className="text-zinc-700" />
              <button
                onClick={() => toggleSubMenu("research")}
                className="w-full text-left font-light cursor-pointer"
              >
                Research Wing
              </button>
              <ChevronDown strokeWidth={1.5} size={24} className="text-zinc-700" />
            </div>
            {openMenu === "research" && (
              <ul className="space-y-1 font-light">
                <li className="">
                  <NavLink
                    to="/dashboard/chmc"
                    className={({ isActive }) =>
                      `${isActive ? activeClass : normalClass} block pl-6 py-1 w-full`}>
                    CHMC
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/ccei"
                    className={({ isActive }) =>
                      `${isActive ? activeClass : normalClass} block pl-6 py-1 w-full`}>
                    CCEI
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/ccct"
                    className={({ isActive }) =>
                      `${isActive ? activeClass : normalClass} block pl-6 py-1 w-full`}>
                    CCCT
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li className="cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-3 cursor-pointer">
              <Users strokeWidth={1.5} size={20} className="text-zinc-700" />
              <button
                onClick={() => toggleSubMenu("team")}
                className="w-full text-left font-light cursor-pointer"
              >
                Team
              </button>
              <ChevronDown strokeWidth={1.5} size={24} className="text-zinc-700" />
            </div>
            {openMenu === "team" && (
              <ul className="space-y-1 font-light">
                <li className="">
                  <NavLink
                    to="/dashboard/chmc"
                    className={({ isActive }) =>
                      `${isActive ? activeClass : normalClass} block pl-6 py-1 w-full`}>
                    CHMC
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/newsletter"
                    className={({ isActive }) =>
                      `${isActive ? activeClass : normalClass} block pl-6 py-1 w-full`}>
                    Research Team
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/news"
                    className={({ isActive }) =>
                      `${isActive ? activeClass : normalClass} block pl-6 py-1 w-full`}>
                    Development Team
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li className="cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-3 cursor-pointer w-full">
              <Newspaper strokeWidth={1.5} size={20} className="text-zinc-700" />
              <button
                onClick={() => toggleSubMenu("updates")}
                className="w-full text-left font-light cursor-pointer"
              >
                Updates
              </button>
              <ChevronDown strokeWidth={1.5} size={24} className="text-zinc-700" />
            </div>
            {openMenu === "updates" && (
              <ul className="space-y-1 font-light">
                <li className="">
                  <NavLink
                    to="/dashboard/events"
                    className={({ isActive }) =>
                      `${isActive ? activeClass : normalClass} block pl-6 py-1 w-full`}>
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

          <li>
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
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
