
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { RequestList } from "@/components/requests/RequestList";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { requestService } from "@/services/request.service";
import { Skeleton } from "@/components/ui/skeleton";

export default function Requests() {
  const navigate = useNavigate();
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: () => requestService.getRequests(),
  });

  // Calculate statistics
  const pendingRequests = requests.filter(req => req.status === "pending").length;
  const approvedRequests = requests.filter(req => req.status === "approved").length;
  
  // Calculate average processing time (for approved requests)
  const calculateAverageProcessingDays = () => {
    const approvedReqs = requests.filter(req => req.status === "approved");
    if (approvedReqs.length === 0) return "N/A";
    
    // We don't have access to the actual "approved date", so this is a placeholder
    // In a real application, you would calculate based on submission date and approval date
    return "2.3 days";
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Facility Requests</h1>
          <p className="text-muted-foreground">
            Manage and track facility usage and support requests
          </p>
        </div>
        <Button onClick={() => navigate("/requests/new")} className="gap-2">
          <Plus size={16} />
          New Request
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-40" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending</CardTitle>
              <CardDescription>{pendingRequests} requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{pendingRequests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Approved</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{approvedRequests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Processing Time</CardTitle>
              <CardDescription>Average</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{calculateAverageProcessingDays()}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <RequestList />
    </Layout>
  );
}
