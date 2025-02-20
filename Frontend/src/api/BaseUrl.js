import axios from "axios";

const API_URL = "http://localhost:4000";

const jsonInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const baseURL = axios.create({
  baseURL: API_URL,
});

const formDataInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const apiURL = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
});

export { jsonInstance, baseURL, formDataInstance, apiURL };
