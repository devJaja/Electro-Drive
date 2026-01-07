'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`fixed w-full px-4 sm:px-6 py-4 flex justify-between items-center z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg shadow-red-500/20 border-b border-white/10' : 'bg-transparent'
    }`}>
      <Link href="/" className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent tracking-wider">
        ⚡ ELECTRODRIVE
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-6">
        <Link href="#home" className="text-white hover:text-red-500 transition-colors font-medium">
          Home
        </Link>
        <Link href="#inventory" className="text-white hover:text-red-500 transition-colors font-medium">
          Inventory
        </Link>
        <Link href="#features" className="text-white hover:text-red-500 transition-colors font-medium">
          Features
        </Link>
        <Link href="#contact" className="text-white hover:text-red-500 transition-colors font-medium">
          Contact
        </Link>
      </nav>

      <div className="hidden lg:flex gap-4">
        <Link href="/login" className="px-5 py-2 border border-red-500 text-white rounded-full hover:bg-red-500/10 transition-colors font-medium">
          Login
        </Link>
        <Link href="/register" className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full hover:opacity-90 transition-opacity font-medium">
          Register
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden text-white text-2xl focus:outline-none"
        onClick={toggleMobileMenu}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-full bg-black/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center transform ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:hidden`}>
        <nav className="flex flex-col gap-6 text-center text-xl mb-8">
          <Link href="#home" className="text-white hover:text-red-500 transition-colors font-medium" onClick={toggleMobileMenu}>
            Home
          </Link>
          <Link href="#inventory" className="text-white hover:text-red-500 transition-colors font-medium" onClick={toggleMobileMenu}>
            Inventory
          </Link>
          <Link href="#features" className="text-white hover:text-red-500 transition-colors font-medium" onClick={toggleMobileMenu}>
            Features
          </Link>
          <Link href="#contact" className="text-white hover:text-red-500 transition-colors font-medium" onClick={toggleMobileMenu}>
            Contact
          </Link>
        </nav>
        <div className="flex flex-col gap-4">
          <Link href="/login" className="px-6 py-2 border border-red-500 text-white rounded-full hover:bg-red-500/10 transition-colors font-medium text-base" onClick={toggleMobileMenu}>
            Login
          </Link>
          <Link href="/register" className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full hover:opacity-90 transition-opacity font-medium text-base" onClick={toggleMobileMenu}>
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}

