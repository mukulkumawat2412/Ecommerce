import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance.js";
import { toast } from "sonner";

/* --------------------------------------------------------------------- */
const initialState = {
  loading: false,        // for buttons like login/register
  authLoading: true,    // for silent refresh spinner
  error: null,
  user: null,
  isAuthenticated:false,
  profileData: null,
};

/* --------------------------------------------------------------------- */
// 🔄 Refresh Access Token
export const RefreshAccessToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/refresh-token", {}, { withCredentials: true });
      console.log(res)
      const { accessToken, user } = res.data.data;
      if (accessToken) api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      return { accessToken, user };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* --------------------------------------------------------------------- */
// 📝 Register
export const Register = createAsyncThunk(
  "/signup",
  async (RegisterData, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/register", RegisterData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* --------------------------------------------------------------------- */
// 🔑 Login
export const Login = createAsyncThunk(
  "/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await api.post(`/users/login`, loginData, { withCredentials: true });

      console.log(res)
      const { accessToken, sanitizedUser } = res.data.data;
      if (accessToken) api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      return { accessToken, user: sanitizedUser };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* --------------------------------------------------------------------- */
// 🚪 Logout
export const Logout = createAsyncThunk(
  "/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/users/logout", {}, { withCredentials: true });
      delete api.defaults.headers.common["Authorization"];
      return {};
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* --------------------------------------------------------------------- */
// 🔄 Profile / Password
export const profileChangePassword = createAsyncThunk(
  "/profile-password",
  async (profilePasswordData, { rejectWithValue }) => {
    try {
      const res = await api.put("/users/profile-change-password", profilePasswordData, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const profileFetch = createAsyncThunk(
  "/profile-fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/profile", { withCredentials: true });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "/profile_update",
  async (ProfileUpdateData, { rejectWithValue }) => {
    try {
      const res = await api.put("/users/profile-update", ProfileUpdateData, { withCredentials: true });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* --------------------------------------------------------------------- */
// 🧠 Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Register */
    builder.addCase(Register.pending, (state) => { state.loading = true; });
    builder.addCase(Register.fulfilled, (state) => {
      state.loading = false;
      toast.success("Registration successful");
    });
    builder.addCase(Register.rejected, (state, action) => {
      state.loading = false;
      toast.error(action.payload?.message || "Registration failed");
    });

    /* Login */
    builder.addCase(Login.pending, (state) => { state.loading = true;
      state.authLoading = true
     });
    builder.addCase(Login.fulfilled, (state, action) => {
      console.log(action.payload)
      state.loading = false;
      state.authLoading = false;
      state.isAuthenticated = true
      state.user = action.payload.user;
      toast.success("Login successful");
    });
    builder.addCase(Login.rejected, (state, action) => {
      state.loading = false;
      state.authLoading = false
      toast.error(action.payload?.message || "Login failed");
    });

    /* Logout */
    builder.addCase(Logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false
      state.profileData = null;
      state.authLoading = false;
      delete api.defaults.headers.common["Authorization"];
      window.location.href = "/login"; // redirect user
    });

    /* Refresh Token */
    builder.addCase(RefreshAccessToken.pending, (state) => {
      state.authLoading = true; // silent refresh spinner
    });
    builder.addCase(RefreshAccessToken.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload.user;
      state.authLoading = false;
      api.defaults.headers.common["Authorization"] = `Bearer ${action.payload.accessToken}`;
    });
    builder.addCase(RefreshAccessToken.rejected, (state) => {
      // ❌ Do NOT clear user state, keep navbar/cart/wishlist intact
      // state.user = null
      // state.isAuthenticated = false
      state.authLoading = false;
    });

    /* Profile */
    builder.addCase(profileFetch.fulfilled, (state, action) => { state.profileData = action.payload; });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profileData = action.payload;
      toast.success("Profile updated");
    });
    builder.addCase(profileChangePassword.fulfilled, (state) => {
      toast.success("Password changed successfully");
    });
  },
});

export default authSlice.reducer;
