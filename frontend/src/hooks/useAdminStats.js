import { useState, useEffect } from 'react';
import { getAdminStats } from '../Fetchers/adminStatsFetcher';
import { toast } from 'react-hot-toast';

export const useAdminStats = () => {
    const [stats, setStats] = useState({
        activeUsers: 0,
        activeRentals: 0,
        premiumUsers: 0,
        totalItems: 0,
        activeSessions: 0,
        recentTransactions: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await getAdminStats();
                setStats(data);
            } catch (err) {
                console.error('Error fetching admin stats:', err);
                setError('Failed to load admin statistics');
                toast.error('Failed to load admin statistics');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        // Refresh stats every 5 minutes
        const interval = setInterval(fetchStats, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return { stats, loading, error };
}; 