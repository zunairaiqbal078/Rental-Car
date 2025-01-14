import { formDataInstance } from "./BaseUrl";

export const createCar = async (data) => {
  try {
    const response = await baseURL.post("/car/create-car", data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong!";
    throw new Error(message);
  }
};
export const getCar = async (id) => {
  try {
    const response = await baseURL.get(`/car/view-car/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong!";
    throw new Error(message);
  }
};
export const updateCar = async (id, data) => {
  try {
    const response = await baseURL.put(`/car/update-car/${id}`, data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong!";
    throw new Error(message);
  }
};
export const deleteCar = async (id) => {
  try {
    const response = await baseURL.delete(`/car/delete-car/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong!";
    throw new Error(message);
  }
};
export const searchCar = async (query) => {
  try {
    const response = await baseURL.get(`/car/search?${query}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong!";
    throw new Error(message);
  }
};
export const getAllCars = async () => {
  try {
    const response = await baseURL.get("/car/all-cars");
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong!";
    throw new Error(message);
  }
};
