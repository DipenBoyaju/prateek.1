import { useState } from "react";
import { Bell, User } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex items-center justify-between md:justify-end md bg-white p-4 shadow">
      <button className="md:hidden" onClick={toggleSidebar}>☰</button>

      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 cursor-pointer" />
        <div className="relative">
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
              <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">Profile</button>
              <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
