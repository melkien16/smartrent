import { useMemo } from 'react';
import { mockItems } from '../data/mockItems';
import { mockRentals } from '../data/mockRentals';

export const useUserStats = (user) => {
    return useMemo(() => {
        const userListedItems = mockItems.featured.filter(item => item?.owner?.id === user?.id);
        const userRentedItems = mockRentals.active.filter(rental => rental?.renter?.id === user?.id);

        return {
            userListedItems,
            userRentedItems,
            activeRentals: userRentedItems.length,
            activeListings: userListedItems.length,
            totalEarnings: userListedItems.reduce((sum, item) => sum + (item?.price || 0), 0),
            pendingRequests: mockRentals.pending.filter(rental => rental?.item?.owner?.id === user?.id).length,
        };
    }, [user]);
}; 