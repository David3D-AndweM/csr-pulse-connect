export type CSRProject = {
  id: string;
  title: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  progress: number;
  location: string;
  category: string;
  budget: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  assignedUsers: User[];
  projectType: 'internal' | 'external';
  mouId?: string; // For external projects with MOUs
  recipientId?: string; // For external projects
};

export type User = {
  id: string;
  name: string;
  role: 'admin' | 'csr_manager' | 'editor' | 'recipient' | 'public';
  email: string;
  avatar?: string;
};

export type Report = {
  id: string;
  projectId: string;
  recipientId: string;
  summary: string;
  documentUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  feedback?: string;
};

export type NewsPost = {
  id: string;
  title: string;
  content: string;
  author: User;
  category: string;
  imageUrl?: string;
  publishedAt: string;
  tags: string[];
};

export type Region = {
  id: string;
  name: string;
  country: string;
  projectCount?: number; // Make projectCount optional
};

export type Notification = {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  userId: string;
};

export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
};

export type Request = {
  id: string;
  type: 'Facility' | 'Support';
  requester: string;
  facility: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  description: string;
};

// New types for MOU and Survey features
export type MOU = {
  id: string;
  title: string;
  organizationName: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
  projectIds: string[];
  description: string;
  documentUrl?: string;
};

export type Survey = {
  id: string;
  title: string;
  description: string;
  projectId: string;
  questions: SurveyQuestion[];
  createdAt: string;
  expiresAt: string;
  status: 'draft' | 'active' | 'closed';
};

export type SurveyQuestion = {
  id: string;
  type: 'multiple_choice' | 'text' | 'rating' | 'yes_no';
  question: string;
  options?: string[];
  required: boolean;
};

export type SurveyResponse = {
  id: string;
  surveyId: string;
  respondentId: string;
  respondentName: string;
  responses: {
    questionId: string;
    answer: string | number | boolean;
  }[];
  submittedAt: string;
};
