import React, { createContext, useContext, useState, useCallback } from 'react';
import { createReview, getOwnerReviews, getMyReviews } from '../services/reviewService';
import { toast } from 'react-hot-toast';

const ReviewContext = createContext();

export const useReviews = () => {
    const context = useContext(ReviewContext);
    if (!context) {
        throw new Error('useReviews must be used within a ReviewProvider');
    }
    return context;
};

export const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitReview = useCallback(async (reviewData) => {
        try {
            setLoading(true);
            const newReview = await createReview(reviewData);
            setReviews(prev => [...prev, newReview]);
            toast.success('Review submitted successfully');
            return newReview;
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to submit review';
            toast.error(message);
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchOwnerReviews = useCallback(async (ownerId) => {
        try {
            setLoading(true);
            const ownerReviews = await getOwnerReviews(ownerId);
            setReviews(ownerReviews);
            return ownerReviews;
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to fetch owner reviews';
            setError(message);
            toast.error(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchMyReviews = useCallback(async (userId) => {
        if (!userId) {
            toast.error('User ID is required to fetch reviews');
            return;
        }
        try {
            setLoading(true);
            const userReviews = await getMyReviews(userId);
            setReviews(userReviews);
            return userReviews;
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to fetch your reviews';
            setError(message);
            toast.error(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const value = {
        reviews,
        loading,
        error,
        submitReview,
        fetchOwnerReviews,
        fetchMyReviews,
    };

    return (
        <ReviewContext.Provider value={value}>
            {children}
        </ReviewContext.Provider>
    );
}; 