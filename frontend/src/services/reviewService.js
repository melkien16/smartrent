import axios from 'axios';

const API_URL = '/api/reviews';

// Create a new review
export const createReview = async (reviewData) => {
  const response = await axios.post(API_URL, reviewData);
  return response.data;
};

// Get reviews for an owner
export const getOwnerReviews = async (ownerId) => {
  const response = await axios.get(`${API_URL}/owner/${ownerId}`);
  return response.data;
};

// Get current user's reviews
export const getMyReviews = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required to fetch reviews');
  }
  return getOwnerReviews(userId);
}; 