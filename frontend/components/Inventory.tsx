'use client';

import { useState, useEffect } from 'react';
import CarCard from './CarCard';

interface Spec {
  label: string;
  value: string;
}

interface Car {
  _id: string;
  name: string;
  icon: string;
  description: string;
  specs: Spec[];
  price: string;
}

export default function Inventory() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/cars');
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <section id="inventory" className="py-24 px-12">
      <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
        Our Premium Collection
      </h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}
