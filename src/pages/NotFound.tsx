
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-csr-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Button asChild className="bg-csr-primary hover:bg-csr-dark">
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
