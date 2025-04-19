import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Globe, Mail, Users, CheckCircle, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { PublicImpactDashboard } from "@/components/public/PublicImpactDashboard";
import { publicDashboardService } from "@/services/public-dashboard.service";

export default function Landing() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const data = await publicDashboardService.getPublicDashboardData();
      setDashboardData(data);
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
            <Button variant="ghost" onClick={() => navigate("/public/blog")}>Blog</Button>
            <Button variant="ghost" onClick={() => navigate("/public/dashboard")}>Impact</Button>
            <Button variant="default" onClick={() => navigate("/login")} className="gap-2">
              Login <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="container py-24 md:py-32 space-y-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Empowering Zambian Communities</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mt-6">
            Through strategic impact management and community-driven initiatives
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" onClick={() => navigate("/login")} className="gap-2">
              Access Dashboard <ArrowRight size={18} />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/public/dashboard")} className="gap-2">
              View Our Impact <BarChart3 size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Dashboard */}
      <PublicImpactDashboard data={dashboardData} />

      {/* Features Section */}
      <section className="bg-muted/50 py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How We Make An Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Community Projects</h3>
              <p className="text-muted-foreground">Supporting sustainable development through community-led initiatives across Zambia.</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Partnerships</h3>
              <p className="text-muted-foreground">Collaborating with local organizations and international partners to maximize impact.</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Transparent Reporting</h3>
              <p className="text-muted-foreground">Providing clear insights into our projects and impact through comprehensive reporting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Involved?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Whether you're a community partner, donor, or volunteer, we welcome your participation.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={() => navigate("/login")}>
            Login to Dashboard
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="mailto:contact@clareo.org" className="flex items-center gap-2">
              <Mail size={18} />
              Contact Us
            </a>
          </Button>
        </div>
      </section>

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
