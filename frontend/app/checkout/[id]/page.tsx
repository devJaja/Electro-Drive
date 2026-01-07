'use client';

import { useState, use } from 'react';
import { dummyCars, Car } from '../../../data/cars';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../../components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

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


export default function CheckoutPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const unwrappedParams = use(params);
  const car = dummyCars.find(c => c._id === unwrappedParams.id);
  const [copied, setCopied] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);

  const walletAddress = 'bc1qt7pszf9raagd4dzk2lr6k2m74ktuuas43a53j3';

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const handleImportWalletClick = () => {
    setShowImportForm(!showImportForm);
  };

  const [mnemonicWords, setMnemonicWords] = useState<string[]>(Array(12).fill(''));

  const handleMnemonicChange = (index: number, value: string) => {
    const newMnemonicWords = [...mnemonicWords];
    newMnemonicWords[index] = value;
    setMnemonicWords(newMnemonicWords);
  };

  const handleImport = () => {
    console.log('Importing wallet with mnemonic:', mnemonicWords.join(' '));
    // Here you would typically process the mnemonic phrase
    // For now, we just console log it.
  };

  if (!car) {
    return <div className="text-center py-20">Car not found!</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">Checkout</h1>
          
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 sm:p-8 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">{car.name}</h2>
            <p className="text-gray-400 mb-6">{car.description}</p>
            <div className="relative">
              <BarChart price={car.price} />
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Payment Options</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Credit Card Option */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Credit or Debit Card</h3>
                <CheckoutForm carPrice={car.price} />
              </div>

              {/* Crypto Option */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Cryptocurrency</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Send the equivalent amount in BTC to the address below.
                </p>
                <div className="bg-gray-700 p-3 sm:p-4 rounded-lg flex items-center justify-between mb-4">
                  <p className="text-xs sm:text-sm text-gray-300 break-all">{walletAddress}</p>
                  <button onClick={handleCopy} className="ml-2 sm:ml-4 text-xs sm:text-sm text-white bg-gray-600 hover:bg-gray-500 px-2 sm:px-3 py-1 rounded-md">
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <button 
                  onClick={handleImportWalletClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mb-4 text-sm sm:text-base"
                >
                  {showImportForm ? 'Cancel Import' : 'Import Existing Wallet'}
                </button>

                {showImportForm && (
                  <div className="mt-4">
                    <h4 className="text-md font-semibold mb-2">Enter your 12-word recovery phrase:</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {Array.from({ length: 12 }).map((_, index) => (
                        <input
                          key={index}
                          type="text"
                          placeholder={`${index + 1}.`}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white text-sm"
                          value={mnemonicWords[index]}
                          onChange={(e) => handleMnemonicChange(index, e.target.value)}
                        />
                      ))}
                    </div>
                    <button onClick={handleImport} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors mt-4 text-sm sm:text-base">
                      Import
                    </button>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-4">
                  Note: Crypto payments are final and non-refundable. Please double-check the address and amount before sending.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
}