import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { fetchBookingsByUser } from '../../Fetchers/BookingFetcher';
import { toast } from 'react-hot-toast';

// Helper function to get status styles
const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
        case 'active':
        case 'confirmed':
            return 'bg-green-100 text-green-800';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'completed':
            return 'bg-blue-100 text-blue-800';
        case 'cancelled':
        case 'rejected':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800'; // Default for unknown statuses
    }
};

const RentalList = ({ variant = 'card', onBrowseItems }) => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const bookings = await fetchBookingsByUser();
                console.log('Fetched rental items (bookings):', bookings);
                setRentals(bookings);
            } catch (error) {
                console.error('Error fetching rentals:', error);
                toast.error('Failed to load rentals');
            } finally {
                setLoading(false);
            }
        };

        fetchRentals();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                <p className="text-gray-500">Loading rentals...</p>
            </div>
        );
    }

    if (rentals.length === 0) {
        return (
            <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">You don't have any active rentals yet.</p>
                {onBrowseItems && (
                    <button
                        onClick={onBrowseItems}
                        className="mt-4 text-primary-600 hover:text-primary-700"
                    >
                        Browse available items
                    </button>
                )}
            </div>
        );
    }

    if (variant === 'table') {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {rentals.map((rental) => (
                            <tr key={rental._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img
                                            className="h-10 w-10 rounded-full object-cover"
                                            src={rental.item?.images?.[0] || 'https://via.placeholder.com/300?text=No+Image'}
                                            alt={rental.item?.title || 'Item Image'}
                                        />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{rental.item?.title || 'N/A'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 truncate max-w-xs" title={rental.item?.owner || 'N/A'}>{rental.item?.owner || 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(rental.status)}`}>
                                        {rental.status || 'Unknown'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {rental.endDate ? new Date(rental.endDate).toLocaleDateString() : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    // Card variant (default)
    return (
        <div className="space-y-4">
            {rentals.map(rental => (
                <div key={rental._id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <img
                            src={rental.item?.images?.[0] || 'https://via.placeholder.com/300?text=No+Image'}
                            alt={rental.item?.title || 'Item Image'}
                            className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="ml-4 flex-1">
                            <h3 className="font-medium">{rental.item?.title || 'N/A'}</h3>
                            <p className="text-sm text-gray-500 truncate max-w-xs" title={rental.item?.owner || 'N/A'}>
                                Owner ID: {rental.item?.owner || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-500">
                                Dates: {rental.startDate ? new Date(rental.startDate).toLocaleDateString() : 'N/A'} - {rental.endDate ? new Date(rental.endDate).toLocaleDateString() : 'N/A'}
                            </p>
                            <p className="text-sm text-gray-500">
                                Total: ${rental.totalPrice != null ? rental.totalPrice : 'N/A'}
                            </p>
                            <div className="flex items-center mt-1">
                                <p className="text-sm text-gray-500 mr-2">Status:</p>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(rental.status)}`}>
                                    {rental.status || 'Unknown'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default React.memo(RentalList); 