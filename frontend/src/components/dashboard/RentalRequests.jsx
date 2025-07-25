import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Check, X } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { sendMessage, getBookingsForOwner, updateBookingStatus } from '../../Fetchers/BookingFetcher';

const RentalRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const ownerBookings = await getBookingsForOwner();

            // Filter for pending bookings
            const pendingRequests = ownerBookings.filter(booking =>
                booking.status === 'pending'
            );

            setRequests(pendingRequests);
        } catch (err) {
            setError('Failed to fetch rental requests');
            toast.error('Failed to fetch rental requests');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleStatusUpdate = async (bookingId, newStatus) => {
        try {
            // Find the booking to get renter details
            const booking = requests.find(req => req._id === bookingId);

            // Log the booking details before update
            console.log('Updating booking status:', {
                bookingId,
                bookingDetails: {
                    item: booking.item,
                    user: booking.user,
                    dates: {
                        start: new Date(booking.startDate).toLocaleDateString(),
                        end: new Date(booking.endDate).toLocaleDateString()
                    },
                    price: {
                        base: booking.price,
                        serviceFee: booking.serviceFee,
                        total: booking.totalPrice
                    },
                    status: booking.status
                }
            });

            // Update booking status using the API
            const updatedBooking = await updateBookingStatus(bookingId, newStatus);
            console.log('Updated booking:', updatedBooking);

            // Send message to the renter
            const message = newStatus === 'confirmed'
                ? 'Your booking request has been accepted!'
                : 'Your booking request has been rejected.';

            await sendMessage(booking.user._id, message);

            // Show success message
            toast.success(
                newStatus === 'confirmed'
                    ? 'Booking accepted successfully'
                    : 'Booking rejected successfully'
            );

            // Refresh the requests list
            fetchRequests();
        } catch (err) {
            console.error('Error updating booking status:', err);
            toast.error(err.message || 'Failed to update booking status');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64 text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Calendar size={48} className="mb-4" />
                <p className="text-lg">No pending rental requests</p>
                <p className="text-sm">When someone requests to rent your items, they'll appear here</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Rental Requests</h2>
            <div className="grid gap-4">
                {requests.map((request) => (
                    <div key={request._id} className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">{request.item.title}</h3>
                                <div className="mt-1 space-y-1">
                                    <p className="text-sm text-gray-500">
                                        <Clock size={14} className="inline mr-1" />
                                        {format(new Date(request.startDate), 'MMM d, yyyy')} - {format(new Date(request.endDate), 'MMM d, yyyy')}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Requested by: {request.user.name}
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        Total Amount: ${request.totalPrice}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleStatusUpdate(request._id, 'confirmed')}
                                    className="flex items-center px-3 py-1 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                                >
                                    <Check size={16} className="mr-1" />
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(request._id, 'completed')}
                                    className="flex items-center px-3 py-1 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50"
                                >
                                    <X size={16} className="mr-1" />
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RentalRequests; 