import { useMemo } from 'react';
import { mockRentals } from '../data/mockRentals';

export const useAdminStats = (users) => {
    return useMemo(() => ({
        activeUsers: users.length,
        rentalsToday: mockRentals.active.length,
        weeklyIncome: mockRentals.active.reduce((sum, rental) => sum + rental.totalPrice, 0),
        pendingTasks: mockRentals.pending.length,
    }), [users]);
}; 