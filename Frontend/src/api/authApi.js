import { baseURL, apiURL, formDataInstance, jsonInstance } from "./BaseUrl";

// Login API
export const login = async (data) => {
  try {
    const response = await baseURL.post("/auth/login", data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong!";
    throw new Error(message);
  }
};

// Register API
export const register = async (data) => {
  try {
    const response = await baseURL.post("/auth/signup", data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed!";
    throw new Error(message);
  }
};

// Logout API
export const logout = async () => {
  try {
    const response = await baseURL.post("/auth/logout");
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Logout failed!";
    throw new Error(message);
  }
};

// Fetch Profile
export const fetchProfile = async () => {
  try {
    const response = await apiURL.get("/user/profile");
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to fetch profile!");
  }
};

// Update Profile API
export const updateProfile = async (id, data) => {
  try {
    const response = await formDataInstance.patch(
      `/user/update-profile/${id}`,
      data
    );
    console.log("Update Profile Response:", response.data);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to update profile!";
    throw new Error(message);
  }
};

//Fetch All Users
export const fetchAllUsers = async () => {
  try {
    const response = await formDataInstance.get("/admin/users");
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to fetch all users!");
  }
};
//Delete User by Id
export const deleteUser = async (id) => {
  try {
    const response = await formDataInstance.delete(`/admin/delete-user/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong!";
    throw new Error(message);
  }
};
