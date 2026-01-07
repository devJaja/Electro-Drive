'use client';

import React, { useState, useEffect } from 'react';
import { getOrders, updateOrder, deleteOrder } from '@/lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
}

interface Order {
  _id: string;
  user: User;
  car: Car;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

const ManageOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      setOrders(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders.');
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const openViewModal = (order: Order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
    setIsEditingStatus(false);
  };

  const openEditModal = (order: Order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
    setIsEditingStatus(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentOrder(null);
    setIsEditingStatus(false);
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentOrder((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateOrder(currentOrder._id!, { status: currentOrder.status });
      fetchOrders();
      closeModal();
    } catch (err) {
      setError('Failed to update order status.');
      console.error('Failed to update order status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(id);
        fetchOrders();
      } catch (err) {
        setError('Failed to delete order.');
        console.error('Failed to delete order:', err);
      }
    }
  };

  if (loading) return <div className="p-6">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.user ? order.user.email : 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.car ? `${order.car.make} ${order.car.model}` : 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">${order.amount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => openViewModal(order)} className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button onClick={() => openEditModal(order)} className="text-yellow-600 hover:text-yellow-900 mr-3">Edit</button>
                  <button onClick={() => handleDelete(order._id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            {!isEditingStatus ? (
              <div>
                <p className="mb-2"><strong>Order ID:</strong> {currentOrder._id}</p>
                <p className="mb-2"><strong>User:</strong> {currentOrder.user ? `${currentOrder.user.name} (${currentOrder.user.email})` : 'N/A'}</p>
                <p className="mb-2"><strong>Car:</strong> {currentOrder.car ? `${currentOrder.car.make} ${currentOrder.car.model} (${currentOrder.car.year})` : 'N/A'}</p>
                <p className="mb-2"><strong>Amount:</strong> ${currentOrder.amount.toLocaleString()}</p>
                <p className="mb-2"><strong>Status:</strong> {currentOrder.status}</p>
                <p className="mb-2"><strong>Ordered On:</strong> {new Date(currentOrder.createdAt).toLocaleDateString()}</p>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdateStatus}>
                <div className="mb-4">
                  <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Order Status</label>
                  <select
                    id="status"
                    name="status"
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={currentOrder.status}
                    onChange={handleChangeStatus}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Update Status
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrdersPage;
