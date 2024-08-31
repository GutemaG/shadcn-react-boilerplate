import axiosClient from "./axiosClient";

export type Address = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
};

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
  birthDate: string;
  bloodGroup: string;
  address: Address;
  // Add other fields as necessary
};

export interface UserPaginationResponse<T> {
  total: number;
  skip: number;
  limit: number;
  users: T[];
}
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
}
export interface PostPaginationResponse<T> {
  total: number;
  skip: number;
  limit: number;
  posts: T[];
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
export const getUserPosts = async (
  id: string
): Promise<PostPaginationResponse<Post>> => {
  try {
    const response = await axiosClient.get<PostPaginationResponse<Post>>(
      `/users/${id}/posts`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
