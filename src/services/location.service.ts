import { supabase } from "@/integrations/supabase/client";
import { Region } from "@/types";
import { toast } from "sonner";

export type RegionWithProjectCount = Region & {
  projectCount: number;
};

export const locationService = {
  async getRegions(): Promise<RegionWithProjectCount[]> {
    try {
      const { data, error } = await supabase
        .from("regions")
        .select("*");
      
      if (error) throw error;
      
      // Format the data to match our type
      const formattedData: RegionWithProjectCount[] = data.map((region) => ({
        id: region.id,
        name: region.name,
        country: region.country,
        projectCount: region.project_count || 0
      }));
      
      return formattedData;
    } catch (error) {
      console.error("Error fetching regions:", error);
      toast.error("Failed to load regions");
      return [];
    }
  },
  
  async getRegionById(id: string): Promise<RegionWithProjectCount | null> {
    try {
      const { data, error } = await supabase
        .from("regions")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      
      // Format the data to match our type
      const region: RegionWithProjectCount = {
        id: data.id,
        name: data.name,
        country: data.country,
        projectCount: data.project_count || 0
      };
      
      return region;
    } catch (error) {
      console.error("Error fetching region:", error);
      toast.error("Failed to load region details");
      return null;
    }
  },
  
  async createRegion(regionData: Omit<Region, 'id'>): Promise<Region | null> {
    try {
      const { data, error } = await supabase
        .from("regions")
        .insert({
          name: regionData.name,
          country: regionData.country,
          project_count: regionData.project_count || 0
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Region created successfully");
      return data as Region;
    } catch (error) {
      console.error("Error creating region:", error);
      toast.error("Failed to create region");
      return null;
    }
  },
  
  async updateRegion(id: string, region: Partial<Region>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("regions")
        .update({
          name: region.name,
          country: region.country
        })
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success("Region updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating region:", error);
      toast.error("Failed to update region");
      return false;
    }
  },
  
  async deleteRegion(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("regions")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success("Region deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting region:", error);
      toast.error("Failed to delete region");
      return false;
    }
  },
  
  async getProjectsByRegion(regionId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("region_id", regionId);
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error("Error fetching projects for region:", error);
      toast.error("Failed to load region projects");
      return [];
    }
  }
};
