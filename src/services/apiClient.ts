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

export const login = (credentials: LoginCredentials) =>
  apiClient.post('/login', credentials);

export const fetchVehicles = () => apiClient.get('/vehicles');

export default apiClient;
