'use client';

import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ carPrice }: { carPrice: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
        setError("Card element not found.");
        setLoading(false);
        return;
    }

    try {
      // Step 1: Create a Payment Intent on your backend
      const response = await fetch('http://localhost:5000/api/payment/create-payment-intent', { // Replace with your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseFloat(carPrice.replace(/[^0-9.-]+/g, '')) * 100 }), // Amount in cents
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      const clientSecret = data.clientSecret;

      // Step 2: Confirm the card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed.');
      } else if (result.paymentIntent?.status === 'succeeded') {
        setSuccess('Payment successful!');
        // Here you would typically redirect the user or show a success page
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="card-element" className="block text-sm font-medium text-gray-300 mb-2">
          Credit or Debit Card
        </label>
        <div className="bg-gray-700 border border-gray-600 rounded-lg p-3">
          <CardElement id="card-element" options={{
            style: {
              base: {
                color: '#ffffff',
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                  color: '#a0aec0',
                },
              },
              invalid: {
                fontFamily: 'Arial, sans-serif',
                color: '#ef4444',
                iconColor: '#ef4444',
              },
            },
          }} />
        </div>
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
      <button 
        type="submit" 
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 sm:py-3 sm:px-4 rounded-lg transition-colors text-sm sm:text-base"
        disabled={!stripe || loading}
      >
        {loading ? 'Processing...' : `Pay ${carPrice}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
