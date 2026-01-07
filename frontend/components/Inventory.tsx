'use client';

import { useState, useEffect } from 'react';
import CarCard from './CarCard';

import { dummyCars, Car } from '../data/cars';

export default function Inventory() {
  const [cars, setCars] = useState<Car[]>(dummyCars);
  const [loading, setLoading] = useState(false);

  return (
    <section id="inventory" className="py-16 px-4 sm:px-8 lg:px-12">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
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
