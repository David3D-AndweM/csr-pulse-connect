import { supabase } from "@/integrations/supabase/client";
import { MOU } from "@/types";
import { toast } from "sonner";

export const mouService = {
  async getMOUs(): Promise<MOU[]> {
    try {
      const { data, error } = await supabase.from("mous").select("*");

      if (error) throw error;

      // Format the data to match our type
      const formattedData: MOU[] = data.map((mou) => ({
        id: mou.id,
        title: mou.title,
        organizationName: mou.organization_name,
        startDate: mou.start_date,
        endDate: mou.end_date,
        status: mou.status as "pending" | "active" | "expired",
        description: mou.description,
        documentUrl: mou.document_url,
        projectIds: mou.project_ids || [],
      }));

      return formattedData;
    } catch (error) {
      console.error("Error fetching MOUs:", error);
      toast.error("Failed to load MOUs");
      return [];
    }
  },

  async getMOUById(id: string): Promise<MOU | null> {
    try {
      const { data, error } = await supabase
        .from("mous")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      // Format the data to match our type
      const mou: MOU = {
        id: data.id,
        title: data.title,
        organizationName: data.organization_name,
        startDate: data.start_date,
        endDate: data.end_date,
        status: data.status as "pending" | "active" | "expired",
        description: data.description,
        documentUrl: data.document_url,
        projectIds: data.project_ids || [],
      };

      return mou;
    } catch (error) {
      console.error("Error fetching MOU:", error);
      toast.error("Failed to load MOU details");
      return null;
    }
  },

  async createMOU(mou: Partial<MOU>): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from("mous")
        .insert({
          title: mou.title,
          organization_name: mou.organizationName,
          start_date: mou.startDate,
          end_date: mou.endDate,
          status: mou.status as "active" | "expired" | "pending",
          description: mou.description,
          document_url: mou.documentUrl,
        })
        .select("id")
        .single();

      if (error) throw error;

      toast.success("MOU created successfully");
      return data.id;
    } catch (error) {
      console.error("Error creating MOU:", error);
      toast.error("Failed to create MOU");
      return null;
    }
  },

  async updateMOU(id: string, mou: Partial<MOU>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("mous")
        .update({
          title: mou.title,
          organization_name: mou.organizationName,
          start_date: mou.startDate,
          end_date: mou.endDate,
          status: mou.status,
          description: mou.description,
          document_url: mou.documentUrl,
        })
        .eq("id", id);

      if (error) throw error;

      toast.success("MOU updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating MOU:", error);
      toast.error("Failed to update MOU");
      return false;
    }
  },

  async deleteMOU(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("mous")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("MOU deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting MOU:", error);
      toast.error("Failed to delete MOU");
      return false;
    }
  }
};
