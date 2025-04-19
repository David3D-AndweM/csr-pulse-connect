
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Globe, BarChart3, PieChart, Users } from "lucide-react";
import { PublicImpactDashboard } from "@/components/public/PublicImpactDashboard";
import { publicDashboardService } from "@/services/public-dashboard.service";
import { ChartData } from "@/types";

export default function PublicDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<{
    stats: ChartData[];
    selectedProjects: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await publicDashboardService.getPublicDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Clareo Non Profit</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
            <Button variant="ghost" onClick={() => navigate("/public/blog")}>Blog</Button>
            <Button variant="default" onClick={() => navigate("/login")} className="gap-2">
              Login <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="container py-16 md:py-24 space-y-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Our Impact Dashboard</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mt-6">
            Transparent reporting on our initiatives and their impact in Zambian communities
          </p>
        </div>
      </section>

      {/* Main Dashboard Content */}
      {loading ? (
        <div className="container py-12 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard data...</p>
        </div>
      ) : dashboardData && dashboardData.stats.length > 0 ? (
        <div className="container mb-20">
          <PublicImpactDashboard data={dashboardData} />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <PieChart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Project Distribution</h3>
              <p className="text-muted-foreground">Our projects cover a wide range of sectors including education, healthcare, and infrastructure.</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Community Engagement</h3>
              <p className="text-muted-foreground">We work directly with local communities to ensure our initiatives address their most pressing needs.</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Impact Measurement</h3>
              <p className="text-muted-foreground">We use rigorous data collection and analysis to measure the real impact of our work.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container py-12 text-center">
          <p className="text-muted-foreground">No dashboard data available at this time.</p>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Globe className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Clareo Non Profit</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Regtech Foundation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
