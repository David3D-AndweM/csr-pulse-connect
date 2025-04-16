
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// This page redirects based on user role
const Index = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  useEffect(() => {
    if (userRole) {
      // Redirect based on role
      if (userRole === "recipient") {
        navigate("/projects");
      } else {
        navigate("/dashboard");
      }
    } else {
      // Redirect to login if no user
      navigate("/login");
    }
  }, [navigate, userRole]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Clareo Non Profit</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
