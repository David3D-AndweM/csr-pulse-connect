
import { PropsWithChildren, useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

// Define role-based route access
const roleAccess = {
  manager: ["/dashboard", "/projects", "/requests", "/reports", "/analytics", "/locations", "/surveys", "/mous", "/content", "/users", "/settings"],
  editor: ["/dashboard", "/content", "/reports", "/settings"],
  me_officer: ["/dashboard", "/surveys", "/projects", "/analytics", "/reports", "/settings"],
  recipient: ["/projects", "/reports", "/surveys", "/settings"]
};

export function Layout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!userRole) {
      navigate("/login");
      return;
    }

    // Check if user has access to current route
    const allowedRoutes = roleAccess[userRole as keyof typeof roleAccess] || [];
    const currentPath = location.pathname;
    
    if (!allowedRoutes.some(route => currentPath.startsWith(route))) {
      // Redirect to first allowed route if current route is not accessible
      navigate(allowedRoutes[0]);
    }
  }, [userRole, navigate, location.pathname]);

  if (!userRole) return null;
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-2 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </Header>
        <main className="flex-1 overflow-auto p-6 bg-background/50">{children}</main>
      </div>
    </div>
  );
}
