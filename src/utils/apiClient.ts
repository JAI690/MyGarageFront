import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Product, ProductInput, WarehouseRecord, WarehouseRecordInput } from '../interfaces/Product';

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
  baseURL: 'https://uquxxldgf1.execute-api.us-east-1.amazonaws.com/Dev',
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

export default apiClient;

export const login = (credentials: LoginCredentials) =>
  apiClient.post('/login', credentials);

export const fetchVehicles = () => apiClient.get('/vehicles');
export const fetchServices = () => apiClient.get('/services');
export const fetchOpenOrders = () => apiClient.get('/orders/open');
export const fetchServicesByUser = () => apiClient.get('/orders')

/* ------------------------- VEHICLES ------------------------- */
export const createVehicle = async (vehicle: any) => {
  await apiClient.post('/vehicles', vehicle);
};

export const updateVehicle = async (id: string, vehicle: any) => {
  await apiClient.put(`/vehicles/${id}`, vehicle);
};

export const deleteVehicle = async (id: string) => {
  await apiClient.delete(`/vehicles/${id}`);
};

export const fetchVehiclesByUser = async () => {
  const vehicles = await fetchVehicles();
  return vehicles.data;
};

/* ------------------------- SERVICES ------------------------- */
export const createService = async (data: object) => {
  const response = await apiClient.post('/services', data);
  return response.data;
};

export const updateService = async (id: string, serviceData: any) => {
  await apiClient.put(`/services/${id}`, serviceData);
};

export const deleteService = async (id: string) => {
  await apiClient.delete(`/services/${id}`);
};

export const fetchServicesTableData = async () => {
  const services = await fetchServices();
  return services.data.services;
};

/* ------------------------- USERS ------------------------- */
export const fetchUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data.users;
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
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};

export const fetchMechanics = async () => {
  const response = await apiClient.get('/users/mechanics');
  return response.data.users;
};

/* ------------------------- WORK ORDERS ------------------------- */
export const createWorkOrder = async (data: { vehicleId: string; services: string[] }) => {
  const response = await apiClient.post('/orders', data);
  return response.data;
};

export const getClientOrders = async () => {
  const response = await apiClient.get('/orders');
  return response.data.orders;
};

export const updateOrderStatus = async (data: { orderId: string; status: string }) => {
  const response = await apiClient.put('/orders/status', data);
  return response.data;
};

export const assignMechanicToOrder = async (data: { orderId: string; mechanicId: string }) => {
  const response = await apiClient.post('/orders/assignMechanic', data);
  return response.data;
};

export const fetchPendingOrders = async () => {
  const response = await apiClient.get('/orders/open');
  return response.data.workOrders;
};

export const fetchOrdersByMechanic = async () => {
  const response = await apiClient.get('/orders/byMechanic');
  return response.data.orders;
};

/* ------------------------- DASHBOARD ------------------------- */
export const fetchAdminDashboardData = async () => {
  const services = await fetchServices();
  const openOrders = await fetchPendingOrders();
  return {
    activeServices: services.data.services.length,
    monthlyRevenue: 0, // Placeholder: Ajustar con la lógica real
    ongoingOrders: openOrders.data.workOrders.length,
  };
};

export const fetchClientDashboardData = async () => {
  const vehicles = await fetchVehicles();
  const services = await fetchServicesByUser();
  return {
    registeredVehicles: vehicles.data.length,
    ongoingServices: services.data.orders.length,
  };
};

export const fetchMechanicDashboardData = async () => {
  return {
    assignedOrders: 0,
    completedOrders: 0, // Placeholder: Ajustar con la lógica real
  };
};

/* ------------------------- PRODUCTS & WAREHOUSE ------------------------- */
export const createProduct = async (product: ProductInput): Promise<void> => {
  await apiClient.post('/products', product);
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get('/products');
  return response.data.data;
};

export const assignProductLocation = async (locationData: WarehouseRecordInput): Promise<void> => {
  await apiClient.post('/warehouse/', locationData);
};

export const fetchWarehouse = async (): Promise<WarehouseRecord[]> => {
  const response = await apiClient.get('/warehouse');
  return response.data;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  await apiClient.put(`/warehouse/${id}`, product);
};

export const deleteProduct = async (id: string): Promise<void> => {
  await apiClient.delete(`/warehouse/${id}`);
};