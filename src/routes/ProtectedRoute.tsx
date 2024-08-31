import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated && !location.pathname.startsWith("/auth")) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  if (isAuthenticated && location.pathname.startsWith("/auth")) {
    // Redirect to the previous route if available, otherwise to the home page
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  // If none of the conditions above apply, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
