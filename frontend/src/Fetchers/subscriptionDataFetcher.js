import axios from "axios";
import BASE_URL from "../../constants/baseUrl";

// Get current user's subscription
export const getMySubscription = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/subscriptions/mine`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create or update a subscription
export const createOrUpdateSubscription = async (subscriptionData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/subscriptions`,
      subscriptionData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Deactivate a subscription (admin only)
export const deactivateSubscription = async (subscriptionId) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/subscriptions/${subscriptionId}/deactivate`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Check and deactivate expired subscriptions (admin only)
export const checkExpiredSubscriptions = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/subscriptions/check-expired`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
