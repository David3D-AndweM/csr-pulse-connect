
import { PropsWithChildren, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

export function Layout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
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
