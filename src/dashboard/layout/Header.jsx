import { useState } from "react";
import { Bell, User } from "lucide-react";
import { baseUrl } from "../../utils/baseUrl";
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from "../../store/authStore";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const nav = useNavigate();

  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/api/logout`, {}, { withCredentials: true });
      logout();
      toast.success("Logged out successfully");
      nav("/login");
    } catch (err) {
      console.error("Logout Error:", err);
      toast.error("Logout failed");
    }
  };

  return (
    <header
      className={`
    fixed top-0 right-0 z-20 h-16 bg-white shadow-md flex items-center justify-between px-4
    transition-all duration-300 w-full
    ${isSidebarOpen ? "md:ml-64" : "ml-0"}
  `}>
      <button className="md:hidden text-2xl" onClick={toggleSidebar}>☰</button>

      <div className="flex items-center gap-4 ml-auto">
        <Bell className="w-5 h-5 cursor-pointer" />
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <p className="font-poppins capitalize">{user.username}</p>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
              <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">Profile</button>
              <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;