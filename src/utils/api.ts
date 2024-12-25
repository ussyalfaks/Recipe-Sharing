import axios from 'axios';

const api = axios.create({
  baseURL: 'https://recipe-sharing-znbj.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',

  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases
    if (error.response?.status === 413) {
      return Promise.reject(new Error('File size too large. Please upload a smaller image.'));
    }
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;