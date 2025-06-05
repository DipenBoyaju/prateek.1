import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f5f6f7]">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-col flex-1">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
