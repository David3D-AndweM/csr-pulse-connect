import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This page redirects to the dashboard
const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-csr-primary mb-4">CSR Pulse Connect</h1>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );
};

export default Index;
