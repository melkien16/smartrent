import { useMemo } from 'react';
import { mockRentals } from '../data/mockRentals';
import { useUserListedItems } from './useUserListedItems';

export const useUserStats = (user) => {
    const { userListedItems, loading, error } = useUserListedItems();

    return useMemo(() => {
        const userRentedItems = mockRentals.active.filter(rental => rental?.renter?.id === user?.id);

        return {
            userListedItems,
            userRentedItems,
            activeRentals: userRentedItems.length,
            activeListings: userListedItems.length,
            totalEarnings: userListedItems.reduce((sum, item) => sum + (item?.price || 0), 0),
            pendingRequests: mockRentals.pending.filter(rental => rental?.item?.owner?.id === user?.id).length,
            loading,
            error
        };
    }, [user, userListedItems, loading, error]);
}; 