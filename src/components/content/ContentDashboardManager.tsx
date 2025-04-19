
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartData } from "@/types";

export function ContentDashboardManager() {
  const [metrics, setMetrics] = useState({
    showProjects: true,
    showBudget: true,
    showCommunities: true,
  });
  
  const [dashboardData, setDashboardData] = useState<{
    stats: ChartData[];
    selectedProjects: string[];
  } | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { data: projects } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "completed");

      if (!projects) return;
      
      const stats: ChartData[] = [
        {
          labels: ["Total Impact"],
          datasets: [{
            label: "Projects Completed",
            data: [projects.length],
            backgroundColor: "#10b981"
          }]
        },
        {
          labels: ["Budget Invested"],
          datasets: [{
            label: "Total Budget",
            data: [projects.reduce((sum, p) => sum + (p.budget || 0), 0)],
            backgroundColor: "#6366f1"
          }]
        },
        {
          labels: ["Communities"],
          datasets: [{
            label: "Communities Impacted",
            data: [new Set(projects.map(p => p.location)).size],
            backgroundColor: "#f59e0b"
          }]
        }
      ];
      
      setDashboardData({
        stats,
        selectedProjects: projects.slice(0, 5).map(p => p.id)
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMetric = (metric: keyof typeof metrics) => {
    setMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }));
    toast.success(`${metric} visibility updated`);
  };

  const handleSaveChanges = () => {
    // In a real app, you would save these settings to the database
    toast.success("Dashboard settings saved");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Public Dashboard Configuration</h2>
        <Button onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="metrics">
        <TabsList>
          <TabsTrigger value="metrics">Metrics Visibility</TabsTrigger>
          <TabsTrigger value="preview">Dashboard Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics">
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
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Preview</CardTitle>
              <CardDescription>Preview how the public dashboard will appear</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
                  <p className="mt-4 text-muted-foreground">Loading preview...</p>
                </div>
              ) : dashboardData ? (
                <div>
                  <h3 className="text-lg font-medium mb-4">Metrics that will be displayed:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {dashboardData.stats.map((stat, index) => {
                      // Only show metrics that are enabled
                      const metricKey = ['showProjects', 'showBudget', 'showCommunities'][index] as keyof typeof metrics;
                      if (!metrics[metricKey]) return null;
                      
                      return (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-lg">{stat.datasets[0].label}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">{stat.datasets[0].data[0]}</div>
                            <p className="text-muted-foreground">{stat.labels[0]}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                  {!Object.values(metrics).some(v => v) && (
                    <p className="text-center py-4 text-muted-foreground">No metrics are currently enabled to display.</p>
                  )}
                </div>
              ) : (
                <p className="text-center py-4 text-muted-foreground">No dashboard data available.</p>
              )}
              
              <div className="mt-8">
                <Button 
                  onClick={() => window.open('/public/dashboard', '_blank')}
                  variant="outline"
                >
                  View Public Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
