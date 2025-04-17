
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

interface AuthContextType {
  userRole: string | null;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  userRole: null,
  userEmail: null,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem("userRole"));
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem("userEmail"));

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = await authService.getCurrentUser();
          setUserRole(user.role);
          setUserEmail(user.email);
        } catch (error) {
          console.error("Failed to get current user:", error);
          await logout();
        }
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login({ username: email, password });
      const user = await authService.getCurrentUser();
      setUserRole(user.role);
      setUserEmail(user.email);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userEmail", user.email);
      toast.success("Successfully logged in!");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setUserRole(null);
    setUserEmail(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ userRole, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
