import React from 'react';

const AdminPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Cars</h2>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="text-3xl font-bold">$1,200,000</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">New Users</h2>
          <p className="text-3xl font-bold">4</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Pending Orders</h2>
          <p className="text-3xl font-bold">3</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Car Listings</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Model</th>
              <th className="text-left p-2">Price</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">Tesla Model S</td>
              <td className="p-2">$79,990</td>
              <td className="p-2"><span className="bg-green-200 text-green-800 px-2 py-1 rounded">Available</span></td>
              <td className="p-2">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline ml-2">Delete</button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Tesla Model 3</td>
              <td className="p-2">$46,990</td>
              <td className="p-2"><span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Pending</span></td>
              <td className="p-2">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline ml-2">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
