import axiosClient from "./axiosClient";

// Define a type for the user data if you have a specific structure
export type User = {
  id: number;
  name: string;
  email: string;
  // Add other fields as necessary
};

// Function to get the list of users
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosClient.get<User[]>("/users");
    const fakeResponse = {
      data: [
        {
          id: 1,
          name: "John Doe",
          email: "jon@jon.com",
        },
        {
          id: 2,
          name: "Jane Doe 2",
          email: "test@test.com",
        },
      ],
    };
    response.data = fakeResponse.data;

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// other user-related API calls

export const getUserMe = async (): Promise<User> => {
  try {
    const response = await axiosClient.get<User>("/users/me");
    const fakeResponse: User = {
      id: 1,
      name: "Me",
      email: "jon@jon.com",
    };
    response.data = fakeResponse;
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
