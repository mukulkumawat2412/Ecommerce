// import axios from "axios";

// // ✅ Axios instance
// const api = axios.create({
//   baseURL: "http://localhost:8000/api/v1",
//   withCredentials: true, // cookies bhejne ke liye
// });

// // --------------------------------------------
// // ✅ PAGE REFRESH hone par accessToken auto-refresh
// // --------------------------------------------
// export async function refreshAccessTokenOnLoad() {
//   try {
//     // Jaise hi page reload ho, refresh-token API call karo
//     const res = await api.post("/users/refresh-token", {}, { withCredentials: true });
//     console.log(res)
//     if (res.status === 200) {
//       console.log("🔁 Access token refreshed on page reload");
//       const newAccessToken = res.data.data.accessToken;

//       // Axios default header me new token set kar do
//       api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
//     }
//   } catch (error) {
//     console.warn("⚠️ Refresh token expired or not found, user needs to login again");
//   }
// }

// // Browser load hone par auto call karo
// if (typeof window !== "undefined") {
//   refreshAccessTokenOnLoad();
// }

// // --------------------------------------------
// // ✅ Interceptor — expired token hone par auto refresh
// // --------------------------------------------
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Agar JWT expired hai aur refresh try nahi hua ab tak
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         // Refresh Token API call
//         const res = await api.post(
//           "/users/refresh-token",
//           {},
//           { withCredentials: true }
//         );

//         if (res.status === 200) {
//           console.log("🔁 Access token refreshed after expiry");
//           const newAccessToken = res.data.data.accessToken;

//           // Axios ke header me new token daalo
//           api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
//           originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

//           // Original request dubara chalao
//           return api(originalRequest);
//         }
//       } catch (err) {
//         console.error("❌ Refresh token failed:", err);
       
//         if (typeof window !== "undefined") {
//           window.location.href = "/login";
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;





import axios from "axios";

// ✅ Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // cookies bhejne ke liye
});


export async function refreshAccessTokenOnLoad() {
  try {
    // 🛑 Check if refreshToken cookie exists before calling API
    const isLoggedIn = document.cookie.includes("refreshToken=");
    if (!isLoggedIn) {
      console.log("⚠️ User not logged in — skipping refresh-token API call");
      return;
    }

    // ✅ Agar user logged in hai tabhi API call karein
    const res = await api.get("/users/refresh-token");
    console.log("🔁 Access token refreshed successfully:", res.data);
  } catch (err) {
    console.error("❌ Refresh token failed:", err.response?.data || err.message);
  }
}

// --------------------------------------------
// ✅ PAGE LOAD hone par ek baar token refresh karo
// --------------------------------------------
async function refreshAccessToken() {
  try {
    const res = await api.post("/users/refresh-token", {}, { withCredentials: true });

    if (res.status === 200 && res.data?.data?.accessToken) {
      const newAccessToken = res.data.data.accessToken;
      console.log("🔁 Access token refreshed:", newAccessToken);

      // Axios header me new token set karo
      api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
    }
  } catch (error) {
    console.warn("⚠️ Refresh token expired or not found");
  }
}

// --------------------------------------------
// ✅ AUTO INTERVAL SYSTEM — har 20 sec me refresh token
// --------------------------------------------
if (typeof window !== "undefined") {
  // 1️⃣ page load hone par turant refresh karo
  refreshAccessToken();

  // 2️⃣ phir har 20s me automatically refresh karte raho
  setInterval(() => {
    console.log("⏰ Auto-refreshing access token...");
    refreshAccessToken();
  }, 20000); // 20 seconds
}

// --------------------------------------------
// ✅ RESPONSE INTERCEPTOR (expired hone par bhi handle)
// --------------------------------------------
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/users/refresh-token", {}, { withCredentials: true });

        if (res.status === 200 && res.data?.data?.accessToken) {
          const newAccessToken = res.data.data.accessToken;
          console.log("🔄 Token refreshed after 401:", newAccessToken);

          api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        }
      } catch (err) {
        console.error("❌ Refresh token failed:", err);
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);


export default api;













