
import { supabase } from "@/integrations/supabase/client";
import { CSRProject, User } from "@/types";
import { toast } from "sonner";

export const projectService = {
  async getProjects(): Promise<CSRProject[]> {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          recipient_id (id, name, email, role, avatar),
          mou_id (id, title, organization_name)
        `);

      if (error) throw error;

      // Process the data to match our type structure
      const formattedData = data.map((project) => {
        // Safely handle potential null or error values for mou_id
        const mouId = project.mou_id && typeof project.mou_id === 'object' && !('error' in project.mou_id) 
          ? project.mou_id.id 
          : undefined;

        return {
          id: project.id,
          title: project.title,
          description: project.description,
          status: project.status,
          progress: project.progress,
          location: project.location,
          category: project.category,
          budget: project.budget,
          startDate: project.start_date,
          endDate: project.end_date,
          createdAt: project.created_at,
          projectType: project.project_type,
          // Populate with empty array by default, we'll fetch assigned users separately
          assignedUsers: [],
          // Format the foreign key references
          mouId,
          recipientId: project.recipient_id?.id,
        };
      });

      // Fetch assigned users for each project
      for (const project of formattedData) {
        const { data: assignmentData, error: assignmentError } = await supabase
          .from("project_assignments")
          .select(`
            user_id,
            profiles:user_id (id, name, email, role, avatar)
          `)
          .eq("project_id", project.id);

        if (!assignmentError && assignmentData) {
          project.assignedUsers = assignmentData.map((assignment) => ({
            id: assignment.profiles.id,
            name: assignment.profiles.name,
            role: assignment.profiles.role,
            email: assignment.profiles.email,
            avatar: assignment.profiles.avatar,
          }));
        }
      }

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
          recipient_id (id, name, email, role, avatar),
          mou_id (id, title, organization_name)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;

      // Safely handle potential null or error values for mou_id
      const mouId = data.mou_id && typeof data.mou_id === 'object' && !('error' in data.mou_id) 
        ? data.mou_id.id 
        : undefined;

      // Format the data to match our type
      const project: CSRProject = {
        id: data.id,
        title: data.title,
        description: data.description,
        status: data.status,
        progress: data.progress,
        location: data.location,
        category: data.category,
        budget: data.budget,
        startDate: data.start_date,
        endDate: data.end_date,
        createdAt: data.created_at,
        projectType: data.project_type,
        assignedUsers: [],
        mouId,
        recipientId: data.recipient_id?.id,
      };

      // Fetch assigned users
      const { data: assignmentData, error: assignmentError } = await supabase
        .from("project_assignments")
        .select(`
          user_id,
          profiles:user_id (id, name, email, role, avatar)
        `)
        .eq("project_id", id);

      if (!assignmentError && assignmentData) {
        project.assignedUsers = assignmentData.map((assignment) => ({
          id: assignment.profiles.id,
          name: assignment.profiles.name,
          role: assignment.profiles.role,
          email: assignment.profiles.email,
          avatar: assignment.profiles.avatar,
        }));
      }

      return project;
    } catch (error) {
      console.error("Error fetching project:", error);
      toast.error("Failed to load project details");
      return null;
    }
  },

  async createProject(project: Partial<CSRProject>): Promise<string | null> {
    try {
      // First, insert the project data
      const { data, error } = await supabase
        .from("projects")
        .insert({
          title: project.title,
          description: project.description,
          status: project.status || "planned",
          progress: project.progress || 0,
          location: project.location,
          category: project.category,
          budget: project.budget,
          start_date: project.startDate,
          end_date: project.endDate,
          project_type: project.projectType,
          mou_id: project.mouId,
          recipient_id: project.recipientId,
        })
        .select("id")
        .single();

      if (error) throw error;

      // Then, if there are assigned users, create the assignments
      if (project.assignedUsers && project.assignedUsers.length > 0) {
        const assignments = project.assignedUsers.map((user) => ({
          project_id: data.id,
          user_id: user.id,
        }));

        const { error: assignmentError } = await supabase
          .from("project_assignments")
          .insert(assignments);

        if (assignmentError) throw assignmentError;
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
      // Update the project data
      const { error } = await supabase
        .from("projects")
        .update({
          title: project.title,
          description: project.description,
          status: project.status,
          progress: project.progress,
          location: project.location,
          category: project.category,
          budget: project.budget,
          start_date: project.startDate,
          end_date: project.endDate,
          project_type: project.projectType,
          mou_id: project.mouId,
          recipient_id: project.recipientId,
        })
        .eq("id", id);

      if (error) throw error;

      // If assigned users are provided, update the assignments
      if (project.assignedUsers) {
        // First, delete all existing assignments
        const { error: deleteError } = await supabase
          .from("project_assignments")
          .delete()
          .eq("project_id", id);

        if (deleteError) throw deleteError;

        // Then, insert the new assignments
        if (project.assignedUsers.length > 0) {
          const assignments = project.assignedUsers.map((user) => ({
            project_id: id,
            user_id: user.id,
          }));

          const { error: assignmentError } = await supabase
            .from("project_assignments")
            .insert(assignments);

          if (assignmentError) throw assignmentError;
        }
      }

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
      // Delete the project
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
