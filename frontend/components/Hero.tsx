'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center text-center relative overflow-hidden">
      <div className="absolute w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(102,126,234,0.1)_0%,transparent_70%)] animate-rotate" />
      
      <div className="relative z-10 max-w-4xl px-5">
        <h1 className="text-6xl md:text-7xl font-bold mb-5 animate-fadeInUp">
          The Future of Driving
        </h1>
        <p className="text-2xl md:text-3xl mb-10 opacity-90 animate-fadeInUp [animation-delay:0.2s]">
          Experience the ultimate in electric vehicle innovation with our premium selection of Tesla vehicles
        </p>
        <Link 
          href="#inventory" 
          className="inline-block px-12 py-5 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(102,126,234,0.4)] animate-fadeInUp [animation-delay:0.4s]"
        >
          Explore Our Inventory
        </Link>
      </div>
    </section>
  );
}
