'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full px-12 py-5 flex justify-between items-center z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-lg' : 'bg-black/80 backdrop-blur-md'
    } border-b border-white/10`}>
      <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent tracking-wider">
        ⚡ ELECTRODRIVE
      </div>
      <nav className="flex gap-8">
        <Link href="#home" className="text-white hover:text-purple-500 transition-colors font-medium">
          Home
        </Link>
        <Link href="#inventory" className="text-white hover:text-purple-500 transition-colors font-medium">
          Inventory
        </Link>
        <Link href="#features" className="text-white hover:text-purple-500 transition-colors font-medium">
          Features
        </Link>
        <Link href="#contact" className="text-white hover:text-purple-500 transition-colors font-medium">
          Contact
        </Link>
      </nav>
    </header>
  );
}
