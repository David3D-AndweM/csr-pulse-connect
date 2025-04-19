
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ChartData } from "@/types";

export type AnalyticsSummary = {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pendingRequests: number;
  surveyResponseRate: number;
  budgetUtilization: number;
};

export type ProjectsByCategory = {
  category: string;
  count: number;
};

export type ProjectsByStatus = {
  status: string;
  count: number;
};

export type ProjectsByRegion = {
  region: string;
  count: number;
};

export type MonthlyProgress = {
  month: string;
  progress: number;
  projectId: string;
  projectTitle: string;
};

export const analyticsService = {
  async getSummaryData(): Promise<AnalyticsSummary> {
    try {
      // Get project counts
      const { data: projects, error: projectsError } = await supabase
        .from("projects")
        .select("status");
      
      if (projectsError) throw projectsError;
      
      // Get request counts
      const { count: pendingRequests, error: requestsError } = await supabase
        .from("requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");
      
      if (requestsError) throw requestsError;
      
      // Get survey response data
      const { data: surveys, error: surveysError } = await supabase
        .from("surveys")
        .select("id");
      
      if (surveysError) throw surveysError;
      
      const { count: totalResponses, error: responsesError } = await supabase
        .from("survey_responses")
        .select("*", { count: "exact", head: true });
      
      if (responsesError) throw responsesError;
      
      // Calculate survey response rate (simplified calculation)
      const surveyResponseRate = surveys.length > 0 ? 
        Math.min(Math.round((totalResponses || 0) / (surveys.length * 10) * 100), 100) : 0;
      
      // Get total budget and utilized budget for budget utilization
      const { data: budgetData, error: budgetError } = await supabase
        .from("projects")
        .select("budget, status");
        
      if (budgetError) throw budgetError;
      
      const totalBudget = budgetData.reduce((sum, project) => sum + (project.budget || 0), 0);
      const utilizedBudget = budgetData
        .filter(project => ["in-progress", "completed"].includes(project.status))
        .reduce((sum, project) => sum + (project.budget || 0), 0);
      
      const budgetUtilization = totalBudget > 0 ? Math.round((utilizedBudget / totalBudget) * 100) : 0;
      
      return {
        totalProjects: projects.length,
        activeProjects: projects.filter(p => p.status === "in-progress").length,
        completedProjects: projects.filter(p => p.status === "completed").length,
        pendingRequests: pendingRequests || 0,
        surveyResponseRate,
        budgetUtilization
      };
    } catch (error) {
      console.error("Error fetching analytics summary:", error);
      toast.error("Failed to load analytics summary");
      return {
        totalProjects: 0,
        activeProjects: 0,
        completedProjects: 0,
        pendingRequests: 0,
        surveyResponseRate: 0,
        budgetUtilization: 0
      };
    }
  },
  
  async getProjectsByCategory(): Promise<ChartData> {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("category");
      
      if (error) throw error;
      
      // Count projects by category
      const categoryCounts: Record<string, number> = {};
      data.forEach(project => {
        categoryCounts[project.category] = (categoryCounts[project.category] || 0) + 1;
      });
      
      const categoryColors = ["#1e8a5f", "#30b679", "#bef0d7", "#e8f7f0", "#c3e6d9", "#72c9a5"];
      
      return {
        labels: Object.keys(categoryCounts),
        datasets: [{
          label: "Projects by Category",
          data: Object.values(categoryCounts),
          backgroundColor: Object.keys(categoryCounts).map((_, idx) => 
            categoryColors[idx % categoryColors.length]
          ),
        }]
      };
    } catch (error) {
      console.error("Error fetching projects by category:", error);
      toast.error("Failed to load category analytics");
      return {
        labels: [],
        datasets: [{ label: "Projects by Category", data: [], backgroundColor: [] }]
      };
    }
  },
  
  async getProjectsByStatus(): Promise<ChartData> {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("status");
      
      if (error) throw error;
      
      // Count projects by status
      const statusCounts: Record<string, number> = {};
      data.forEach(project => {
        statusCounts[project.status] = (statusCounts[project.status] || 0) + 1;
      });
      
      const statusColors = {
        planned: "#30b679",
        "in-progress": "#1e8a5f", 
        completed: "#bef0d7",
        cancelled: "#e74c3c"
      };
      
      const statusLabels = Object.keys(statusCounts);
      const statusData = Object.values(statusCounts);
      const statusColorArray = statusLabels.map(status => 
        (statusColors as any)[status] || "#cccccc"
      );
      
      return {
        labels: statusLabels.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
        datasets: [{
          label: "Projects by Status",
          data: statusData,
          backgroundColor: statusColorArray,
        }]
      };
    } catch (error) {
      console.error("Error fetching projects by status:", error);
      toast.error("Failed to load status analytics");
      return {
        labels: [],
        datasets: [{ label: "Projects by Status", data: [], backgroundColor: [] }]
      };
    }
  },
  
  async getProjectsByRegion(): Promise<ChartData> {
    try {
      const { data: projects, error: projectsError } = await supabase
        .from("projects")
        .select("location");
      
      if (projectsError) throw projectsError;
      
      const { data: regions, error: regionsError } = await supabase
        .from("regions")
        .select("name");
      
      if (regionsError) throw regionsError;
      
      // Count projects by region/location
      const regionCounts: Record<string, number> = {};
      projects.forEach(project => {
        regionCounts[project.location] = (regionCounts[project.location] || 0) + 1;
      });
      
      const regionColors = ["#1e8a5f", "#30b679", "#bef0d7", "#e8f7f0", "#c3e6d9"];
      
      return {
        labels: Object.keys(regionCounts),
        datasets: [{
          label: "Projects by Region",
          data: Object.values(regionCounts),
          backgroundColor: Object.keys(regionCounts).map((_, idx) => 
            regionColors[idx % regionColors.length]
          ),
        }]
      };
    } catch (error) {
      console.error("Error fetching projects by region:", error);
      toast.error("Failed to load regional analytics");
      return {
        labels: [],
        datasets: [{ label: "Projects by Region", data: [], backgroundColor: [] }]
      };
    }
  },
  
  async getMonthlyProgress(): Promise<ChartData> {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, progress, created_at, status")
        .order("created_at", { ascending: true });
      
      if (error) throw error;
      
      // Prepare data for chart
      // This is simplified - a real implementation would track progress over time
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentDate = new Date();
      const monthsToShow = 6; // Show last 6 months
      
      const months = Array(monthsToShow).fill(0).map((_, i) => {
        const d = new Date();
        d.setMonth(currentDate.getMonth() - (monthsToShow - 1 - i));
        return monthNames[d.getMonth()];
      });
      
      // Get active projects for the chart
      const activeProjects = data.filter(p => p.status === "in-progress").slice(0, 2);
      
      const datasets = activeProjects.map((project, idx) => {
        const startProgress = 10; // Assume starting progress
        const monthlyIncrement = (project.progress - startProgress) / monthsToShow;
        
        const progressData = months.map((_, i) => 
          Math.min(Math.round(startProgress + (monthlyIncrement * (i + 1))), project.progress)
        );
        
        return {
          label: project.title,
          data: progressData,
          borderColor: idx === 0 ? "#1e8a5f" : "#30b679",
          backgroundColor: idx === 0 ? "rgba(30, 138, 95, 0.1)" : "rgba(48, 182, 121, 0.1)",
          borderWidth: 2,
        };
      });
      
      return {
        labels: months,
        datasets: datasets.length > 0 ? datasets : [{
          label: "No active projects",
          data: Array(months.length).fill(0),
          borderColor: "#cccccc",
          backgroundColor: "rgba(204, 204, 204, 0.1)",
          borderWidth: 2,
        }]
      };
    } catch (error) {
      console.error("Error fetching monthly progress data:", error);
      toast.error("Failed to load progress analytics");
      return {
        labels: [],
        datasets: []
      };
    }
  }
};
