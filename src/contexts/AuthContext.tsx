
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: (User & { role?: string; name?: string }) | null;
  userRole: string | null;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  userEmail: null,
  login: async () => {},
  logout: async () => {},
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<(User & { role?: string; name?: string }) | null>(null);
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem("userRole"));
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem("userEmail"));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        setUserRole(userData.role);
        setUserEmail(userData.email);
        localStorage.setItem("userRole", userData.role);
        localStorage.setItem("userEmail", userData.email);
      } catch (error) {
        console.error("Failed to get current user:", error);
        setUser(null);
        setUserRole(null);
        setUserEmail(null);
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await authService.login({ email, password });
      const userData = await authService.getCurrentUser();
      
      setUser(userData);
      setUserRole(userData.role);
      setUserEmail(userData.email);
      
      localStorage.setItem("userRole", userData.role);
      localStorage.setItem("userEmail", userData.email);
      
      toast.success("Successfully logged in!");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setUserRole(null);
      setUserEmail(null);
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, userEmail, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
