
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from "recharts";

export function ContentDashboardManager() {
  const [visibleCharts, setVisibleCharts] = useState({
    projectsByCategory: true,
    projectsByRegion: true,
    budgetAllocation: true,
    impactMetrics: true,
    completionRate: true,
    yearlyProgress: true,
  });

  const handleToggleChart = (chartKey: keyof typeof visibleCharts) => {
    setVisibleCharts({
      ...visibleCharts,
      [chartKey]: !visibleCharts[chartKey]
    });
    toast.success(`Chart ${visibleCharts[chartKey] ? "hidden" : "visible"} on public dashboard`);
  };

  const [chartConfigurations, setChartConfigurations] = useState({
    colors: {
      primary: "#9b87f5",
      secondary: "#7E69AB",
      tertiary: "#6E59A5",
      quaternary: "#D6BCFA",
      success: "#10b981",
      warning: "#f59e0b",
      danger: "#ef4444",
      info: "#0ea5e9"
    },
    showLabels: true,
    showLegend: true,
    animationEnabled: true
  });

  // Sample data
  const categoryData = [
    { name: "Education", value: 25 },
    { name: "Healthcare", value: 30 },
    { name: "Environment", value: 15 },
    { name: "Infrastructure", value: 20 },
    { name: "Agriculture", value: 10 }
  ];

  const regionData = [
    { name: "Northern", value: 15 },
    { name: "Southern", value: 25 },
    { name: "Eastern", value: 18 },
    { name: "Western", value: 22 },
    { name: "Central", value: 20 }
  ];

  const progressData = [
    { name: "Jan", value: 10 },
    { name: "Feb", value: 15 },
    { name: "Mar", value: 25 },
    { name: "Apr", value: 30 },
    { name: "May", value: 40 },
    { name: "Jun", value: 45 },
    { name: "Jul", value: 55 },
    { name: "Aug", value: 65 },
    { name: "Sep", value: 70 },
    { name: "Oct", value: 80 },
    { name: "Nov", value: 85 },
    { name: "Dec", value: 95 }
  ];

  const impactData = [
    { name: "People Reached", completed: 10500, target: 15000 },
    { name: "Trees Planted", completed: 8500, target: 10000 },
    { name: "Schools Built", completed: 25, target: 30 },
    { name: "Water Sources", completed: 45, target: 50 }
  ];
  
  const COLORS = [
    chartConfigurations.colors.primary,
    chartConfigurations.colors.secondary,
    chartConfigurations.colors.tertiary,
    chartConfigurations.colors.quaternary,
    chartConfigurations.colors.info
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Public Dashboard Configuration</h2>
        <Button onClick={() => toast.success("Dashboard configuration saved")}>
          Save Configuration
        </Button>
      </div>
      
      <Tabs defaultValue="visibility">
        <TabsList>
          <TabsTrigger value="visibility">Visibility</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="data">Data Sources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visibility" className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">Toggle which charts and metrics are visible on the public dashboard.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Projects by Category</CardTitle>
                  <Switch 
                    checked={visibleCharts.projectsByCategory} 
                    onCheckedChange={() => handleToggleChart('projectsByCategory')} 
                  />
                </div>
                <CardDescription>Pie chart showing project distribution by category</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                {visibleCharts.projectsByCategory && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={chartConfigurations.showLabels}
                        label={chartConfigurations.showLabels ? ({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%` : false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      {chartConfigurations.showLegend && <Legend />}
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Projects by Region</CardTitle>
                  <Switch 
                    checked={visibleCharts.projectsByRegion} 
                    onCheckedChange={() => handleToggleChart('projectsByRegion')} 
                  />
                </div>
                <CardDescription>Regional distribution of projects</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                {visibleCharts.projectsByRegion && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={regionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      {chartConfigurations.showLabels && <Tooltip />}
                      {chartConfigurations.showLegend && <Legend />}
                      <Bar dataKey="value" name="Projects" fill={chartConfigurations.colors.primary} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Yearly Progress</CardTitle>
                  <Switch 
                    checked={visibleCharts.yearlyProgress} 
                    onCheckedChange={() => handleToggleChart('yearlyProgress')} 
                  />
                </div>
                <CardDescription>Project completion progress over time</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                {visibleCharts.yearlyProgress && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={progressData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      {chartConfigurations.showLabels && <Tooltip />}
                      {chartConfigurations.showLegend && <Legend />}
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Completion %" 
                        stroke={chartConfigurations.colors.success} 
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Impact Metrics</CardTitle>
                  <Switch 
                    checked={visibleCharts.impactMetrics} 
                    onCheckedChange={() => handleToggleChart('impactMetrics')} 
                  />
                </div>
                <CardDescription>Key impact metrics vs targets</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                {visibleCharts.impactMetrics && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={impactData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      {chartConfigurations.showLabels && <Tooltip />}
                      {chartConfigurations.showLegend && <Legend />}
                      <Bar dataKey="completed" name="Completed" fill={chartConfigurations.colors.primary} />
                      <Bar dataKey="target" name="Target" fill={chartConfigurations.colors.quaternary} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">Customize the appearance of your public dashboard.</p>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Chart Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-labels">Show Data Labels</Label>
                <Switch 
                  id="show-labels" 
                  checked={chartConfigurations.showLabels} 
                  onCheckedChange={(checked) => setChartConfigurations({
                    ...chartConfigurations,
                    showLabels: checked
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="show-legend">Show Legend</Label>
                <Switch 
                  id="show-legend" 
                  checked={chartConfigurations.showLegend} 
                  onCheckedChange={(checked) => setChartConfigurations({
                    ...chartConfigurations,
                    showLegend: checked
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="animation">Enable Animations</Label>
                <Switch 
                  id="animation" 
                  checked={chartConfigurations.animationEnabled} 
                  onCheckedChange={(checked) => setChartConfigurations({
                    ...chartConfigurations,
                    animationEnabled: checked
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">Configure data sources for the public dashboard metrics.</p>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Data Refresh Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Refresh Frequency</Label>
                <div className="flex space-x-2">
                  <Button variant="outline">Daily</Button>
                  <Button variant="default">Weekly</Button>
                  <Button variant="outline">Monthly</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Data Source</Label>
                <div className="flex space-x-2">
                  <Button variant="default">Live Data</Button>
                  <Button variant="outline">Snapshot</Button>
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" onClick={() => toast.success("Data refreshed")}>
                  Refresh Data Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
