
import { CSRProject, NewsPost, Region, Report, User, Notification } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'admin',
    email: 'john.doe@example.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'csr_manager',
    email: 'jane.smith@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    role: 'editor',
    email: 'robert.j@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Robert+Johnson',
  },
  {
    id: '4',
    name: 'Lisa Brown',
    role: 'recipient',
    email: 'lisa.b@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Brown',
  },
];

export const mockProjects: CSRProject[] = [
  {
    id: '1',
    title: 'Clean Water Initiative',
    description: 'Providing clean water access to rural communities',
    status: 'in-progress',
    progress: 65,
    location: 'Eastern Region',
    category: 'Environment',
    budget: 50000,
    startDate: '2024-01-15',
    endDate: '2024-07-15',
    createdAt: '2023-12-10',
    assignedUsers: [mockUsers[0], mockUsers[1]],
  },
  {
    id: '2',
    title: 'Education for All',
    description: 'Building schools and providing educational materials',
    status: 'in-progress',
    progress: 40,
    location: 'Northern Region',
    category: 'Education',
    budget: 75000,
    startDate: '2024-02-01',
    endDate: '2024-12-15',
    createdAt: '2024-01-20',
    assignedUsers: [mockUsers[1], mockUsers[2]],
  },
  {
    id: '3',
    title: 'Green Energy Initiative',
    description: 'Installing solar panels in community buildings',
    status: 'planned',
    progress: 0,
    location: 'Western Region',
    category: 'Energy',
    budget: 120000,
    startDate: '2024-06-01',
    endDate: '2025-01-30',
    createdAt: '2024-03-10',
    assignedUsers: [mockUsers[0], mockUsers[3]],
  },
  {
    id: '4',
    title: 'Community Healthcare',
    description: 'Mobile clinics for underserved populations',
    status: 'completed',
    progress: 100,
    location: 'Southern Region',
    category: 'Healthcare',
    budget: 85000,
    startDate: '2023-09-01',
    endDate: '2024-02-28',
    createdAt: '2023-08-15',
    assignedUsers: [mockUsers[2], mockUsers[3]],
  },
];

export const mockReports: Report[] = [
  {
    id: '1',
    projectId: '1',
    recipientId: '4',
    summary: 'Completed the installation of 5 water pumps this month',
    documentUrl: '/reports/water-pump-installation.pdf',
    status: 'approved',
    submittedAt: '2024-03-15',
    feedback: 'Great progress, thank you for the detailed report',
  },
  {
    id: '2',
    projectId: '2',
    recipientId: '4',
    summary: 'Distributed 200 textbooks to local schools',
    documentUrl: '/reports/textbook-distribution.pdf',
    status: 'pending',
    submittedAt: '2024-04-02',
  },
  {
    id: '3',
    projectId: '1',
    recipientId: '4',
    summary: 'Community training on water conservation completed',
    documentUrl: '/reports/water-conservation-training.pdf',
    status: 'rejected',
    submittedAt: '2024-02-20',
    feedback: 'Please include attendance records and follow-up plan',
  },
];

export const mockNewsPosts: NewsPost[] = [
  {
    id: '1',
    title: 'Clean Water Initiative Reaches 1000 Families',
    content: 'Our Clean Water Initiative has successfully provided access to clean water for 1000 families in rural communities.',
    author: mockUsers[0],
    category: 'Project Update',
    imageUrl: 'https://images.unsplash.com/photo-1581089781785-603411fa81e5?q=80&w=2070',
    publishedAt: '2024-03-20',
    tags: ['water', 'success', 'milestone'],
  },
  {
    id: '2',
    title: 'Education Program Launches in Northern Region',
    content: 'We are excited to announce the launch of our Education for All program in the Northern Region.',
    author: mockUsers[2],
    category: 'Announcement',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070',
    publishedAt: '2024-02-05',
    tags: ['education', 'launch', 'community'],
  },
  {
    id: '3',
    title: 'Partnership with Local Government for Green Energy',
    content: 'We have established a partnership with the local government to implement our Green Energy Initiative.',
    author: mockUsers[1],
    category: 'Partnership',
    imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072',
    publishedAt: '2024-03-15',
    tags: ['energy', 'partnership', 'government'],
  },
];

export const mockRegions: Region[] = [
  {
    id: '1',
    name: 'Eastern Region',
    country: 'Ghana',
    projectCount: 3,
  },
  {
    id: '2',
    name: 'Northern Region',
    country: 'Ghana',
    projectCount: 2,
  },
  {
    id: '3',
    name: 'Western Region',
    country: 'Ghana',
    projectCount: 1,
  },
  {
    id: '4',
    name: 'Southern Region',
    country: 'Ghana',
    projectCount: 4,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    message: 'New report submitted for Clean Water Initiative',
    type: 'info',
    timestamp: '2024-04-05T10:30:00',
    read: false,
    userId: '1',
  },
  {
    id: '2',
    message: 'Education for All project progress updated to 45%',
    type: 'success',
    timestamp: '2024-04-04T16:45:00',
    read: true,
    userId: '1',
  },
  {
    id: '3',
    message: 'Report #3 requires your review',
    type: 'warning',
    timestamp: '2024-04-03T09:15:00',
    read: false,
    userId: '1',
  },
  {
    id: '4',
    message: 'Budget allocation for Q2 approved',
    type: 'success',
    timestamp: '2024-04-01T14:20:00',
    read: true,
    userId: '1',
  },
];

export const projectsByStatusChartData = {
  labels: ['Planned', 'In Progress', 'Completed', 'Cancelled'],
  datasets: [
    {
      label: 'Projects by Status',
      data: [1, 2, 1, 0],
      backgroundColor: ['#30b679', '#1e8a5f', '#bef0d7', '#e74c3c'],
    },
  ],
};

export const projectsByCategoryChartData = {
  labels: ['Environment', 'Education', 'Energy', 'Healthcare'],
  datasets: [
    {
      label: 'Projects by Category',
      data: [1, 1, 1, 1],
      backgroundColor: ['#1e8a5f', '#30b679', '#bef0d7', '#e8f7f0'],
    },
  ],
};

export const monthlyProgressChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Clean Water Initiative',
      data: [10, 25, 40, 55, 65, 65],
      borderColor: '#1e8a5f',
      backgroundColor: 'rgba(30, 138, 95, 0.1)',
      borderWidth: 2,
    },
    {
      label: 'Education for All',
      data: [0, 10, 20, 40, 40, 40],
      borderColor: '#30b679',
      backgroundColor: 'rgba(48, 182, 121, 0.1)',
      borderWidth: 2,
    },
  ],
};
