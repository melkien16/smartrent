import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { getUserProfile } from '../Fetchers/userDataFetcher';
import { mockRentals } from '../data/mockRentals';

export const useProfile = () => {
    const { id } = useParams();
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userItems, setUserItems] = useState([]);
    const [activeTab, setActiveTab] = useState(isAdmin ? 'settings' : 'listings');
    const isOwnProfile = !id || id === user?.id;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (isOwnProfile) {
                    const userData = await getUserProfile();
                    setProfileUser(userData);
                    setUserItems(userData.items || []);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Failed to load user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [isOwnProfile]);

    useEffect(() => {
        if (!user && !loading) {
            navigate('/auth');
        }
    }, [user, loading, navigate]);

    const userRentals = mockRentals.active.filter(rental => rental?.renter?.id === (isOwnProfile ? user?.id : id));

    const userReviews = mockRentals.active
        .filter(rental => rental?.item?.owner?.id === (isOwnProfile ? user?.id : id))
        .map(rental => ({
            id: rental.id,
            rating: rental.rating,
            comment: rental.review,
            date: rental.endDate,
            renter: rental.renter
        }));

    return {
        profileUser,
        loading,
        userItems,
        userRentals,
        userReviews,
        activeTab,
        setActiveTab,
        isOwnProfile,
        isAdmin
    };
}; 