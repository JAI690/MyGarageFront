import axios from 'axios';

export type LoginCredentials = {
  email: string;
  password: string;
};

const apiClient = axios.create({
  baseURL: 'https://0fn5qr4lf4.execute-api.us-east-1.amazonaws.com/Dev',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // O usa un contexto si lo estás gestionando ahí
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials: LoginCredentials) =>
  apiClient.post('/login', credentials);

export const fetchVehicles = () => apiClient.get('/vehicles');
export const fetchServices = () => apiClient.get('/services');
export const fetchOpenOrders = () => apiClient.get('/orders/open');

export const fetchAdminDashboardData = async () => {
  const services = await fetchServices();
  const openOrders = await fetchOpenOrders();
  const response = {
    activeServices: services.data.services.length,
    monthlyRevenue: 0,
    ongoingOrders: openOrders.data.workOrders.length,
  };
  return response;
};

export const fetchClientDashboardData = async () => {
  const vehicles = await fetchVehicles();
  const services = await fetchServices();
  const response = {
    registeredVehicles: vehicles.data.vehicles.length,
    ongoingServices: services.data.services.length,
  };
  return response;
};

export const fetchMechanicDashboardData = async () => {
  const response = {
    assignedOrders: 0,
    completedOrders: 0,
  };
  return response;
};

export default apiClient;
