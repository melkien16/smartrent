import React from 'react';
import { Calendar, Clock, CreditCard, Shield } from 'lucide-react';

const BookingSummary = ({
  item,
  startDate,
  endDate,
  insuranceOption = 'basic',
  onInsuranceChange
}) => {
  // Calculate rental period in days
  const rentalPeriod = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  // Calculate costs
  const dailyRate = item.price;
  const subtotal = dailyRate * rentalPeriod;
  const serviceFee = subtotal * 0.1; // 10% service fee
  const insuranceFee = insuranceOption === 'basic' ? 5 : 10; // $5 for basic, $10 for premium
  const total = subtotal + serviceFee + insuranceFee;

  return (
    <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">Booking Summary</h3>

      {/* Rental Period */}
      <div className="mb-4 flex items-center space-x-2">
        <Calendar className="h-5 w-5 text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">Rental Period</p>
          <p className="font-medium">
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Duration */}
      <div className="mb-4 flex items-center space-x-2">
        <Clock className="h-5 w-5 text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">Duration</p>
          <p className="font-medium">{rentalPeriod} days</p>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="mb-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Daily Rate</span>
          <span>${dailyRate.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Service Fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
      </div>

      {/* Insurance Options */}
      <div className="mb-4">
        <div className="mb-2 flex items-center space-x-2">
          <Shield className="h-5 w-5 text-gray-500" />
          <span className="font-medium">Insurance</span>
        </div>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="insurance"
              value="basic"
              checked={insuranceOption === 'basic'}
              onChange={(e) => onInsuranceChange(e.target.value)}
              className="h-4 w-4 text-primary-500"
            />
            <span>Basic Protection ($5/day)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="insurance"
              value="premium"
              checked={insuranceOption === 'premium'}
              onChange={(e) => onInsuranceChange(e.target.value)}
              className="h-4 w-4 text-primary-500"
            />
            <span>Premium Protection ($10/day)</span>
          </label>
        </div>
      </div>

      {/* Total */}
      <div className="mb-4 flex justify-between border-t border-gray-200 pt-4">
        <span className="font-semibold">Total</span>
        <span className="font-semibold">${total.toFixed(2)}</span>
      </div>

      {/* Payment Button */}
      <button
        className="flex w-full items-center justify-center space-x-2 rounded-lg bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
      >
        <CreditCard className="h-5 w-5" />
        <span>Proceed to Payment</span>
      </button>

      {/* Security Deposit Notice */}
      <p className="mt-4 text-center text-sm text-gray-500">
        A security deposit of ${item.securityDeposit} will be held until the item is returned
      </p>
    </div>
  );
};

export default BookingSummary; 