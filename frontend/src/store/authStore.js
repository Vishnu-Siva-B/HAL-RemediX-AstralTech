import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, data);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      throw error;
    }
  },
  verifyEmail: async (verificationToken) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/verify-otp-email`,
        {
          verificationToken
        }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false
      });
      return response.data;
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      throw error;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/api/auth/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false
      });
    } catch (error) {
      set({ isCheckingAuth: false, error: null, isAuthenticated: false });
    }
  },
  signin: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/api/auth/signin`, {
        email,
        password
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error Signing in",
        isLoading: false
      });
      throw error;
    }
  },
  signout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/api/auth/signout`);
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      throw error;
    }
  },
}));
