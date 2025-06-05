import { useState } from "react";
import { Bell, User } from "lucide-react";
import { baseUrl } from "../../utils/baseUrl";
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from "../../store/authStore";

const Header = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const nav = useNavigate();

  const user = useAuthStore((state) => state.user);
  console.log(user)
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
    <header className="flex items-center justify-between md:justify-end md bg-white p-4 shadow-lg relative z-20 ">
      <button className="md:hidden" onClick={toggleSidebar}>☰</button>

      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 cursor-pointer" />
        <div className="relative">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
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
