import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem('token', response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (error) {
        // Handle refresh token failure (e.g., logout user)
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: { username: string; password: string }) =>
    api.post('/token/', credentials),
  refreshToken: (refresh: string) =>
    api.post('/token/refresh/', { refresh }),
};

// User API
export const userAPI = {
  getCurrentUser: () => api.get('/users/me/'),
  updateUser: (id: number, data: any) => api.put(`/users/${id}/`, data),
};

// Project API
export const projectAPI = {
  getAll: () => api.get('/projects/'),
  getById: (id: number) => api.get(`/projects/${id}/`),
  create: (data: any) => api.post('/projects/', data),
  update: (id: number, data: any) => api.put(`/projects/${id}/`, data),
  delete: (id: number) => api.delete(`/projects/${id}/`),
  assignUser: (projectId: number, userId: number) =>
    api.post(`/projects/${projectId}/assign_user/`, { user_id: userId }),
};

// Report API
export const reportAPI = {
  getAll: () => api.get('/reports/'),
  getById: (id: number) => api.get(`/reports/${id}/`),
  create: (data: any) => api.post('/reports/', data),
  update: (id: number, data: any) => api.put(`/reports/${id}/`, data),
};

// Survey API
export const surveyAPI = {
  getAll: () => api.get('/surveys/'),
  getById: (id: number) => api.get(`/surveys/${id}/`),
  create: (data: any) => api.post('/surveys/', data),
  submitResponse: (surveyId: number, responses: any) =>
    api.post(`/surveys/${surveyId}/responses/`, responses),
};

// Notification API
export const notificationAPI = {
  getAll: () => api.get('/notifications/'),
  markAsRead: (id: number) => api.post(`/notifications/${id}/mark_as_read/`),
};

// Request API
export const requestAPI = {
  getAll: () => api.get('/requests/'),
  create: (data: any) => api.post('/requests/', data),
  update: (id: number, data: any) => api.put(`/requests/${id}/`, data),
};

export default api; 