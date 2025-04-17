
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentBlogManager } from "@/components/content/ContentBlogManager";
import { ContentTestimonialManager } from "@/components/content/ContentTestimonialManager";
import { ContentProjectsManager } from "@/components/content/ContentProjectsManager";
import { ContentDashboardManager } from "@/components/content/ContentDashboardManager";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Content() {
  const { userRole } = useAuth();
  const [activeTab, setActiveTab] = useState("blog");
  
  // Only editors should access this page
  if (userRole !== "editor") {
    toast.error("You don't have permission to access this page");
    return <Layout>You don't have permission to access this page.</Layout>;
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">
            Manage website content, blogs, testimonials, and featured projects
          </p>
        </div>
        <Button onClick={() => toast.success("Changes published to website")}>
          Publish Changes
        </Button>
      </div>

      <Tabs defaultValue="blog" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 h-auto">
          <TabsTrigger value="blog" className="py-2">Blog Posts</TabsTrigger>
          <TabsTrigger value="testimonials" className="py-2">Testimonials</TabsTrigger>
          <TabsTrigger value="projects" className="py-2">Featured Projects</TabsTrigger>
          <TabsTrigger value="dashboard" className="py-2">Public Dashboard</TabsTrigger>
        </TabsList>
        <TabsContent value="blog" className="border rounded-md p-4">
          <ContentBlogManager />
        </TabsContent>
        <TabsContent value="testimonials" className="border rounded-md p-4">
          <ContentTestimonialManager />
        </TabsContent>
        <TabsContent value="projects" className="border rounded-md p-4">
          <ContentProjectsManager />
        </TabsContent>
        <TabsContent value="dashboard" className="border rounded-md p-4">
          <ContentDashboardManager />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
