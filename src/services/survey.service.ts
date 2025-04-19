
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type SurveyType = {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  status: "draft" | "active" | "closed";
  createdAt: string;
  expiresAt: string;
  responseCount: number;
};

export type SurveyQuestion = {
  id: string;
  question: string;
  type: "multiple_choice" | "text" | "rating" | "yes_no";
  options?: string[];
  required: boolean;
};

export type SurveyResponse = {
  id: string;
  surveyId: string;
  respondentId: string;
  respondentName: string;
  submittedAt: string;
  answers: {
    questionId: string;
    answer: string | number | boolean;
  }[];
};

export const surveyService = {
  async getSurveys(): Promise<SurveyType[]> {
    try {
      // Get surveys with project info
      const { data, error } = await supabase
        .from("surveys")
        .select(`
          id,
          title,
          description,
          status,
          created_at,
          expires_at,
          project_id,
          projects (
            title
          )
        `);
      
      if (error) throw error;
      
      // Get response counts for each survey
      const { data: responses, error: responsesError } = await supabase
        .from("survey_responses")
        .select("survey_id");
      
      if (responsesError) throw responsesError;
      
      // Count responses by survey ID
      const responseCountMap: Record<string, number> = {};
      responses.forEach(response => {
        responseCountMap[response.survey_id] = (responseCountMap[response.survey_id] || 0) + 1;
      });
      
      // Format the data to match our type
      const formattedData: SurveyType[] = data.map((survey) => {
        const projectName = survey.projects ? survey.projects.title : "Unknown Project";
        
        return {
          id: survey.id,
          title: survey.title,
          description: survey.description,
          projectId: survey.project_id,
          projectName,
          status: survey.status as "draft" | "active" | "closed",
          createdAt: survey.created_at,
          expiresAt: survey.expires_at,
          responseCount: responseCountMap[survey.id] || 0
        };
      });
      
      return formattedData;
    } catch (error) {
      console.error("Error fetching surveys:", error);
      toast.error("Failed to load surveys");
      return [];
    }
  },
  
  async getSurveyById(id: string): Promise<SurveyType | null> {
    try {
      const { data, error } = await supabase
        .from("surveys")
        .select(`
          id,
          title,
          description,
          status,
          created_at,
          expires_at,
          project_id,
          projects (
            title
          )
        `)
        .eq("id", id)
        .single();
      
      if (error) throw error;
      
      // Get response count for this survey
      const { count, error: countError } = await supabase
        .from("survey_responses")
        .select("*", { count: "exact", head: true })
        .eq("survey_id", id);
      
      if (countError) throw countError;
      
      // Format the data
      const projectName = data.projects ? data.projects.title : "Unknown Project";
      
      const survey: SurveyType = {
        id: data.id,
        title: data.title,
        description: data.description,
        projectId: data.project_id,
        projectName,
        status: data.status as "draft" | "active" | "closed",
        createdAt: data.created_at,
        expiresAt: data.expires_at,
        responseCount: count || 0
      };
      
      return survey;
    } catch (error) {
      console.error("Error fetching survey:", error);
      toast.error("Failed to load survey details");
      return null;
    }
  },
  
  async getSurveyQuestions(surveyId: string): Promise<SurveyQuestion[]> {
    try {
      const { data, error } = await supabase
        .from("survey_questions")
        .select("*")
        .eq("survey_id", surveyId)
        .order("id");
      
      if (error) throw error;
      
      // Format the data
      const questions: SurveyQuestion[] = data.map(q => ({
        id: q.id,
        question: q.question,
        type: q.type as "multiple_choice" | "text" | "rating" | "yes_no",
        options: q.options,
        required: q.required
      }));
      
      return questions;
    } catch (error) {
      console.error("Error fetching survey questions:", error);
      toast.error("Failed to load survey questions");
      return [];
    }
  },
  
  async createSurvey(survey: Omit<SurveyType, "id" | "createdAt" | "responseCount">): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from("surveys")
        .insert({
          title: survey.title,
          description: survey.description,
          project_id: survey.projectId,
          status: survey.status,
          expires_at: survey.expiresAt
        })
        .select("id")
        .single();
      
      if (error) throw error;
      
      toast.success("Survey created successfully");
      return data.id;
    } catch (error) {
      console.error("Error creating survey:", error);
      toast.error("Failed to create survey");
      return null;
    }
  },
  
  async addSurveyQuestion(surveyId: string, question: Omit<SurveyQuestion, "id">): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from("survey_questions")
        .insert({
          survey_id: surveyId,
          question: question.question,
          type: question.type,
          options: question.options,
          required: question.required
        })
        .select("id")
        .single();
      
      if (error) throw error;
      
      return data.id;
    } catch (error) {
      console.error("Error adding survey question:", error);
      toast.error("Failed to add question");
      return null;
    }
  },
  
  async updateSurveyStatus(id: string, status: "draft" | "active" | "closed"): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("surveys")
        .update({ status })
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success(`Survey ${status === 'active' ? 'published' : status === 'closed' ? 'closed' : 'saved as draft'}`);
      return true;
    } catch (error) {
      console.error("Error updating survey status:", error);
      toast.error("Failed to update survey status");
      return false;
    }
  },
  
  async deleteSurvey(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("surveys")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success("Survey deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting survey:", error);
      toast.error("Failed to delete survey");
      return false;
    }
  },
  
  async submitSurveyResponse(response: Omit<SurveyResponse, "id" | "submittedAt">): Promise<boolean> {
    try {
      // First create the response
      const { data, error } = await supabase
        .from("survey_responses")
        .insert({
          survey_id: response.surveyId,
          respondent_id: response.respondentId
        })
        .select("id")
        .single();
      
      if (error) throw error;
      
      // Then add all the answers
      const responseId = data.id;
      
      // Prepare answers for insertion
      const answers = response.answers.map(answer => ({
        response_id: responseId,
        question_id: answer.questionId,
        answer: String(answer.answer) // Convert all answers to string for storage
      }));
      
      const { error: answersError } = await supabase
        .from("survey_answers")
        .insert(answers);
      
      if (answersError) throw answersError;
      
      toast.success("Survey response submitted successfully");
      return true;
    } catch (error) {
      console.error("Error submitting survey response:", error);
      toast.error("Failed to submit survey response");
      return false;
    }
  }
};
