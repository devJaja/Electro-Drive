'use client';

import { useEffect } from 'react';
import Header from ' @/components/Header';
import Hero from ' @/components/Hero';
import Inventory from ' @/components/Inventory';
import Features from ' @/components/Features';
import Footer from ' @/components/Footer';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.car-card').forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <Hero />
      <Inventory />
      <Features />
      <Footer />
    </main>
  );
}