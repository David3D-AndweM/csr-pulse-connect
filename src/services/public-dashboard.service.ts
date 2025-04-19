
import { supabase } from "@/integrations/supabase/client";
import { ChartData } from "@/types";
import { toast } from "sonner";

export const publicDashboardService = {
  async getPublicDashboardData() {
    try {
      console.log("Fetching public dashboard data...");
      const { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "completed");

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Projects fetched:", projects);
      
      // Default stats if there are no projects
      let stats: ChartData[] = [];
      
      if (projects && projects.length > 0) {
        stats = [
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
      } else {
        // Sample data when no projects are available
        stats = [
          {
            labels: ["Total Impact"],
            datasets: [{
              label: "Projects Completed",
              data: [12],
              backgroundColor: "#10b981"
            }]
          },
          {
            labels: ["Budget Invested"],
            datasets: [{
              label: "Total Budget",
              data: [1250000],
              backgroundColor: "#6366f1"
            }]
          },
          {
            labels: ["Communities"],
            datasets: [{
              label: "Communities Impacted",
              data: [8],
              backgroundColor: "#f59e0b"
            }]
          }
        ];
      }

      return { 
        stats, 
        selectedProjects: projects?.slice(0, 5).map(p => p.id) || []
      };
    } catch (error) {
      console.error("Error fetching public dashboard data:", error);
      toast.error("Failed to load dashboard data");
      
      // Return sample data in case of error
      return { 
        stats: [
          {
            labels: ["Total Impact"],
            datasets: [{
              label: "Projects Completed",
              data: [12],
              backgroundColor: "#10b981"
            }]
          },
          {
            labels: ["Budget Invested"],
            datasets: [{
              label: "Total Budget",
              data: [1250000],
              backgroundColor: "#6366f1"
            }]
          },
          {
            labels: ["Communities"],
            datasets: [{
              label: "Communities Impacted",
              data: [8],
              backgroundColor: "#f59e0b"
            }]
          }
        ],
        selectedProjects: []
      };
    }
  }
};
