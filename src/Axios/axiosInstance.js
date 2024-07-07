import axios from "axios";

// Create an Axios instance with a custom configuration
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/dashboard", // Replace with your API's base URL
  headers: {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
  },
});

// Example of an interceptor to add a token to requests
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Assuming you're storing the token in localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Example of an interceptor to handle responses
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle errors globally
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
