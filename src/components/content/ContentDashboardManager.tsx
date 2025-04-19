
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function ContentDashboardManager() {
  const [metrics, setMetrics] = useState({
    showProjects: true,
    showBudget: true,
    showCommunities: true,
  });

  const handleToggleMetric = (metric: keyof typeof metrics) => {
    setMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }));
    toast.success(`${metric} visibility updated`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Public Dashboard Configuration</h2>
        <Button onClick={() => toast.success("Dashboard settings saved")}>
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Metrics Visibility</CardTitle>
          <CardDescription>Control which metrics are shown on the public dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="show-projects">Projects Completed</Label>
            <Switch 
              id="show-projects"
              checked={metrics.showProjects}
              onCheckedChange={() => handleToggleMetric('showProjects')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="show-budget">Total Budget Impact</Label>
            <Switch 
              id="show-budget"
              checked={metrics.showBudget}
              onCheckedChange={() => handleToggleMetric('showBudget')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="show-communities">Communities Impacted</Label>
            <Switch 
              id="show-communities"
              checked={metrics.showCommunities}
              onCheckedChange={() => handleToggleMetric('showCommunities')}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
