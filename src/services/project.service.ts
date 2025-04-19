
import { supabase } from "@/integrations/supabase/client";
import { CSRProject } from "@/types";
import { toast } from "sonner";

export const projectService = {
  async getProjects(): Promise<CSRProject[]> {
    try {
      const { data, error } = await supabase.from("projects").select(`
        *,
        assignedUsers:project_assignments(user_id)
      `);

      if (error) throw error;

      // Format the data to match our type
      const formattedData: CSRProject[] = data.map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description || "",
        status: project.status,
        progress: project.progress,
        budget: project.budget,
        location: project.location,
        category: project.category,
        projectType: project.project_type,
        startDate: project.start_date,
        endDate: project.end_date,
        createdAt: project.created_at,
        assignedUsers: (project.assignedUsers || []).map((assignment: any) => ({
          id: assignment.user_id,
          name: "",
          email: "",
          role: ""
        })),
        mouId: project.mou_id || null,
        recipientId: project.recipient_id || null,
      }));

      return formattedData;
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects");
      return [];
    }
  },

  async getProjectById(id: string): Promise<CSRProject | null> {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          assignedUsers:project_assignments(user_id)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;

      // Format the data to match our type
      const project: CSRProject = {
        id: data.id,
        title: data.title,
        description: data.description || "",
        status: data.status,
        progress: data.progress,
        budget: data.budget,
        location: data.location,
        category: data.category, 
        projectType: data.project_type,
        startDate: data.start_date,
        endDate: data.end_date,
        createdAt: data.created_at,
        assignedUsers: (data.assignedUsers || []).map((assignment: any) => ({
          id: assignment.user_id,
          name: "",
          email: "",
          role: ""
        })),
        mouId: data.mou_id || null,
        recipientId: data.recipient_id || null,
      };

      return project;
    } catch (error) {
      console.error("Error fetching project:", error);
      toast.error("Failed to load project details");
      return null;
    }
  },

  async createProject(project: Partial<CSRProject>): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert({
          title: project.title,
          description: project.description,
          status: project.status,
          progress: project.progress || 0,
          budget: project.budget,
          location: project.location,
          category: project.category,
          project_type: project.projectType,
          start_date: project.startDate,
          end_date: project.endDate,
          mou_id: project.mouId,
          recipient_id: project.recipientId,
        })
        .select("id")
        .single();

      if (error) throw error;

      // Add assigned users if any
      if (project.assignedUsers && project.assignedUsers.length > 0) {
        const assignmentData = project.assignedUsers.map(user => ({
          project_id: data.id,
          user_id: user.id
        }));

        const { error: assignmentError } = await supabase
          .from("project_assignments")
          .insert(assignmentData);

        if (assignmentError) {
          console.error("Error assigning users to project:", assignmentError);
        }
      }

      toast.success("Project created successfully");
      return data.id;
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
      return null;
    }
  },

  async updateProject(id: string, project: Partial<CSRProject>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("projects")
        .update({
          title: project.title,
          description: project.description,
          status: project.status,
          progress: project.progress,
          budget: project.budget,
          location: project.location,
          category: project.category,
          project_type: project.projectType,
          start_date: project.startDate,
          end_date: project.endDate,
          mou_id: project.mouId,
          recipient_id: project.recipientId,
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
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Project deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
      return false;
    }
  }
};
