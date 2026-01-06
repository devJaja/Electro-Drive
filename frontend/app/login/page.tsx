'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Login successful! Redirecting to home...');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setMessage(data.msg || 'Login failed.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setMessage('Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Login to Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </form>
        {message && <p className="text-center mt-4 text-white">{message}</p>}
        <p className="text-center mt-4 text-gray-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-purple-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
