import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types";
import { toast } from "sonner";

export const projectService = {
  async getProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase.from("projects").select("*");

      if (error) throw error;

      // Format the data to match our Project type
      const formattedData: Project[] = await Promise.all(
        data.map(async (project) => {
          let mouName = null;
          let mouStatus = null;

          // Only query MOU if project has a mou_id
          if (project.mou_id) {
            const { data: mouData, error: mouError } = await supabase
              .from("mous")
              .select("title, status")
              .eq("id", project.mou_id)
              .single();

            if (!mouError && mouData) {
              mouName = mouData.title;
              mouStatus = mouData.status;
            }
          }

          return {
            id: project.id,
            title: project.title,
            status: project.status,
            startDate: project.start_date,
            endDate: project.end_date,
            budget: project.budget,
            description: project.description,
            mouId: project.mou_id || null,
            mouName: mouName,
            mouStatus: mouStatus,
          };
        })
      );

      return formattedData;
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects");
      return [];
    }
  },

  async getProjectById(id: string): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      let mouName = null;
      let mouStatus = null;

      // Only query MOU if project has a mou_id
      if (data.mou_id) {
        const { data: mouData, error: mouError } = await supabase
          .from("mous")
          .select("title, status")
          .eq("id", data.mou_id)
          .single();

        if (!mouError && mouData) {
          mouName = mouData.title;
          mouStatus = mouData.status;
        }
      }

      // Format the data to match our Project type
      const project: Project = {
        id: data.id,
        title: data.title,
        status: data.status,
        startDate: data.start_date,
        endDate: data.end_date,
        budget: data.budget,
        description: data.description,
        mouId: data.mou_id || null,
        mouName: mouName,
        mouStatus: mouStatus,
      };

      return project;
    } catch (error) {
      console.error("Error fetching project:", error);
      toast.error("Failed to load project details");
      return null;
    }
  },

  async createProject(project: Omit<Project, "id" | "mouName" | "mouStatus">): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert({
          title: project.title,
          status: project.status,
          start_date: project.startDate,
          end_date: project.endDate,
          budget: project.budget,
          description: project.description,
          mou_id: project.mouId,
        })
        .select("id")
        .single();

      if (error) throw error;

      toast.success("Project created successfully");
      return data.id;
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
      return null;
    }
  },

  async updateProject(id: string, project: Partial<Project>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("projects")
        .update({
          title: project.title,
          status: project.status,
          start_date: project.startDate,
          end_date: project.endDate,
          budget: project.budget,
          description: project.description,
          mou_id: project.mouId,
        })
        .eq("id", id);

      if (error) throw error;

      toast.success("Project updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
      return false;
    }
  },

  async deleteProject(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) throw error;

      toast.success("Project deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
      return false;
    }
  },
};
