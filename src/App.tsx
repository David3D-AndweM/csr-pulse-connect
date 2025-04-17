
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Locations from "./pages/Locations";
import Requests from "./pages/Requests";
import Surveys from "./pages/Surveys";
import MOUs from "./pages/MOUs";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Content from "./pages/Content";
import Blog from "./pages/public/Blog";
import PublicDashboard from "./pages/public/PublicDashboard";
import Landing from "./pages/public/Landing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/surveys" element={<Surveys />} />
              <Route path="/mous" element={<MOUs />} />
              <Route path="/content" element={<Content />} />
              <Route path="/public/blog" element={<Blog />} />
              <Route path="/public/dashboard" element={<PublicDashboard />} />
              <Route path="/app" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
