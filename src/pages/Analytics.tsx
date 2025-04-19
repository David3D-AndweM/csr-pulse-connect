
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { analyticsService, AnalyticsSummary } from "@/services/analytics.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  BarChart, 
  PieChart,
  LineChart,
  Line,
  Area, 
  Bar, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { ChartData } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState<AnalyticsSummary>({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    pendingRequests: 0,
    surveyResponseRate: 0,
    budgetUtilization: 0
  });
  
  const [categoryData, setCategoryData] = useState<ChartData>({
    labels: [],
    datasets: [{ label: "Projects by Category", data: [], backgroundColor: [] }]
  });
  
  const [statusData, setStatusData] = useState<ChartData>({
    labels: [],
    datasets: [{ label: "Projects by Status", data: [], backgroundColor: [] }]
  });
  
  const [regionData, setRegionData] = useState<ChartData>({
    labels: [],
    datasets: [{ label: "Projects by Region", data: [], backgroundColor: [] }]
  });
  
  const [progressData, setProgressData] = useState<ChartData>({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        
        // Fetch all analytics data in parallel
        const [summary, byCategory, byStatus, byRegion, monthlyProgress] = await Promise.all([
          analyticsService.getSummaryData(),
          analyticsService.getProjectsByCategory(),
          analyticsService.getProjectsByStatus(),
          analyticsService.getProjectsByRegion(),
          analyticsService.getMonthlyProgress()
        ]);
        
        setSummaryData(summary);
        setCategoryData(byCategory);
        setStatusData(byStatus);
        setRegionData(byRegion);
        setProgressData(monthlyProgress);
      } catch (error) {
        console.error("Error loading analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, []);

  // Format data for charts
  const formatCategoryData = categoryData.labels.map((label, i) => ({
    name: label,
    value: categoryData.datasets[0].data[i]
  }));
  
  const formatStatusData = statusData.labels.map((label, i) => ({
    name: label,
    value: statusData.datasets[0].data[i]
  }));
  
  const formatRegionData = regionData.labels.map((label, i) => ({
    name: label,
    value: regionData.datasets[0].data[i]
  }));

  // Format monthly progress data
  const formatProgressData = progressData.labels.map((month, i) => {
    const dataPoint: any = { name: month };
    progressData.datasets.forEach(dataset => {
      dataPoint[dataset.label] = dataset.data[i];
    });
    return dataPoint;
  });
  
  if (loading) {
    return (
      <Layout>
        <div className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Analytics</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[400px]" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.totalProjects}</div>
              <p className="text-xs text-muted-foreground">All projects in the system</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.activeProjects}</div>
              <p className="text-xs text-muted-foreground">Projects in progress</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.budgetUtilization}%</div>
              <p className="text-xs text-muted-foreground">Of allocated budget</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Survey Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.surveyResponseRate}%</div>
              <p className="text-xs text-muted-foreground">Average completion rate</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Projects by Category</CardTitle>
                  <CardDescription>Distribution of projects across categories</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={formatCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {formatCategoryData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={categoryData.datasets[0].backgroundColor[index] as string} 
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Projects by Status</CardTitle>
                  <CardDescription>Current status of all projects</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={formatStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {formatStatusData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={statusData.datasets[0].backgroundColor[index] as string} 
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Distribution</CardTitle>
                <CardDescription>Number of projects by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={formatCategoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name="Number of Projects" 
                        fill="#1e8a5f" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="regions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Projects by Region</CardTitle>
                <CardDescription>Geographic distribution of projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={formatRegionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name="Number of Projects" 
                        fill="#30b679" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Progress Over Time</CardTitle>
                <CardDescription>Monthly progress of active projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formatProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {progressData.datasets.map((dataset, i) => (
                        <Line 
                          key={i}
                          type="monotone" 
                          dataKey={dataset.label} 
                          stroke={dataset.borderColor as string} 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
