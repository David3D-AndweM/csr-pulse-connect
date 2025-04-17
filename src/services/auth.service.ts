
import { apiClient } from "@/lib/api-client";

export interface LoginCredentials {
  username: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await apiClient.post("/token/", credentials);
    localStorage.setItem("token", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);
    return response.data;
  },

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },

  async getCurrentUser() {
    const response = await apiClient.get("/users/me/");
    return response.data;
  },
};
