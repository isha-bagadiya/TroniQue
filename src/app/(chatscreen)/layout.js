"use client";

import { useState } from "react";
import Sidebar from "../components/sidebar";
import { usePathname } from "../../../node_modules/next/navigation";
import { ChatStateProvider } from "../components/ChatStateManager";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const currentPath = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ChatStateProvider>
      <div className="min-h-screen flex">
        <div
          className={`bg-black transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-[20%]" : "w-[6%]"
          }`}
        >
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            currentPath={currentPath}
          />
        </div>
        <div
          className={`transition-all duration-300 ease-in-out flex flex-col p-5 ${
            isSidebarOpen ? "w-[80%]" : "w-[94%]"
          }`}
        >
          <main className="w-full h-full">{children}</main>
        </div>
      </div>
    </ChatStateProvider>
  );
}
