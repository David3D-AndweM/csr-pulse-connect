
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface AuthContextType {
  userRole: string | null;
  userEmail: string | null;
  login: (email: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userRole: null,
  userEmail: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem("userRole"));
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem("userEmail"));

  useEffect(() => {
    // Update context when localStorage changes
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem("userRole"));
      setUserEmail(localStorage.getItem("userEmail"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (email: string, role: string) => {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", role);
    setUserEmail(email);
    setUserRole(role);
  };

  const logout = () => {
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
