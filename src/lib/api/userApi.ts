import axiosClient from "./axiosClient";

// Define a type for the user data if you have a specific structure
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  phone: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  eyeColor: string;
  image: string;
  // Add other fields as necessary
};

export interface UserPaginationResponse<T> {
  total: number;
  skip: number;
  limit: number;
  users: T[];
}

export interface SingleItemResponse<T> {
  data: T;
}

// Function to get the list of users
export const getUsers = async (): Promise<UserPaginationResponse<User>> => {
  try {
    const response = await axiosClient.get<UserPaginationResponse<User>>(
      "/users"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUser = async (id: string): Promise<User> => {
  try {
    const response = await axiosClient.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
