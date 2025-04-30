import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

const BookingCalendar = ({ 
  itemId, 
  onDatesSelected, 
  minRentalPeriod = 1,
  maxRentalPeriod = 30,
  disabledDates = []
}) => {
  const { checkAvailability } = useBooking();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [availability, setAvailability] = useState({});

  // Generate calendar days
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add days from previous month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  // Check availability for a date
  const isDateAvailable = (date) => {
    if (!date) return false;
    
    // Check if date is in disabled dates
    if (disabledDates.some(d => 
      d.getFullYear() === date.getFullYear() &&
      d.getMonth() === date.getMonth() &&
      d.getDate() === date.getDate()
    )) {
      return false;
    }

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return false;

    // Check if date is available
    return availability[date.toISOString().split('T')[0]] !== false;
  };

  // Handle date selection
  const handleDateClick = (date) => {
    if (!isDateAvailable(date)) return;

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else {
      if (date < selectedStartDate) {
        setSelectedStartDate(date);
        setSelectedEndDate(null);
      } else {
        setSelectedEndDate(date);
        onDatesSelected(selectedStartDate, date);
      }
    }
  };

  // Check if date is in selected range
  const isInSelectedRange = (date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  // Check if date is hovered in range
  const isInHoveredRange = (date) => {
    if (!selectedStartDate || selectedEndDate || !hoveredDate) return false;
    return date >= selectedStartDate && date <= hoveredDate;
  };

  // Update availability when month changes
  useEffect(() => {
    const checkMonthAvailability = async () => {
      const days = getDaysInMonth(currentMonth);
      const newAvailability = {};

      for (const day of days) {
        if (!day) continue;
        
        const dateStr = day.toISOString().split('T')[0];
        const isAvailable = await checkAvailability(
          itemId,
          dateStr,
          dateStr
        );
        newAvailability[dateStr] = isAvailable;
      }

      setAvailability(newAvailability);
    };

    checkMonthAvailability();
  }, [currentMonth, itemId, checkAvailability]);

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-10" />;
          }

          const isAvailable = isDateAvailable(day);
          const isSelected = day.getTime() === selectedStartDate?.getTime() || 
                           day.getTime() === selectedEndDate?.getTime();
          const isInRange = isInSelectedRange(day) || isInHoveredRange(day);

          return (
            <button
              key={day.toISOString()}
              className={`relative h-10 rounded-md text-sm transition-colors
                ${isAvailable 
                  ? 'hover:bg-primary-100' 
                  : 'cursor-not-allowed text-gray-300'}
                ${isSelected 
                  ? 'bg-primary-500 text-white' 
                  : isInRange 
                    ? 'bg-primary-100' 
                    : ''}
              `}
              onClick={() => handleDateClick(day)}
              onMouseEnter={() => setHoveredDate(day)}
              onMouseLeave={() => setHoveredDate(null)}
              disabled={!isAvailable}
            >
              {day.getDate()}
              {!isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Calendar size={16} className="text-gray-300" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-primary-500"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-primary-100"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-gray-100"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar; 