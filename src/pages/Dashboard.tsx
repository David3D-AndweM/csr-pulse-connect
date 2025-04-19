
import { BarChart3, FileText, Users, Target } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProjectsChart } from "@/components/dashboard/ProjectsChart";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useEffect, useState } from "react";
import { projectService } from "@/services/project.service";
import { CSRProject } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { ChartData } from "@/types";

export default function Dashboard() {
  const { data: projects = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getProjects(),
  });
  
  const [projectsByStatusChart, setProjectsByStatusChart] = useState<ChartData>({
    labels: [],
    datasets: [{ label: "Projects by Status", data: [], backgroundColor: [] }],
  });
  
  const [projectsByCategoryChart, setProjectsByCategoryChart] = useState<ChartData>({
    labels: [],
    datasets: [{ label: "Projects by Category", data: [], backgroundColor: [] }],
  });

  // Get the most recent projects
  const recentProjects = projects
    ? [...projects].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ).slice(0, 2)
    : [];

  // Calculate stats and prepare chart data
  useEffect(() => {
    if (projects.length) {
      // For status chart
      const statusCounts: Record<string, number> = {};
      const statusColors = {
        planned: "#30b679",
        "in-progress": "#1e8a5f", 
        completed: "#bef0d7",
        cancelled: "#e74c3c",
      };
      
      projects.forEach(project => {
        statusCounts[project.status] = (statusCounts[project.status] || 0) + 1;
      });
      
      const statusLabels = Object.keys(statusCounts);
      const statusData = Object.values(statusCounts);
      const statusColorArray = statusLabels.map(status => 
        (statusColors as any)[status] || "#cccccc"
      );
      
      setProjectsByStatusChart({
        labels: statusLabels.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
        datasets: [{
          label: "Projects by Status",
          data: statusData,
          backgroundColor: statusColorArray,
        }]
      });
      
      // For category chart
      const categoryCounts: Record<string, number> = {};
      const categoryColors = ["#1e8a5f", "#30b679", "#bef0d7", "#e8f7f0", "#c3e6d9"];
      
      projects.forEach(project => {
        categoryCounts[project.category] = (categoryCounts[project.category] || 0) + 1;
      });
      
      const categoryLabels = Object.keys(categoryCounts);
      const categoryData = Object.values(categoryCounts);
      const categoryColorArray = categoryLabels.map((_, idx) => 
        categoryColors[idx % categoryColors.length]
      );
      
      setProjectsByCategoryChart({
        labels: categoryLabels,
        datasets: [{
          label: "Projects by Category",
          data: categoryData,
          backgroundColor: categoryColorArray,
        }]
      });
    }
  }, [projects]);

  if (isLoadingProjects) {
    return (
      <Layout>
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <Skeleton className="h-80" />
              <Skeleton className="h-80" />
            </div>
          </div>
          <Skeleton className="h-80" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back to your CSR management dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Projects" 
          value={projects.length}
          icon={Target}
          change={{ value: "", positive: true }}
        />
        <StatCard 
          title="Active Projects" 
          value={projects.filter(p => p.status === 'in-progress').length} 
          icon={BarChart3}
          change={{ value: "", positive: true }}
        />
        <StatCard 
          title="Completed Projects" 
          value={projects.filter(p => p.status === 'completed').length} 
          icon={FileText}
          change={{ value: "", positive: true }}
        />
        <StatCard 
          title="Team Members" 
          value={projects.reduce((acc, curr) => {
            curr.assignedUsers.forEach(user => {
              if (!acc.includes(user.id)) acc.push(user.id);
            });
            return acc;
          }, [] as string[]).length} 
          icon={Users}
          change={{ value: "", positive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <ProjectsChart 
              title="Projects by Status" 
              data={projectsByStatusChart} 
            />
            <ProjectsChart 
              title="Projects by Category" 
              data={projectsByCategoryChart} 
            />
          </div>
        </div>
        <RecentActivities />
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Projects</h2>
          <a href="/projects" className="text-sm text-csr-primary font-medium hover:underline">
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentProjects.length > 0 ? (
            recentProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="md:col-span-2 text-center p-8 border border-dashed rounded-lg">
              <p className="text-muted-foreground">No projects found. Create your first project!</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
