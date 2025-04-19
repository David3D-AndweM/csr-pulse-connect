export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  budget: number;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface CSRProject {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  budget: number;
  createdAt: string;
  imageUrl: string;
}

export interface Region {
  id: string;
  name: string;
  country: string;
  project_count?: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  avatar?: string;
}
