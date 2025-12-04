import axios from "axios";
import { RefreshAccessToken, Logout } from "../redux/slices/authSlice.jsx";
import dotenv from "dotenv"

dotenv.config()

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  withCredentials: true,
});

// ✅ Redux Store Inject
let reduxStore = null;

export const injectStore = (_store) => {
  reduxStore = _store;
};

// ✅ Refresh Queue System
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

// ✅ RESPONSE INTERCEPTOR (MAIN FIX)
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // ✅ Only for 401 & only once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // ✅ If refresh already running → wait in queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const action = await reduxStore.dispatch(RefreshAccessToken());

        // ✅ IMPORTANT SAFETY CHECK
        if (!action.payload?.accessToken) {
          throw new Error("Refresh token failed");
        }

        const newAccessToken = action.payload.accessToken;

        // ✅ Update header for next calls
        api.defaults.headers.common.Authorization =
          `Bearer ${newAccessToken}`;

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        reduxStore.dispatch(Logout());

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
