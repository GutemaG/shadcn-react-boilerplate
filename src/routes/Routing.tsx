import { Route, Routes } from "react-router-dom";
import PageTitle from "@/components/ui/PageTitle";
import Dashboard from "@/pages/Dashboard";
import UserListPage from "@/pages/UserListPage";
import { DefaultLayout } from "@/components/ui/layout/DefaultLayout";
import { LoginPage } from "@/pages/auth/LoginPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import ProtectedRoute from "./ProtectedRoute";
import UnAuthenticatedLayout from "@/components/ui/layout/UnAuthenticatedLayout";

export const Routing = () => {
  return (
    <Routes>
      <Route
        path="auth"
        element={
          <>
            <UnAuthenticatedLayout />
          </>
        }
      >
        <Route
          index
          path="signin"
          element={
            <>
              <ProtectedRoute>
                <PageTitle title="Sign In" />
                <LoginPage />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          index
          path="signup"
          element={
            <>
              <ProtectedRoute>
                <PageTitle title="Sign up" />
                <SignUpPage />
              </ProtectedRoute>
            </>
          }
        />
      </Route>

      <Route
        element={
          <>
            <ProtectedRoute>
              <DefaultLayout />
            </ProtectedRoute>
          </>
        }
      >
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

        <Route path="users">
          <Route
            path="list"
            element={
              <>
                <PageTitle title="Task" />
                <UserListPage />
              </>
            }
          />
          <Route path="category-2" element={<>Task Category 2</>} />
        </Route>
      </Route>
      <Route index path="*" element={<>404 Page</>} />
    </Routes>
  );
};
