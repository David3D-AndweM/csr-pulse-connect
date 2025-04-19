
import { supabase } from "@/integrations/supabase/client";
import { ChartData } from "@/types";

export const publicDashboardService = {
  async getPublicDashboardData() {
    try {
      const { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "completed");

      if (error) throw error;

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

      return { stats };
    } catch (error) {
      console.error("Error fetching public dashboard data:", error);
      return { stats: [] };
    }
  }
};
