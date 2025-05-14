import React, { createContext, useState, useContext } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import BASE_URL from "../../constants/baseUrl";
import { sendMessage } from "../Fetchers/BookingFetcher";

const BookingContext = createContext(null);

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if a date range is available for an item
  const checkAvailability = (itemId, startDate, endDate) => {
    const itemBookings = bookings.filter(
      (booking) =>
        booking.itemId === itemId &&
        booking.status !== "cancelled" &&
        booking.status !== "rejected"
    );

    const requestedStart = new Date(startDate);
    const requestedEnd = new Date(endDate);

    return !itemBookings.some((booking) => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);

      return (
        (requestedStart >= bookingStart && requestedStart <= bookingEnd) ||
        (requestedEnd >= bookingStart && requestedEnd <= bookingEnd) ||
        (requestedStart <= bookingStart && requestedEnd >= bookingEnd)
      );
    });
  };

  // Create a new booking request
  const createBooking = async (bookingData) => {
    if (!isAuthenticated) {
      throw new Error("User must be authenticated to create a booking");
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/bookings`,
        bookingData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const newBooking = response.data;
      setBookings((prev) => [...prev, newBooking]);

      // Send a message to the item owner
      if (newBooking.item && newBooking.item.owner) {
        const message = `New booking request from ${new Date(newBooking.startDate).toLocaleDateString()} to ${new Date(newBooking.endDate).toLocaleDateString()}`;
        await sendMessage(newBooking.item.owner, message);
      }

      return newBooking;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create booking";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update booking status (for owners)
  const updateBookingStatus = async (bookingId, status, message = "") => {
    if (!isAuthenticated) {
      throw new Error("User must be authenticated to update booking status");
    }

    setLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      setBookings((prev) =>
        prev.map((booking) => {
          if (booking.id === bookingId) {
            return {
              ...booking,
              status,
              message,
              updatedAt: new Date().toISOString(),
            };
          }
          return booking;
        })
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cancel a booking (for renters)
  const cancelBooking = async (bookingId, reason = "") => {
    if (!isAuthenticated) {
      throw new Error("User must be authenticated to cancel a booking");
    }

    setLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      setBookings((prev) =>
        prev.map((booking) => {
          if (booking.id === bookingId) {
            return {
              ...booking,
              status: "cancelled",
              cancellationReason: reason,
              updatedAt: new Date().toISOString(),
            };
          }
          return booking;
        })
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get bookings for a specific item
  const getItemBookings = (itemId) => {
    return bookings.filter((booking) => booking.itemId === itemId);
  };

  // Get user's bookings (as renter or owner)
  const getUserBookings = () => {
    if (!isAuthenticated) return [];
    return bookings.filter(
      (booking) => booking.renterId === user.id || booking.ownerId === user.id
    );
  };

  const value = {
    bookings,
    loading,
    error,
    checkAvailability,
    createBooking,
    updateBookingStatus,
    cancelBooking,
    getItemBookings,
    getUserBookings,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
