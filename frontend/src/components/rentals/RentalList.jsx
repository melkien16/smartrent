import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { fetchBookingsByUser } from '../../Fetchers/BookingFetcher';
import { toast } from 'react-hot-toast';

const RentalList = ({ variant = 'card', onBrowseItems }) => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const bookings = await fetchBookingsByUser();
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
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
                                            className="h-10 w-10 rounded-full"
                                            src={rental.item.images[0] || 'https://via.placeholder.com/300?text=No+Image'}
                                            alt={rental.item.title}
                                        />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{rental.item.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{rental.item.owner.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${rental.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {rental.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(rental.endDate).toLocaleDateString()}
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
                            src={rental.item.images[0] || 'https://via.placeholder.com/300?text=No+Image'}
                            alt={rental.item.title}
                            className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                            <h3 className="font-medium">{rental.item.title}</h3>
                            <p className="text-sm text-gray-500">
                                From {new Date(rental.startDate).toLocaleDateString()} to {new Date(rental.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                Total: ${rental.totalPrice}
                            </p>
                            <p className="text-sm text-gray-500">
                                Status: {rental.status}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default React.memo(RentalList); 