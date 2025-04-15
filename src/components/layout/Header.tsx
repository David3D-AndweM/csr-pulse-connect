
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockNotifications } from "@/data/mockData";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ReactNode } from "react";

const unreadNotifications = mockNotifications.filter(n => !n.read).length;

interface HeaderProps {
  children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="bg-background border-b py-3 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center flex-1">
        {children}
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 bg-muted/50"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">
          New Project
        </Button>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
