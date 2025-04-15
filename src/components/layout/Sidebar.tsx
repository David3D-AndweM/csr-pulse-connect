
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3,
  FileText, 
  Home, 
  Layers, 
  MapPin, 
  MessagesSquare, 
  Settings, 
  Users 
} from "lucide-react";
import { mockNotifications } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const unreadNotifications = mockNotifications.filter(n => !n.read).length;

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Layers, label: "Projects", href: "/projects" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: MapPin, label: "Locations", href: "/locations" },
  { icon: MessagesSquare, label: "Content", href: "/content" },
  { icon: Users, label: "User Management", href: "/users" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold text-csr-primary flex items-center gap-2">
            <span className="bg-csr-primary text-white p-1 rounded">CSR</span>
            <span>Pulse Connect</span>
          </h1>
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
                    "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-csr-accent text-csr-primary"
                      : "text-gray-600 hover:bg-csr-light hover:text-csr-primary"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src="https://ui-avatars.com/api/?name=John+Doe"
                alt="User"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto relative"
            >
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                {unreadNotifications}
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
