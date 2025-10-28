// // utils/axiosInstance.js
// import axios from "axios";
// import store from "../../../Frontend/src/redux/slices/store.js";
// import { refreshAccessToken } from "../../../Frontend/src/redux/slices/authSlice";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8000/api/v1",
//   withCredentials: true,
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // JWT expired → 401
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         await store.dispatch(refreshAccessToken());
//         return axiosInstance(originalRequest); // retry original request
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
