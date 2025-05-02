import React from 'react';
import { Search, Handshake, CreditCard, Smile } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Find an Item',
    description: 'Browse through thousands of items available for rent in your area.',
    icon: Search,
  },
  {
    id: 2,
    title: 'Request to Rent',
    description: 'Send a rental request to the owner with your preferred dates.',
    icon: Handshake,
  },
  {
    id: 3,
    title: 'Make Payment',
    description: 'Pay securely through our platform. Your payment is protected until you receive the item.',
    icon: CreditCard,
  },
  {
    id: 4,
    title: 'Enjoy & Return',
    description: 'Use the item and return it on time. Leave a review to help others.',
    icon: Smile,
  },
];

const HowItWorks = () => (
  <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
      <p className="mt-2 text-gray-600">Rent items in just a few simple steps</p>
      
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm"
            >
              <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default React.memo(HowItWorks); 