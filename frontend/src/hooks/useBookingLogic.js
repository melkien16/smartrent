import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { toast } from 'react-hot-toast';

export const useBookingLogic = (item) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { createBooking } = useBooking();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalDays, setTotalDays] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Calculate days difference
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setTotalDays(diffDays || 1);
    }
  }, [startDate, endDate]);

  const handleRentNow = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      setError('End date must be after start date');
      return;
    }

    try {
      const bookingData = {
        itemId: item.id,
        itemTitle: item.title,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        totalAmount: item.price * totalDays,
        status: 'pending'
      };

      const newBooking = await createBooking(bookingData);
      navigate('/payment', { state: { booking: newBooking } });
    } catch (error) {
      toast.error(error.message || 'Failed to create booking');
    }
  };

  return { 
    startDate, 
    endDate, 
    totalDays, 
    error, 
    setStartDate, 
    setEndDate, 
    handleRentNow,
    isAuthenticated
  };
}; 