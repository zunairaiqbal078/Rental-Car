import { baseURL, apiURL } from "./BaseUrl";

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

export const updateProfile = async (data) => {
  try {
    const response = await apiURL.patch("/user/update-profile", data);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to update profile!";
    throw new Error(message);
  }
};
