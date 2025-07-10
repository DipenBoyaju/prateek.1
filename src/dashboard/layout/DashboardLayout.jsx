import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-white md:bg-[#f5f6f7]">
      {/* Sidebar (visible on md+ and toggled on small screens) */}
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "ml-0"}`}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
        <div className="flex flex-col flex-1 mt-16">
          <main className="flex-1 p-4">
            <Outlet />
            <ScrollToTop />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;