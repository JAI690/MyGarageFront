import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export type LoginCredentials = {
  email: string;
  password: string;
};

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface UpdateUserInput {
name: string;
email: string;
role: string;
}

const apiClient = axios.create({
  baseURL: 'https://7ltt3e9e4g.execute-api.us-east-1.amazonaws.com/Dev',
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
    if (error.response && (error.response.status === 401) ) {
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
export const fetchServicesByUser = () => apiClient.get('/orders')

export const createVehicle = async (vehicle: any) => {
  await apiClient.post('/vehicles', vehicle);
};

export const updateVehicle = async (id: string, vehicle: any) => {
  await apiClient.put(`/vehicles/${id}`, vehicle);
};

export const deleteVehicle = async (id: string) => {
  await apiClient.delete(`/vehicles/${id}`);
};

export const createService = async (data: object) => {
  const services = await apiClient.post('/services', data);
  const response = services
  return response;
};

export const deleteService = async (id: string) => {
  await apiClient.delete(`/services/${id}`);
};

export const updateService = async (id: string, serviceData: any) => {
  await apiClient.put(`/services/${id}`, serviceData);
};

export const fetchVehiclesByUser = async () => {
  const vehicles = await fetchVehicles();
  const response = vehicles.data;
  return response;
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
  const services = await fetchServicesByUser();
  const response = {
    registeredVehicles: vehicles.data.length,
    ongoingServices: services.data.orders.length,
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


// Crear nueva orden
export const createWorkOrder = async (data: { vehicleId: string; services: string[] }) => {
  const response = await apiClient.post('/orders', data);
  return response.data;
};

// Obtener órdenes por usuario
export const getClientOrders = async () => {
  const response = await apiClient.get('/orders');
  return response.data.orders;
};

// Actualizar estado de una orden
export const updateOrderStatus = async (data: { orderId: string; status: string }) => {
  const response = await apiClient.put('/orders/status', data);
  return response.data;
};

// Asignar mecánico a una orden
export const assignMechanicToOrder = async (data: { orderId: string; mechanicId: string }) => {
  const response = await apiClient.post('/orders/assignMechanic', data);
  return response.data;
};

export const fetchPendingOrders = async () => {
  const response = await apiClient.get('/orders/open');
  console.log("order")
  console.log(response.data.workOrders)
  return response.data.workOrders;
};

export const fetchMechanics = async () => {
  const response = await apiClient.get('/users/mechanics');
  console.log(response.data)
  return response.data.users;
};

export const assignMechanic = async (orderId: string, mechanicId: string) => {
  const response = await apiClient.post('/orders/assignMechanic', { orderId, mechanicId });
  return response.data;
};

export const fetchOrdersByMechanic = async () => {
  const response = await apiClient.get('/orders/byMechanic');
  return response.data.orders;
};

export const fetchUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data.users; // Asume que los usuarios están en `response.data.users`
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (data: CreateUserInput) => {
  const response = await apiClient.post('/users', data);
  return response.data;
};

export const updateUser = async (id: string, data: UpdateUserInput) => {
  const response = await apiClient.put(`/users/${id}`, data);
  return response.data;
};


export const deleteUser = async (id: string) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export default apiClient;
