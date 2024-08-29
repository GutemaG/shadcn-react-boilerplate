import { Outlet } from "react-router-dom";

const UnAuthenticatedLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default UnAuthenticatedLayout;
