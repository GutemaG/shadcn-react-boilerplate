import PageTitle from "@/components/ui/PageTitle";
import { LoginPage } from "@/pages/auth/LoginPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import { NavLink, Route, Routes } from "react-router-dom";

export default (
  <Routes>
    <Route
      path="/"
      element={
        <>
          Unauthenticated
          <NavLink to="auth/signin">Sign In</NavLink>
        </>
      }
    />

    <Route path="auth">
      <Route
        index
        path="signin"
        element={
          <>
            <PageTitle title="Sign In" />
            <LoginPage />
          </>
        }
      />
      <Route
        path="signup"
        element={
          <>
            <PageTitle title="Sign Up" />
            <SignUpPage />
          </>
        }
      />
    </Route>
  </Routes>
);
