import { Route, Routes } from "react-router-dom";
import authRouting from "./auth-routing";
import taskRouting from "./task-routing";
import PageTitle from "@/components/ui/PageTitle";
import Dashboard from "@/pages/Dashboard";

export const Routing = () => {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <>
            <PageTitle title="Home" />
            <Dashboard />
          </>
        }
      />
      <Route
        index
        path="settings"
        element={
          <>
            <PageTitle title="Setting" /> settings
          </>
        }
      />
      <Route index path="profile" element={<>Profile Page</>} />
      {taskRouting}
      {authRouting}
      <Route index path="*" element={<>404 Page</>} />
    </Routes>
  );
};
