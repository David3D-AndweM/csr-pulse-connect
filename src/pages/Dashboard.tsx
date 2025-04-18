
import { BarChart3, FileText, Users, Target } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProjectsChart } from "@/components/dashboard/ProjectsChart";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { mockProjects, projectsByStatusChartData, projectsByCategoryChartData } from "@/data/mockData";
import { useEffect } from "react";

export default function Dashboard() {
  // Log when the Dashboard component renders
  useEffect(() => {
    console.log("Dashboard component rendered");
  }, []);

  // Get the most recent projects
  const recentProjects = [...mockProjects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 2);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back to your CSR management dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Projects" 
          value={mockProjects.length}
          icon={Target}
          change={{ value: "15%", positive: true }}
        />
        <StatCard 
          title="Active Projects" 
          value={mockProjects.filter(p => p.status === 'in-progress').length} 
          icon={BarChart3}
          change={{ value: "8%", positive: true }}
        />
        <StatCard 
          title="Completed Reports" 
          value="24" 
          icon={FileText}
          change={{ value: "12%", positive: true }}
        />
        <StatCard 
          title="People Impacted" 
          value="5.2K" 
          icon={Users}
          change={{ value: "3%", positive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <ProjectsChart 
              title="Projects by Status" 
              data={projectsByStatusChartData} 
            />
            <ProjectsChart 
              title="Projects by Category" 
              data={projectsByCategoryChartData} 
            />
          </div>
        </div>
        <RecentActivities />
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Projects</h2>
          <button className="text-sm text-csr-primary font-medium hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
