
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3,
  ChevronLeft,
  ClipboardList,
  FileText, 
  Home, 
  Layers, 
  MapPin,
  MessagesSquare,
  Settings, 
  Users,
  FileBarChart,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Define menu items for each role
const roleBasedNavItems = {
  manager: [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Layers, label: "Projects", href: "/projects" },
    { icon: ClipboardList, label: "Requests", href: "/requests" },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: MapPin, label: "Locations", href: "/locations" },
    { icon: FileBarChart, label: "Surveys", href: "/surveys" },
    { icon: Globe, label: "MOUs", href: "/mous" },
    { icon: MessagesSquare, label: "Content", href: "/content" },
    { icon: Users, label: "User Management", href: "/users" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ],
  editor: [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: MessagesSquare, label: "Content", href: "/content" },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ],
  me_officer: [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: FileBarChart, label: "Surveys", href: "/surveys" },
    { icon: Layers, label: "Projects", href: "/projects" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ],
  recipient: [
    { icon: Layers, label: "My Projects", href: "/projects" },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: FileBarChart, label: "Surveys", href: "/surveys" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ],
};

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  const { userRole } = useAuth();
  
  // Get navigation items based on user role
  const navItems = userRole ? roleBasedNavItems[userRole as keyof typeof roleBasedNavItems] : [];

  return (
    <aside className={`fixed top-0 left-0 z-40 h-screen border-r shadow-sm bg-card transition-all duration-300 ${isOpen ? 'w-64' : 'w-0 md:w-16 overflow-hidden'}`}>
      <div className="flex flex-col h-full relative">
        <div className="absolute right-2 top-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-center h-16 border-b">
          {isOpen ? (
            <h1 className="text-xl font-bold text-primary flex items-center gap-2">
              <span className="bg-primary text-primary-foreground p-1 rounded">CL</span>
              <span>Clareo Non Profit</span>
            </h1>
          ) : (
            <h1 className="text-xl font-bold text-primary flex items-center justify-center">
              <span className="bg-primary text-primary-foreground p-1 rounded">C</span>
            </h1>
          )}
        </div>
        
        <div className="flex-grow p-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "flex items-center py-2 text-sm font-medium rounded-md transition-colors",
                    isOpen ? "px-2" : "px-0 justify-center",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  title={!isOpen ? item.label : undefined}
                >
                  <Icon className={cn("h-5 w-5", isOpen && "mr-3")} />
                  {isOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t">
          {isOpen ? (
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://ui-avatars.com/api/?name=John+Doe"
                  alt="User"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <img
                className="h-8 w-8 rounded-full"
                src="https://ui-avatars.com/api/?name=John+Doe"
                alt="User"
              />
            </div>
          )}
        </div>

        <div className="hidden absolute right-0 top-1/2 transform -translate-y-1/2 md:block">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="h-6 w-6 rounded-full bg-muted p-1"
          >
            <ChevronLeft className={`h-4 w-4 transition-transform ${!isOpen && 'rotate-180'}`} />
          </Button>
        </div>
      </div>
    </aside>
  );
}
