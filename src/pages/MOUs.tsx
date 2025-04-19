
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
import { MOUList } from "@/components/mous/MOUList";
import { useQuery } from "@tanstack/react-query";
import { mouService } from "@/services/mou.service";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

export default function MOUs() {
  const navigate = useNavigate();
  const { data: mous = [], isLoading } = useQuery({
    queryKey: ["mous"],
    queryFn: () => mouService.getMOUs(),
  });

  // Calculate statistics
  const activeMOUs = mous.filter(mou => mou.status === "active").length;
  const pendingMOUs = mous.filter(mou => mou.status === "pending").length;
  const expiringSoon = mous.filter(mou => {
    const endDate = new Date(mou.endDate);
    const now = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(now.getDate() + 30);
    
    return mou.status === "active" && endDate <= thirtyDaysLater && endDate >= now;
  }).length;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Memorandums of Understanding</h1>
          <p className="text-muted-foreground">
            Manage MOUs with partner organizations for external projects
          </p>
        </div>
        <Button className="gap-2" onClick={() => navigate("/mous/new")}>
          <Plus size={16} />
          New MOU
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
              <CardTitle>Active MOUs</CardTitle>
              <CardDescription>Currently active</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{activeMOUs}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Approval</CardTitle>
              <CardDescription>Awaiting signatures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{pendingMOUs}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Expiring Soon</CardTitle>
              <CardDescription>Next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{expiringSoon}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <MOUList />
    </Layout>
  );
}
