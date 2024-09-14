import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./topbar/Header";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="dark:bg-inherit bg-primary-foreground">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-2 md:p-2 2xl:p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
