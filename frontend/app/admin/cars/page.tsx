'use client';

import React, { useState, useEffect } from 'react';
import { getCars, createCar, updateCar, deleteCar } from '@/lib/api';

const ManageCarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCar, setCurrentCar] = useState({
    _id: null,
    make: '',
    model: '',
    year: '',
    price: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await getCars();
      setCars(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cars.');
      console.error('Failed to fetch cars:', err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (car = null) => {
    setIsEditing(!!car);
    setCurrentCar(car || {
      _id: null,
      make: 'Tesla', // Default make for now
      model: '',
      year: '',
      price: '',
      description: '',
      image: '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCar({
      _id: null,
      make: '',
      model: '',
      year: '',
      price: '',
      description: '',
      image: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateCar(currentCar._id, currentCar);
      } else {
        await createCar(currentCar);
      }
      fetchCars();
      closeModal();
    } catch (err) {
      setError('Failed to save car.');
      console.error('Failed to save car:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(id);
        fetchCars();
      } catch (err) {
        setError('Failed to delete car.');
        console.error('Failed to delete car:', err);
      }
    }
  };

  if (loading) return <div className="p-6">Loading cars...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Cars</h1>
        <button onClick={() => openModal()} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
          Add Car
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map((car) => (
              <tr key={car._id}>
                <td className="px-6 py-4 whitespace-nowrap">{car.make}</td>
                <td className="px-6 py-4 whitespace-nowrap">{car.model}</td>
                <td className="px-6 py-4 whitespace-nowrap">{car.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">{car.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => openModal(car)} className="text-yellow-500 hover:text-yellow-700 mr-3">Edit</button>
                  <button onClick={() => handleDelete(car._id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Car' : 'Add Car'}</h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label htmlFor="make" className="block text-gray-700 text-sm font-bold mb-2">Make</label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={currentCar.make}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="model" className="block text-gray-700 text-sm font-bold mb-2">Model</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={currentCar.model}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={currentCar.year}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={currentCar.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={currentCar.description}
                  onChange={handleChange}
                  rows={3}
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={currentCar.image}
                  onChange={handleChange}
                />
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
                  {isEditing ? 'Update Car' : 'Add Car'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCarsPage;
