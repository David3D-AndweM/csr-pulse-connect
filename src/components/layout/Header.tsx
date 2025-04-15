
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockNotifications } from "@/data/mockData";

const unreadNotifications = mockNotifications.filter(n => !n.read).length;

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 bg-gray-50 border-gray-200"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" className="border-gray-200">
          New Project
        </Button>
        
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
