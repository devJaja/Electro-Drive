'use client';

import Link from 'next/link';

interface Car {
  _id: string;
  name: string;
  icon: string;
  description: string;
  specs: { label: string; value: string }[];
  price: string;
}

export default function CarCard({ car }: { car: Car }) {
  return (
    <div className="car-card bg-white/5 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(239,68,68,0.3)] border border-white/10">
      <div className="relative w-full h-64 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-8xl overflow-hidden">
        {car.icon}
        <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine" />
      </div>
      
      <div className="p-8">
        <h3 className="text-3xl font-bold mb-3">{car.name}</h3>
        <p className="text-white/70 mb-5 leading-relaxed">{car.description}</p>
        
        <div className="flex justify-between mb-5 p-4 bg-white/5 rounded-xl">
          {car.specs.map((spec, i) => (
            <div key={i} className="text-center">
              <div className="text-xs text-white/60 uppercase mb-1">{spec.label}</div>
              <div className="text-lg font-bold text-red-500">{spec.value}</div>
            </div>
          ))}
        </div>
        
        <div className="text-4xl font-bold text-red-500 mb-5">{car.price}</div>
        
        <Link href={`/checkout/${car._id}`}>
          <button 
            className="w-full py-4 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl font-semibold transition-transform hover:scale-105"
          >
            Reserve Now
          </button>
        </Link>
      </div>
    </div>
  );
}
