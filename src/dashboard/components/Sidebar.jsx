import { LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const [openMenu, setOpenMenu] = useState("");

  const toggleSubMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const activeClass = "font-bold text-blue-600";
  const normalClass = "font-medium text-gray-700";

  return (
    <div
      className={`bg-white w-64 p-4 shadow-md transition-transform duration-300 ${isOpen ? "block" : "hidden md:block"
        }`}
    >
      <h2 className="text-lg font-bold mb-4">Admin Dashboard</h2>
      <nav>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <LayoutDashboard strokeWidth={1.5} size={18} className="text-zinc-700" />
            <NavLink
              to="/dashboard" end
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <button
              onClick={() => toggleSubMenu("updates")}
              className="w-full text-left font-medium"
            >
              Updates
            </button>
            {openMenu === "updates" && (
              <ul className="ml-4 space-y-1 text-sm">
                <li>
                  <NavLink
                    to="/dashboard/events"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    Events
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/newsletter"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    Newsletter
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/news"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
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

          <li>
            <button
              onClick={() => toggleSubMenu("departments")}
              className="w-full text-left font-medium"
            >
              Departments
            </button>
            {openMenu === "departments" && (
              <ul className="ml-4 space-y-1 text-sm">
                <li>
                  <NavLink
                    to="/dashboard/it"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    IT
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/hr"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    HR
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/finance"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    Finance
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/admin"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    Admin
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
