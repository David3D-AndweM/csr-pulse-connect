
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types";
import { toast } from "sonner";

export const userService = {
  async getUsers(): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*");

      if (error) throw error;

      // Format the data to match our type
      const users: User[] = data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      }));

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
      return [];
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: authData } = await supabase.auth.getUser();
      
      if (!authData.user) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (error) throw error;

      const user: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        avatar: data.avatar,
      };

      return user;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }
};
