
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  useEffect(() => {
    if (userRole) {
      // Enhanced role-based routing
      switch (userRole) {
        case "manager":
          // CSR Manager has full access to dashboard
          navigate("/dashboard");
          break;
        case "editor":
          // Editor goes to content management
          navigate("/content");
          break;
        case "me_officer":
          // M&E Officer goes to surveys/monitoring
          navigate("/surveys");
          break;
        case "recipient":
          // Recipients only see their projects
          navigate("/projects");
          break;
        default:
          navigate("/login");
      }
    } else {
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
