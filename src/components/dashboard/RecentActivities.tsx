
import { Activity, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  {
    id: 1,
    action: "Report submitted",
    project: "Clean Water Initiative",
    user: "Lisa Brown",
    time: "10 minutes ago",
  },
  {
    id: 2,
    action: "Project updated",
    project: "Education for All",
    user: "Jane Smith",
    time: "1 hour ago",
  },
  {
    id: 3,
    action: "Comment added",
    project: "Clean Water Initiative",
    user: "Robert Johnson",
    time: "3 hours ago",
  },
  {
    id: 4,
    action: "Budget approved",
    project: "Green Energy Initiative",
    user: "John Doe",
    time: "5 hours ago",
  },
];

export function RecentActivities() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <Activity className="h-4 w-4 mr-2" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start p-4 border-t border-gray-100"
            >
              <div className="h-8 w-8 rounded-full bg-csr-light flex items-center justify-center mr-3 flex-shrink-0">
                <Clock className="h-4 w-4 text-csr-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {activity.action} - {activity.project}
                </p>
                <div className="flex items-center mt-1 space-x-1 text-xs">
                  <span className="text-gray-500">by {activity.user}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
