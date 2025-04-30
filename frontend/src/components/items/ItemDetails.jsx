import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';

const ItemDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { createBooking } = useBooking();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [insuranceOption, setInsuranceOption] = useState('basic');
  const [item, setItem] = useState(null);

  const calculateTotal = () => {
    if (!selectedStartDate || !selectedEndDate || !item) return 0;
    const days = Math.ceil((selectedEndDate - selectedStartDate) / (1000 * 60 * 60 * 24)) + 1;
    const dailyRate = item.price;
    const subtotal = dailyRate * days;
    const serviceFee = subtotal * 0.1;
    const insuranceFee = insuranceOption === 'basic' ? 5 * days : 10 * days;
    return subtotal + serviceFee + insuranceFee;
  };

  const handleRentNow = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (!selectedStartDate || !selectedEndDate) {
      toast.error('Please select both start and end dates');
      return;
    }

    try {
      const bookingData = {
        itemId: item.id,
        startDate: selectedStartDate.toISOString(),
        endDate: selectedEndDate.toISOString(),
        insuranceOption,
        totalAmount: calculateTotal(),
        status: 'pending'
      };

      await createBooking(bookingData);
      toast.success('Booking request submitted successfully!');
      navigate('/bookings'); // Redirect to bookings page
    } catch (error) {
      toast.error(error.message || 'Failed to create booking');
    }
  };

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default ItemDetails; 