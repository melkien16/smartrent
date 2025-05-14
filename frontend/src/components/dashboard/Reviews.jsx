import React, { useEffect, useState } from 'react';
import { Star, Plus } from 'lucide-react';
import { useReviews } from '../../context/ReviewContext';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

const ReviewCard = ({ review }) => (
    <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-start justify-between">
            <div>
                <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                        <Star
                            key={index}
                            className={`h-4 w-4 ${index < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                        />
                    ))}
                </div>
                <p className="mt-2 text-gray-600">{review.comment}</p>
            </div>
            <span className="text-sm text-gray-500">
                {format(new Date(review.createdAt), 'MMM d, yyyy')}
            </span>
        </div>
        <div className="mt-4 flex items-center">
            <div className="text-sm">
                <p className="font-medium text-gray-900">
                    Item: {review.item.name}
                </p>
                <p className="text-gray-500">
                    Owner: {review.owner.name}
                </p>
            </div>
        </div>
    </div>
);

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [itemId, setItemId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ itemId, rating, comment });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Submit Review</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Rating</label>
                        <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    className={`h-6 w-6 cursor-pointer ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                        }`}
                                    onClick={() => setRating(index + 1)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Comment</label>
                        <textarea
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            rows="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700"
                        >
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Reviews = () => {
    const { reviews, loading, error, fetchMyReviews, submitReview } = useReviews();
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (user?._id) {
            fetchMyReviews(user._id);
        }
    }, [fetchMyReviews, user?._id]);

    const handleSubmitReview = async (reviewData) => {
        try {
            await submitReview(reviewData);
            await fetchMyReviews(user._id); // Pass user ID when refreshing
        } catch (error) {
            console.error('Failed to submit review:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">My Reviews</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    New Review
                </button>
            </div>

            {reviews.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    <Star className="h-12 w-12 mx-auto mb-4" />
                    <p>No reviews yet</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                    ))}
                </div>
            )}

            <ReviewModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmitReview}
            />
        </div>
    );
};

export default Reviews; 