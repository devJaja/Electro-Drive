'use client';

import { cars } from ' @/data/cars';
import CarCard from './CarCard';

export default function Inventory() {
  return (
    <section id="inventory" className="py-24 px-12">
      <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
        Our Premium Collection
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {cars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </section>
  );
}
