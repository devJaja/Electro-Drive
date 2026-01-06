'use client';

import { useState } from 'react';
import { dummyCars, Car } from '../../../data/cars';

const BarChart = ({ price }: { price: string }) => {
  const priceValue = Number(price.replace(/[^0-9.-]+/g,""));
  const maxPrice = 250000; // A baseline max price for scaling
  const percentage = (priceValue / maxPrice) * 100;

  return (
    <div className="w-full bg-gray-700 rounded-full h-8 dark:bg-gray-700 my-4">
      <div 
        className="bg-red-500 h-8 rounded-full" 
        style={{ width: `${percentage}%` }}
      ></div>
      <span className="text-sm font-medium text-white absolute right-4 top-1/2 -translate-y-1/2">{price}</span>
    </div>
  );
};


export default function CheckoutPage({ params }: { params: { id: string } }) {
  const car = dummyCars.find(c => c._id === params.id);
  const [copied, setCopied] = useState(false);

  const walletAddress = '0x1234...AbCd...5678...EfGh';

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  if (!car) {
    return <div className="text-center py-20">Car not found!</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Checkout</h1>
        
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">{car.name}</h2>
          <p className="text-gray-400 mb-6">{car.description}</p>
          <div className="relative">
            <BarChart price={car.price} />
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Payment Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Credit Card Option */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Credit or Debit Card</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                  <input type="text" id="cardNumber" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white" placeholder="•••• •••• •••• ••••" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                    <input type="text" id="expiryDate" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-300 mb-2">CVC</label>
                    <input type="text" id="cvc" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white" placeholder="•••" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Pay {car.price}
                </button>
              </form>
            </div>

            {/* Crypto Option */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Cryptocurrency</h3>
              <p className="text-sm text-gray-400 mb-4">
                Send the equivalent amount in BTC, ETH, or USDC to the address below.
              </p>
              <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-between">
                <p className="text-sm text-gray-300 break-all">{walletAddress}</p>
                <button onClick={handleCopy} className="ml-4 text-sm text-white bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded-md">
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Note: Crypto payments are final and non-refundable. Please double-check the address and amount before sending.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
