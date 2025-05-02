import axios from 'axios';
import BASE_URL from '../../constants/baseUrl';

// Get current user's subscription
export const getMySubscription = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/subscriptions/mine`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching subscription:', error);
        throw error;
    }
};

// Create or update a subscription
export const createOrUpdateSubscription = async (subscriptionData, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/subscriptions`, subscriptionData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating/updating subscription:', error);
        throw error;
    }
};

// Deactivate a subscription (admin only)
export const deactivateSubscription = async (subscriptionId, token) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/subscriptions/${subscriptionId}/deactivate`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error deactivating subscription:', error);
        throw error;
    }
};

// Check and deactivate expired subscriptions (admin only)
export const checkExpiredSubscriptions = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/subscriptions/check-expired`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error checking expired subscriptions:', error);
        throw error;
    }
}; 