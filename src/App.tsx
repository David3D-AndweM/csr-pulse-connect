
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Content from "./pages/public/Blog";
import Blog from "./pages/public/Blog";
import PublicDashboard from "./pages/public/PublicDashboard";
import Landing from "./pages/public/Landing";

// Create a new QueryClient instance here instead of at the top level
const App = () => {
  // Create the client inside the component
  const queryClient = new QueryClient();
  
  return (
    <React.StrictMode>
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
                  {/* This route redirects to the index page which handles role-based redirections */}
                  <Route path="/app" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
