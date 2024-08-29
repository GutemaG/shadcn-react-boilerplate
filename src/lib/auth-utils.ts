import { AuthUser } from "./api/authApi";

export const getLoggedInUserFromToken = (token: string): AuthUser | null => {
  if (!token) {
    return null;
  }

  try {
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(tokenParts[1]));

    // Validate and map the payload to AuthUser
    const user: AuthUser = {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      firstName: payload.first_name || payload.firstName,
      lastName: payload.last_name || payload.lastName,
      gender: payload.gender,
      image: payload.image,
      token: token,
      refreshToken: payload.refreshToken || "", // Assuming the payload may contain refreshToken
    };

    return user;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
