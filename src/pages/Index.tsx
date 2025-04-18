
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { userRole, loading } = useAuth();

  useEffect(() => {
    // Don't redirect until auth loading is complete
    if (loading) {
      console.log("Auth is still loading, waiting...");
      return;
    }

    console.log("Routing user with role:", userRole);
    
    if (userRole) {
      // Enhanced role-based routing
      switch (userRole) {
        case "manager":
        case "csr_manager":
          console.log("Redirecting to dashboard as manager");
          navigate("/dashboard");
          break;
        case "editor":
          console.log("Redirecting to content as editor");
          navigate("/content");
          break;
        case "me_officer":
          console.log("Redirecting to surveys as M&E officer");
          navigate("/surveys");
          break;
        case "recipient":
          console.log("Redirecting to projects as recipient");
          navigate("/projects");
          break;
        default:
          console.log(`Unknown role: ${userRole}, redirecting to login`);
          navigate("/login");
      }
    } else {
      console.log("No user role found, redirecting to login");
      navigate("/login");
    }
  }, [navigate, userRole, loading]);

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
