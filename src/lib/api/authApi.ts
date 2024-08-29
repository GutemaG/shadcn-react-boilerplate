import axiosClient from "./axiosClient";

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
};

export type LoginCredentials = {
  username: string;
  password: string;
  expiresInMins?: number;
};

export const loginApi = async (
  credentials: LoginCredentials
): Promise<AuthUser> => {
  try {
    const response = await axiosClient.post<AuthUser>("auth/login", {
      username: credentials.username,
      password: credentials.password,
      expiresInMins: credentials.expiresInMins,
    });
    const authUser = response.data;
    if (authUser.token) {
      localStorage.setItem("token", authUser.token);
      localStorage.setItem("refreshToken", authUser.refreshToken);
    }
    return authUser;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Customize the error handling
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid username or password");
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Error logging in:", error);
      throw new Error("An unexpected error occurred during login");
    }
  }
};
