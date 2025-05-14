import { getAllUsers } from './getAllUsers';
import { getAllBookings } from './BookingFetcher';
import { fetchItems } from './itemFetcher';

export const getAdminStats = async () => {
    try {
        // Fetch all data in parallel
        const [users, bookings, items] = await Promise.all([
            getAllUsers(),
            getAllBookings(),
            fetchItems()
        ]);

        // Get active rentals (bookings with status 'active' or 'pending')
        const activeRentals = bookings.filter(
            booking => ['active', 'pending'].includes(booking.status?.toLowerCase())
        ).length;

        // Get premium users (users with premium subscription)
        const premiumUsers = users.filter(
            user => user.subscription?.plan === 'premium'
        ).length;

        return {
            activeUsers: users.length,
            activeRentals,
            premiumUsers,
            totalItems: items.length,
            activeSessions: users.filter(user => user.isOnline).length,
            onlineUsers: users.filter(user => user.isOnline).length
        };
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        throw error;
    }
}; 