
import { supabase } from "@/integrations/supabase/client";

export interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("User not found");
    }
    
    // Get the user's profile information
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (error) {
      throw error;
    }
    
    return { 
      ...user,
      role: profile?.role || 'public',
      name: profile?.name || user.email
    };
  },
  
  async register(credentials: LoginCredentials & { name: string }) {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          name: credentials.name
        }
      }
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  },
};
