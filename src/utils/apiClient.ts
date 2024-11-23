import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export type LoginCredentials = {
  email: string;
  password: string;
};

const apiClient = axios.create({
  baseURL: 'https://2rs7rs7gv3.execute-api.us-east-1.amazonaws.com/Dev',
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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el servidor devuelve un 401, el token probablemente ha expirado
      const { logout } = useAuth();
      logout(); // Limpia el estado de autenticación
      window.location.href = '/login'; // Redirige al login
    }
    return Promise.reject(error);
  }
);

export const login = (credentials: LoginCredentials) =>
  apiClient.post('/login', credentials);

export const fetchVehicles = () => apiClient.get('/vehicles');
export const fetchServices = () => apiClient.get('/services');
export const fetchOpenOrders = () => apiClient.get('/orders/open');


export const createService = async (data: object) => {
  const services = await apiClient.post('/services', data);
  const response = services
  return response;
};

export const deleteService = async (id: string) => {
  await apiClient.delete(`/services/${id}`);
};

export const fetchServicesTableData = async () => {
  const services = await fetchServices();
  const response = services.data.services;
  return response;
};

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
