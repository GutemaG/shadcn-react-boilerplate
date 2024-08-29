import { AuthUser, loginApi, LoginCredentials } from "@/lib/api/authApi";
import { getLoggedInUserFromToken } from "@/lib/auth-utils";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  token: string | null;
  user: AuthUser | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();

  const login = async (
    username: string,
    password: string,
    expiresInMins: number = 30
  ) => {
    try {
      const credentials: LoginCredentials = {
        username,
        password,
        expiresInMins,
      };
      const authUser: AuthUser = await loginApi(credentials);
      setToken(authUser.token);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      navigate("/auth/signin/");
      setIsAuthenticated(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setToken(null);
    navigate("/auth/signin");
  };

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      setUser(getLoggedInUserFromToken(token));
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, token, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// // Simulated API call function for login (replace with real API)
// const fakeLoginApiCall = (
//   username: string,
//   password: string
// ): Promise<{ token: string }> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (username === "user" && password === "password") {
//         resolve({ token: "fake-jwt-token" });
//       } else {
//         reject("Invalid username or password");
//       }
//     }, 1000);
//   });
// };
