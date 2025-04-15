
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
import { SurveyList } from "@/components/surveys/SurveyList";

export default function Surveys() {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Surveys</h1>
          <p className="text-muted-foreground">
            Create and manage surveys for project feedback and evaluation
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={16} />
          New Survey
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Surveys</CardTitle>
            <CardDescription>Currently running</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Response Rate</CardTitle>
            <CardDescription>Average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">76%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Responses</CardTitle>
            <CardDescription>Awaiting completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">12</div>
          </CardContent>
        </Card>
      </div>

      <SurveyList />
    </Layout>
  );
}
