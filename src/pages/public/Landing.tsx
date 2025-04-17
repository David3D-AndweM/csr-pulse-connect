import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, CheckCircle, Globe, Mail, Users } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Navigation Bar with Glass Effect */}
      <nav className="glass-morphism fixed top-0 left-0 right-0 z-50">
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

      {/* Hero Section with Enhanced Glassmorphism */}
      <section className="container py-24 md:py-32 space-y-8 glass-card relative z-10">
        <div className="max-w-3xl curved-border soft-shadow p-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Empowering Zambian Communities</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mt-6">
            Through strategic impact management and community-driven initiatives
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/login")} 
              className="glass-morphism gap-2 hover:scale-105 transition-transform"
            >
              Access Dashboard <ArrowRight size={18} />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate("/public/dashboard")} 
              className="glass-morphism gap-2 hover:scale-105 transition-transform"
            >
              View Our Impact <BarChart3 size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section with Blur and Curves */}
      <section className="bg-muted/50 py-24 curved-border">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 glass-card p-4 inline-block">How We Make An Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: CheckCircle, 
                title: "Community Projects", 
                description: "Supporting sustainable development through community-led initiatives across Zambia."
              },
              { 
                icon: Users, 
                title: "Partnerships", 
                description: "Collaborating with local organizations and international partners to maximize impact."
              },
              { 
                icon: BarChart3, 
                title: "Transparent Reporting", 
                description: "Providing clear insights into our projects and impact through comprehensive reporting."
              }
            ].map(({ icon: Icon, title, description }, index) => (
              <div 
                key={title} 
                className={`glass-card p-6 transform transition-all duration-300 hover:scale-105 hover:rotate-${index % 2 === 0 ? '1' : '-1'}`}
              >
                <Icon className="h-12 w-12 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
                <p className="text-muted-foreground text-center">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Glass Design */}
      <section className="container py-24 text-center glass-card">
        <h2 className="text-3xl font-bold mb-4 glass-morphism p-4 inline-block">Ready to Get Involved?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Whether you're a community partner, donor, or volunteer, we welcome your participation.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg" 
            onClick={() => navigate("/login")} 
            className="glass-morphism hover:scale-110 transition-transform"
          >
            Login to Dashboard
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            asChild 
            className="glass-morphism hover:scale-110 transition-transform"
          >
            <a href="mailto:contact@clareo.org" className="flex items-center gap-2">
              <Mail size={18} />
              Contact Us
            </a>
          </Button>
        </div>
      </section>

      {/* Footer with Soft Blur */}
      <footer className="glass-morphism py-12">
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
