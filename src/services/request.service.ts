
import { supabase } from "@/integrations/supabase/client";
import { Request } from "@/types";
import { toast } from "sonner";

export const requestService = {
  async getRequests(): Promise<Request[]> {
    try {
      const { data, error } = await supabase.from("requests").select("*");

      if (error) throw error;

      // Format the data to match our type
      const formattedData: Request[] = data.map((request) => ({
        id: request.id,
        type: request.type as "Facility" | "Support",
        requester: request.requester,
        facility: request.facility,
        status: request.status as "pending" | "approved" | "rejected",
        submittedAt: request.submitted_at,
        description: request.description,
      }));

      return formattedData;
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests");
      return [];
    }
  },

  async getRequestById(id: string): Promise<Request | null> {
    try {
      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      // Format the data to match our type
      const request: Request = {
        id: data.id,
        type: data.type as "Facility" | "Support",
        requester: data.requester,
        facility: data.facility,
        status: data.status as "pending" | "approved" | "rejected",
        submittedAt: data.submitted_at,
        description: data.description,
      };

      return request;
    } catch (error) {
      console.error("Error fetching request:", error);
      toast.error("Failed to load request details");
      return null;
    }
  },

  async createRequest(request: Omit<Request, "id" | "requester" | "submittedAt">): Promise<string | null> {
    try {
      // Get current user
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData || !userData.user) {
        toast.error("User must be authenticated to create a request");
        return null;
      }
      
      const { data, error } = await supabase
        .from("requests")
        .insert({
          type: request.type,
          facility: request.facility,
          description: request.description,
          status: request.status,
          requester: userData.user.id, // Set requester to current user ID
        })
        .select("id")
        .single();

      if (error) throw error;

      toast.success("Request created successfully");
      return data.id;
    } catch (error) {
      console.error("Error creating request:", error);
      toast.error("Failed to create request");
      return null;
    }
  },

  async updateRequest(id: string, request: Partial<Request>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("requests")
        .update({
          type: request.type,
          facility: request.facility,
          status: request.status,
          description: request.description,
        })
        .eq("id", id);

      if (error) throw error;

      toast.success("Request updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error("Failed to update request");
      return false;
    }
  },

  async deleteRequest(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("requests")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Request deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error("Failed to delete request");
      return false;
    }
  }
};
