import { create } from "zustand";
import axios from "../Library/Axios.js";
import toast from "react-hot-toast";

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmpassword }) => {
    set({ loading: true });

    if (password !== confirmpassword) {
      set({ loading: false });
      toast.error("Password does not match Confirm Password");
      return { success: false };
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data, loading: false });

      toast.success(res.data.message || "Signup successful!");
      return { success: true, email };
    } catch (error) {
      set({ loading: false });
      toast.error(error?.response?.data?.message || "An error occurred");
      return { success: false };
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data, loading: false });

      toast.success(res.data.message || "Login successful!");
      return { success: true, user: res.data.user };
    } catch (error) {
      set({ loading: false });
      toast.error(error?.response?.data?.message || "An error occurred");
      return { success: false };
    }
  },

  verifyEmail: async ({ email, code }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/verify-email", { email, code });

      toast.success(res.data.message || "Email verified successfully");
      return { success: true };
    } catch (error) {
      const message =
        error?.response?.data?.message || "Verification failed. Please try again.";
      toast.error(message);
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
    }
  },
    refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},

}));

let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default useUserStore;
