import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Car API
export const getCars = () => api.get('/cars');
export const getCar = (id: string) => api.get(`/cars/${id}`);
export const createCar = (car: any) => api.post('/cars', car);
export const updateCar = (id: string, car: any) => api.put(`/cars/${id}`, car);
export const deleteCar = (id: string) => api.delete(`/cars/${id}`);

// User API
export const getUsers = () => api.get('/users');
export const getUser = (id: string) => api.get(`/users/${id}`);
export const updateUser = (id: string, user: any) => api.put(`/users/${id}`, user);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);

// Order API
export const getOrders = () => api.get('/orders');
export const getOrder = (id: string) => api.get(`/orders/${id}`);
export const updateOrder = (id: string, order: any) => api.patch(`/orders/${id}`, order);
export const deleteOrder = (id: string) => api.delete(`/orders/${id}`);

export default api;
