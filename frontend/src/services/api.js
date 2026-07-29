import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Crops API
export const fetchAllCrops = () => api.get('/crops');
export const fetchCropById = (id) => api.get(`/crops/${id}`);
export const fetchCropsBySeason = (season) => api.get(`/crops/season/${season}`);
export const fetchRecommendedCrops = (soilType, temperature, rainfall) =>
  api.get(`/crops/recommend?soilType=${soilType}&temperature=${temperature}&rainfall=${rainfall}`);

// Users API
export const fetchUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, null, { params: data });

// Profile API
export const createProfile = (data) => api.post('/profile', null, { params: data });
export const fetchProfile = (userId) => api.get(`/profile/${userId}`);
export const updateProfile = (id, data) => api.put(`/profile/${id}`, null, { params: data });

export default api;
