export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      mous: {
        Row: {
          description: string
          document_url: string | null
          end_date: string
          id: string
          organization_name: string
          start_date: string
          status: string
          title: string
        }
        Insert: {
          description: string
          document_url?: string | null
          end_date: string
          id?: string
          organization_name: string
          start_date: string
          status: string
          title: string
        }
        Update: {
          description?: string
          document_url?: string | null
          end_date?: string
          id?: string
          organization_name?: string
          start_date?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      news_posts: {
        Row: {
          author_id: string
          category: string
          content: string
          id: string
          image_url: string | null
          published_at: string | null
          tags: string[] | null
          title: string
        }
        Insert: {
          author_id: string
          category: string
          content: string
          id?: string
          image_url?: string | null
          published_at?: string | null
          tags?: string[] | null
          title: string
        }
        Update: {
          author_id?: string
          category?: string
          content?: string
          id?: string
          image_url?: string | null
          published_at?: string | null
          tags?: string[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          id: string
          message: string
          read: boolean | null
          timestamp: string | null
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          id?: string
          message: string
          read?: boolean | null
          timestamp?: string | null
          type?: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          id?: string
          message?: string
          read?: boolean | null
          timestamp?: string | null
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          avatar?: string | null
          email: string
          id: string
          name: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          avatar?: string | null
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      project_assignments: {
        Row: {
          project_id: string
          user_id: string
        }
        Insert: {
          project_id: string
          user_id: string
        }
        Update: {
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_assignments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget: number
          category: string
          created_at: string | null
          description: string | null
          end_date: string
          id: string
          location: string
          mou_id: string | null
          progress: number
          project_type: Database["public"]["Enums"]["project_type"]
          recipient_id: string | null
          start_date: string
          status: Database["public"]["Enums"]["project_status"]
          title: string
        }
        Insert: {
          budget?: number
          category: string
          created_at?: string | null
          description?: string | null
          end_date: string
          id?: string
          location: string
          mou_id?: string | null
          progress?: number
          project_type?: Database["public"]["Enums"]["project_type"]
          recipient_id?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["project_status"]
          title: string
        }
        Update: {
          budget?: number
          category?: string
          created_at?: string | null
          description?: string | null
          end_date?: string
          id?: string
          location?: string
          mou_id?: string | null
          progress?: number
          project_type?: Database["public"]["Enums"]["project_type"]
          recipient_id?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["project_status"]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      regions: {
        Row: {
          country: string
          id: string
          name: string
          project_count: number | null
        }
        Insert: {
          country: string
          id?: string
          name: string
          project_count?: number | null
        }
        Update: {
          country?: string
          id?: string
          name?: string
          project_count?: number | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          document_url: string | null
          feedback: string | null
          id: string
          project_id: string
          recipient_id: string
          status: Database["public"]["Enums"]["report_status"]
          submitted_at: string | null
          summary: string
        }
        Insert: {
          document_url?: string | null
          feedback?: string | null
          id?: string
          project_id: string
          recipient_id: string
          status?: Database["public"]["Enums"]["report_status"]
          submitted_at?: string | null
          summary: string
        }
        Update: {
          document_url?: string | null
          feedback?: string | null
          id?: string
          project_id?: string
          recipient_id?: string
          status?: Database["public"]["Enums"]["report_status"]
          submitted_at?: string | null
          summary?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      requests: {
        Row: {
          description: string
          facility: string
          id: string
          requester: string
          status: string
          submitted_at: string | null
          type: string
        }
        Insert: {
          description: string
          facility: string
          id?: string
          requester: string
          status: string
          submitted_at?: string | null
          type: string
        }
        Update: {
          description?: string
          facility?: string
          id?: string
          requester?: string
          status?: string
          submitted_at?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "requests_requester_fkey"
            columns: ["requester"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_answers: {
        Row: {
          answer: string
          question_id: string
          response_id: string
        }
        Insert: {
          answer: string
          question_id: string
          response_id: string
        }
        Update: {
          answer?: string
          question_id?: string
          response_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "survey_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_answers_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "survey_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_questions: {
        Row: {
          id: string
          options: string[] | null
          question: string
          required: boolean | null
          survey_id: string
          type: string
        }
        Insert: {
          id?: string
          options?: string[] | null
          question: string
          required?: boolean | null
          survey_id: string
          type: string
        }
        Update: {
          id?: string
          options?: string[] | null
          question?: string
          required?: boolean | null
          survey_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_questions_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_responses: {
        Row: {
          id: string
          respondent_id: string
          submitted_at: string | null
          survey_id: string
        }
        Insert: {
          id?: string
          respondent_id: string
          submitted_at?: string | null
          survey_id: string
        }
        Update: {
          id?: string
          respondent_id?: string
          submitted_at?: string | null
          survey_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_respondent_id_fkey"
            columns: ["respondent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_responses_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
        ]
      }
      surveys: {
        Row: {
          created_at: string | null
          description: string
          expires_at: string
          id: string
          project_id: string
          status: string
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          expires_at: string
          id?: string
          project_id: string
          status?: string
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          expires_at?: string
          id?: string
          project_id?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "surveys_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      notification_type: "info" | "success" | "warning" | "error"
      project_status: "planned" | "in-progress" | "completed" | "cancelled"
      project_type: "internal" | "external"
      report_status: "pending" | "approved" | "rejected"
      user_role: "admin" | "csr_manager" | "editor" | "recipient" | "public"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      notification_type: ["info", "success", "warning", "error"],
      project_status: ["planned", "in-progress", "completed", "cancelled"],
      project_type: ["internal", "external"],
      report_status: ["pending", "approved", "rejected"],
      user_role: ["admin", "csr_manager", "editor", "recipient", "public"],
    },
  },
} as const
