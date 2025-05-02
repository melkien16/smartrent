import React from 'react';
import { Calendar, AlertCircle, Shield } from 'lucide-react';

const BookingForm = ({ 
  item, 
  startDate, 
  endDate, 
  totalDays, 
  error, 
  setStartDate, 
  setEndDate, 
  handleRentNow,
  isAuthenticated
}) => {
  return (
    <div className="sticky top-20 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-baseline">
        <span className="text-2xl font-bold text-gray-900">${item.price}</span>
        <span className="ml-1 text-gray-600">/{item.priceUnit}</span>
      </div>
      
      <div className="mb-6">
        <div className="mb-4 flex items-center rounded-md bg-green-50 p-2 text-sm text-green-800">
          <Calendar size={16} className="mr-2 flex-shrink-0" />
          Available {item.availability}
        </div>
        
        {error && (
          <div className="mb-4 flex items-center rounded-md bg-red-50 p-2 text-sm text-red-700">
            <AlertCircle size={16} className="mr-2 flex-shrink-0" />
            {error}
          </div>
        )}
        
        <form>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              className="input"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              className="input"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
              min={startDate || new Date().toISOString().split('T')[0]}
            />
          </div>
          
          {(startDate && endDate) && (
            <div className="mb-6 space-y-2 rounded-md bg-gray-50 p-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">${item.price} x {totalDays} {totalDays === 1 ? 'day' : 'days'}</span>
                <span className="font-medium">${item.price * totalDays}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service fee</span>
                <span className="font-medium">${Math.round(item.price * totalDays * 0.1)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${item.price * totalDays + Math.round(item.price * totalDays * 0.1)}</span>
                </div>
              </div>
            </div>
          )}
          
          <button
            type="button"
            className="btn-primary w-full"
            onClick={handleRentNow}
          >
            {isAuthenticated ? 'Rent Now' : 'Login to Rent'}
          </button>
        </form>
      </div>
      
      <div className="flex items-center justify-center space-x-2 rounded-md bg-gray-50 p-3 text-sm text-gray-600">
        <Shield size={16} className="text-primary-500" />
        <span>All rentals are protected by smartRent guarantee</span>
      </div>
    </div>
  );
};

export default React.memo(BookingForm); 