import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Menu</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link href="/admin" className="hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/cars" className="hover:text-gray-300">
              Manage Cars
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/users" className="hover:text-gray-300">
              Manage Users
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/orders" className="hover:text-gray-300">
              Manage Orders
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
