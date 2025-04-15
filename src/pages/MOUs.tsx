
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

export default function MOUs() {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Memorandums of Understanding</h1>
          <p className="text-muted-foreground">
            Manage MOUs with partner organizations for external projects
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={16} />
          New MOU
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Active MOUs</CardTitle>
            <CardDescription>Currently active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Approval</CardTitle>
            <CardDescription>Awaiting signatures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expiring Soon</CardTitle>
            <CardDescription>Next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">2</div>
          </CardContent>
        </Card>
      </div>

      <MOUList />
    </Layout>
  );
}
